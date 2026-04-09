import Link from 'next/link'
import { Search, Calendar, User } from 'lucide-react'

// Demo blog posts
const blogPosts = [
  {
    id: '1',
    title: '10 Tips for Online Shopping Success',
    slug: '10-tips-online-shopping',
    excerpt: 'Discover the best strategies for making the most of your online shopping experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    author: 'Shopify Team',
    category: 'Shopping Tips',
    createdAt: '2024-01-15',
    views: 1250,
  },
  {
    id: '2',
    title: 'New Collection Arrivals - Spring 2024',
    slug: 'spring-collection-2024',
    excerpt: 'Check out our latest arrivals for the spring season. Fresh styles and exciting new products!',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    author: 'Shopify Team',
    category: 'New Arrivals',
    createdAt: '2024-01-10',
    views: 890,
  },
  {
    id: '3',
    title: 'How to Choose the Right Product',
    slug: 'choose-right-product',
    excerpt: 'A comprehensive guide to help you select the perfect product for your needs.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
    author: 'Shopify Team',
    category: 'Guide',
    createdAt: '2024-01-05',
    views: 2100,
  },
  {
    id: '4',
    title: 'Customer Stories: Success with Our Products',
    slug: 'customer-stories-success',
    excerpt: 'Read inspiring stories from our customers about how our products made a difference.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
    author: 'Shopify Team',
    category: 'Stories',
    createdAt: '2024-01-01',
    views: 1560,
  },
]

export const metadata = {
  title: 'Blog - News & Updates',
  description: 'Read the latest news, tips, and updates from our store.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-slate-300 max-w-2xl">
            Stay updated with the latest news, shopping tips, and exclusive offers from our store.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="bg-slate-100 px-2 py-1 rounded">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.createdAt}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-slate-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                    <span>{post.views} views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Get the latest blog posts delivered straight to your inbox. No spam, just great content!
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-md text-slate-900"
            />
            <button
              type="submit"
              className="h-12 px-8 bg-white text-slate-900 rounded-md font-medium hover:bg-slate-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
