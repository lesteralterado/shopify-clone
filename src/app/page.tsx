import Link from 'next/link'
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/product-card'

// Demo products for the homepage
const demoProducts = [
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
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-sm font-medium text-slate-600 mb-4 block">
                New Collection 2024
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                Discover Your Style
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl">
                Explore our curated collection of premium products. Quality meets style in every purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button size="lg" className="text-lg px-8">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative aspect-square max-w-lg mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
                  alt="Hero"
                  className="rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-slate-500">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-slate-500">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-slate-500">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Headphones className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-slate-500">Dedicated support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Check out our most popular products, carefully selected for quality and style.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Browse our wide range of categories to find exactly what you're looking for.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
              { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
              { name: 'Footwear', slug: 'footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
              { name: 'Bags', slug: 'bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Get the latest updates on new products and upcoming sales. Subscribe now and get 10% off your first order!
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-md text-slate-900"
            />
            <Button size="lg" className="h-12 px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
