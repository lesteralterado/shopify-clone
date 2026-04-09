import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

// GET - Validate or list coupons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const action = searchParams.get('action')

    // Validate a single coupon
    if (code && action === 'validate') {
      const coupon = await prisma.coupon.findUnique({
        where: { code: code.toUpperCase() },
      })

      if (!coupon) {
        return NextResponse.json(
          { valid: false, error: 'Invalid coupon code' },
          { status: 404 }
        )
      }

      // Check if coupon is active
      if (!coupon.isActive) {
        return NextResponse.json(
          { valid: false, error: 'This coupon is no longer active' },
          { status: 400 }
        )
      }

      // Check if coupon has expired
      const now = new Date()
      if (now < coupon.startDate || now > coupon.endDate) {
        return NextResponse.json(
          { valid: false, error: 'This coupon has expired or is not yet active' },
          { status: 400 }
        )
      }

      // Check usage limit
      if (coupon.maxUses > 0 && coupon.currentUses >= coupon.maxUses) {
        return NextResponse.json(
          { valid: false, error: 'This coupon has reached its usage limit' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        valid: true,
        coupon: {
          code: coupon.code,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          minPurchase: coupon.minPurchase,
          maxDiscount: coupon.maxDiscount,
        },
      })
    }

    // List all coupons (admin)
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ coupons })
  } catch (error) {
    console.error('Coupon error:', error)
    return NextResponse.json(
      { error: 'Failed to process coupon' },
      { status: 500 }
    )
  }
}

// POST - Create a new coupon (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }
    
    const body = await request.json()
    const { 
      code, 
      description, 
      discountType, 
      discountValue, 
      minPurchase,
      maxDiscount,
      maxUses,
      startDate,
      endDate 
    } = body

    // Validate required fields
    if (!code || !discountValue || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if coupon code already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (existingCoupon) {
      return NextResponse.json(
        { error: 'A coupon with this code already exists' },
        { status: 400 }
      )
    }

    // Create coupon
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description,
        discountType: discountType || 'percentage',
        discountValue,
        minPurchase: minPurchase || 0,
        maxDiscount,
        maxUses: maxUses || 0,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    })

    return NextResponse.json({
      success: true,
      coupon,
    })
  } catch (error) {
    console.error('Create coupon error:', error)
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    )
  }
}

// PUT - Update a coupon (admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }
    
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Coupon ID is required' },
        { status: 400 }
      )
    }

    // Update dates if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate)
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate)
    }
    if (updateData.code) {
      updateData.code = updateData.code.toUpperCase()
    }

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      coupon,
    })
  } catch (error) {
    console.error('Update coupon error:', error)
    return NextResponse.json(
      { error: 'Failed to update coupon' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a coupon (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Coupon ID is required' },
        { status: 400 }
      )
    }

    await prisma.coupon.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully',
    })
  } catch (error) {
    console.error('Delete coupon error:', error)
    return NextResponse.json(
      { error: 'Failed to delete coupon' },
      { status: 500 }
    )
  }
}
