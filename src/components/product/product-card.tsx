'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice?: number | null
    images: { url: string; alt?: string | null }[]
    category?: { name: string; slug: string } | null
    averageRating?: number
    reviewCount?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const imageUrl = product.images[0]?.url || '/placeholder.jpg'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      quantity: 1,
    })
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {/* Hover Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button size="sm" variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {product.category && (
            <p className="text-xs text-slate-500 mb-1">
              {product.category.name}
            </p>
          )}
          <h3 className="font-medium text-slate-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.averageRating !== undefined && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-slate-600">
                {product.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400">
                ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
