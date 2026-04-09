import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build search query
    const whereClause: any = {
      isActive: true,
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
        { sku: { contains: query } },
      ],
    }

    // Category filter
    if (category && category !== 'all') {
      whereClause.category = {
        slug: category,
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      whereClause.price = {}
      if (minPrice) whereClause.price.gte = parseFloat(minPrice)
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice)
    }

    // Sorting
    let orderBy: any = { createdAt: 'desc' }
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
    }

    // Get total count
    const total = await prisma.product.count({ where: whereClause })

    // Get products
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        images: true,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    })

    // Get all categories for filter
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        _count: { select: { products: true } },
      },
    })

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      categories,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
