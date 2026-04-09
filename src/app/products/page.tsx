import Link from 'next/link'
import { Filter, Grid, List, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/product-card'

// Demo products
const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    price: 199.99,
    comparePrice: 249.99,
    images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', alt: 'Headphones' }],
    category: { name: 'Electronics', slug: 'electronics' },
    averageRating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    name: 'Classic Leather Watch',
    slug: 'classic-leather-watch',
    price: 149.99,
    comparePrice: null,
    images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', alt: 'Watch' }],
    category: { name: 'Accessories', slug: 'accessories' },
    averageRating: 4.8,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Smart Fitness Tracker',
    slug: 'smart-fitness-tracker',
    price: 79.99,
    comparePrice: 99.99,
    images: [{ url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', alt: 'Fitness Tracker' }],
    category: { name: 'Electronics', slug: 'electronics' },
    averageRating: 4.3,
    reviewCount: 256,
  },
  {
    id: '4',
    name: 'Minimalist Backpack',
    slug: 'minimalist-backpack',
    price: 89.99,
    comparePrice: null,
    images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', alt: 'Backpack' }],
    category: { name: 'Bags', slug: 'bags' },
    averageRating: 4.6,
    reviewCount: 167,
  },
  {
    id: '5',
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    price: 129.99,
    comparePrice: 159.99,
    images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', alt: 'Earbuds' }],
    category: { name: 'Electronics', slug: 'electronics' },
    averageRating: 4.4,
    reviewCount: 312,
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    price: 199.99,
    comparePrice: null,
    images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', alt: 'Sunglasses' }],
    category: { name: 'Accessories', slug: 'accessories' },
    averageRating: 4.7,
    reviewCount: 78,
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    price: 59.99,
    comparePrice: 79.99,
    images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', alt: 'Speaker' }],
    category: { name: 'Electronics', slug: 'electronics' },
    averageRating: 4.2,
    reviewCount: 198,
  },
  {
    id: '8',
    name: 'Canvas Sneakers',
    slug: 'canvas-sneakers',
    price: 69.99,
    comparePrice: null,
    images: [{ url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', alt: 'Sneakers' }],
    category: { name: 'Footwear', slug: 'footwear' },
    averageRating: 4.5,
    reviewCount: 145,
  },
  {
    id: '9',
    name: 'Vintage Camera',
    slug: 'vintage-camera',
    price: 399.99,
    comparePrice: 499.99,
    images: [{ url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', alt: 'Camera' }],
    category: { name: 'Electronics', slug: 'electronics' },
    averageRating: 4.9,
    reviewCount: 67,
  },
  {
    id: '10',
    name: 'Leather Wallet',
    slug: 'leather-wallet',
    price: 49.99,
    comparePrice: null,
    images: [{ url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', alt: 'Wallet' }],
    category: { name: 'Accessories', slug: 'accessories' },
    averageRating: 4.4,
    reviewCount: 234,
  },
  {
    id: '11',
    name: 'Running Shoes',
    slug: 'running-shoes',
    price: 119.99,
    comparePrice: 149.99,
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', alt: 'Shoes' }],
    category: { name: 'Footwear', slug: 'footwear' },
    averageRating: 4.6,
    reviewCount: 189,
  },
  {
    id: '12',
    name: 'Travel Duffel Bag',
    slug: 'travel-duffel-bag',
    price: 79.99,
    comparePrice: null,
    images: [{ url: 'https://images.unsplash.com/photo-1553895441-1dfa99c5ef52?w=400', alt: 'Bag' }],
    category: { name: 'Bags', slug: 'bags' },
    averageRating: 4.3,
    reviewCount: 156,
  },
]

const categories = [
  { name: 'All Products', slug: 'all', count: 12 },
  { name: 'Electronics', slug: 'electronics', count: 5 },
  { name: 'Accessories', slug: 'accessories', count: 3 },
  { name: 'Footwear', slug: 'footwear', count: 2 },
  { name: 'Bags', slug: 'bags', count: 2 },
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5" />
              <h2 className="font-semibold">Filters</h2>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="text-sm text-slate-600 hover:text-slate-900 flex justify-between"
                    >
                      <span>{category.name}</span>
                      <span className="text-slate-400">({category.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span>Under $50</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span>$50 - $100</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span>$100 - $200</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span>Over $200</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-slate-600">
              Showing <strong>{products.length}</strong> products
            </p>
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Sort by:</span>
                <Button variant="outline" size="sm" className="gap-1">
                  Featured
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              {/* View Toggle */}
              <div className="flex items-center gap-1 border border-slate-200 rounded-md">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
