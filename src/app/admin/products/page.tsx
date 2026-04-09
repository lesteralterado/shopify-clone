'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, MoreVertical, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Demo products data
const demoProducts = [
  { id: '1', name: 'Premium Wireless Headphones', price: 199.99, stock: 45, category: 'Electronics', status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
  { id: '2', name: 'Classic Leather Watch', price: 149.99, stock: 28, category: 'Accessories', status: 'active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
  { id: '3', name: 'Smart Fitness Tracker', price: 79.99, stock: 0, category: 'Electronics', status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100' },
  { id: '4', name: 'Minimalist Backpack', price: 89.99, stock: 62, category: 'Bags', status: 'active', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100' },
  { id: '5', name: 'Wireless Earbuds Pro', price: 129.99, stock: 115, category: 'Electronics', status: 'active', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100' },
]

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products] = useState(demoProducts)

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Package className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Package className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-md text-slate-900">
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Package className="h-5 w-5" />
            <span>Categories</span>
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Package className="h-5 w-5" />
            <span>Coupons</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Package className="h-5 w-5" />
            <span>Customers</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-slate-600">Manage your product inventory</p>
          </div>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            <select className="border border-slate-200 rounded-md px-3 py-2">
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
              <option value="bags">Bags</option>
            </select>
            <select className="border border-slate-200 rounded-md px-3 py-2">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.category}</td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={product.stock === 0 ? 'text-red-500' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'active' ? 'bg-green-100 text-green-700' :
                        product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {product.status === 'out_of_stock' ? 'Out of Stock' : product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Eye className="h-4 w-4 text-slate-500" />
                        </button>
                        <Link href={`/admin/products/${product.id}`} className="p-1 hover:bg-slate-100 rounded">
                          <Edit className="h-4 w-4 text-slate-500" />
                        </Link>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="default" size="sm" className="h-8 w-8">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
