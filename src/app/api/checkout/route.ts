import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { sendAdminOrderNotification, sendCustomerInvoice } from '@/lib/email/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      items, 
      shippingInfo, 
      paymentMethod, 
      subtotal, 
      shippingCost, 
      tax, 
      discount, 
      total 
    } = body

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    if (!shippingInfo || !shippingInfo.email || !shippingInfo.address) {
      return NextResponse.json(
        { error: 'Shipping information is required' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = generateOrderNumber()

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'pending',
        email: shippingInfo.email,
        shippingAddress: JSON.stringify(shippingInfo),
        billingAddress: JSON.stringify(shippingInfo),
        subtotal: subtotal || 0,
        shippingCost: shippingCost || 0,
        tax: tax || 0,
        total: total || 0,
        notes: `Payment Method: ${paymentMethod}`,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variant?.id || null,
            quantity: item.quantity,
            price: item.variant?.price || item.price,
            total: (item.variant?.price || item.price) * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    })

    // Send email notifications (non-blocking)
    const shippingAddress = typeof order.shippingAddress === 'string' 
      ? JSON.parse(order.shippingAddress) 
      : order.shippingAddress

    const orderEmailData = {
      orderNumber: order.orderNumber,
      email: order.email,
      items: items.map((item: any) => ({
        name: item.product?.name || 'Product',
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      subtotal: subtotal || 0,
      shippingCost: shippingCost || 0,
      tax: tax || 0,
      discount: discount || 0,
      total: total || 0,
      paymentMethod: paymentMethod || 'cod',
      shippingInfo: shippingAddress,
      createdAt: order.createdAt,
    }

    // Send emails asynchronously (don't wait for response)
    sendAdminOrderNotification(orderEmailData).catch(console.error)
    sendCustomerInvoice(orderEmailData).catch(console.error)

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      },
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderNumber = searchParams.get('orderNumber')
    const email = searchParams.get('email')

    if (!orderNumber && !email) {
      return NextResponse.json(
        { error: 'Order number or email is required' },
        { status: 400 }
      )
    }

    const whereClause = orderNumber 
      ? { orderNumber }
      : email ? { email } : undefined

    if (!whereClause) {
      return NextResponse.json(
        { error: 'Invalid search parameters' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findFirst({
      where: whereClause,
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Failed to get order' },
      { status: 500 }
    )
  }
}
