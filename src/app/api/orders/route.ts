import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { generateOrderNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: any = {}

    // If not admin, only show own orders
    if (session?.user?.role !== 'admin') {
      where.userId = session?.user?.id
    }

    if (status) {
      where.status = status
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: {
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email, shippingAddress, billingAddress } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const session = await auth()

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        )
      }

      const price = item.variant?.price || product.price
      const total = price * item.quantity
      subtotal += total

      orderItems.push({
        productId: item.productId,
        variantId: item.variant?.id || null,
        quantity: item.quantity,
        price,
        total,
      })
    }

    // Calculate shipping and tax (simplified)
    const shippingCost = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + shippingCost + tax

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        email: email || session?.user?.email || 'guest@example.com',
        userId: session?.user?.id || null,
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: JSON.stringify(billingAddress || shippingAddress),
        subtotal,
        shippingCost,
        tax,
        total,
        status: 'pending',
        items: {
          create: orderItems,
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

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
