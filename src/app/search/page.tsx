'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Grid, List, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/product/product-card'

interface Product {
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('newest')
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })

  const performSearch = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('q', query)
      if (selectedCategory !== 'all') params.set('category', selectedCategory)
      if (priceRange.min) params.set('minPrice', priceRange.min)
      if (priceRange.max) params.set('maxPrice', priceRange.max)
      params.set('sort', sortBy)
      params.set('page', pagination.page.toString())

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()

      setProducts(data.products || [])
      setCategories(data.categories || [])
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [query, selectedCategory, priceRange, sortBy, pagination.page])

  useEffect(() => {
    performSearch()
  }, [performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination(prev => ({ ...prev, page: 1 }))
    performSearch()
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange({ min: '', max: '' })
    setSortBy('newest')
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const hasActiveFilters = selectedCategory !== 'all' || priceRange.min || priceRange.max

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
          <div className="flex-1 relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8">
            Search
          </Button>
        </form>

        {query && (
          <p className="mt-4 text-slate-600">
            {pagination.total} results for "<span className="font-medium">{query}</span>"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-900"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="h-4 w-4"
                  />
                  <span>All Categories</span>
                </label>
                {categories.map((cat: any) => (
                  <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="h-4 w-4"
                    />
                    <span>{cat.name}</span>
                    <span className="text-slate-400">({cat._count?.products || 0})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => setPagination(prev => ({ ...prev, page: 1 }))}
              >
                Apply
              </Button>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {priceRange.min && (
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">
                      Min: ₱{priceRange.min}
                      <button onClick={() => setPriceRange({ ...priceRange, min: '' })}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {priceRange.max && (
                    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">
                      Max: ₱{priceRange.max}
                      <button onClick={() => setPriceRange({ ...priceRange, max: '' })}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Sort and View */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-slate-600">
              Showing {products.length} of {pagination.total} products
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-md mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </Button>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={pagination.page === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
