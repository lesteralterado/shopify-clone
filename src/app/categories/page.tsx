import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Demo categories data
const categories = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
    productCount: 156,
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashionable apparel for men and women',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    productCount: 243,
  },
  {
    id: '3',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
    productCount: 89,
  },
  {
    id: '4',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
    productCount: 178,
  },
  {
    id: '5',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Gear up for your next adventure',
    image: 'https://images.unsplash.com/photo-1461896836934- voices-v2?w=800',
    productCount: 134,
  },
  {
    id: '6',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    description: 'Premium beauty and wellness products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    productCount: 201,
  },
  {
    id: '7',
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Books, music, movies and more',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    productCount: 312,
  },
  {
    id: '8',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Fun and educational toys for all ages',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800',
    productCount: 167,
  },
]

export const metadata = {
  title: 'Categories - Browse Our Products',
  description: 'Explore our wide range of product categories. Find exactly what you need in our carefully curated collections.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Categories</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Explore our wide range of product categories. Find exactly what you need in our carefully curated collections.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Categories</span>
          </nav>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 text-slate-900 text-xs font-medium px-2 py-1 rounded-full">
                    {category.productCount} products
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link
                  href={`/products?category=${category.slug}`}
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors"
                  >
                    View Products
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Category Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="px-6 py-3 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-full text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
