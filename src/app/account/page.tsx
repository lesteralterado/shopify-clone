'use client'

import Link from 'next/link'
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { signOut } from 'next-auth/react'

const orders = [
  { id: 'ORD-001', date: '2024-01-15', total: 199.99, status: 'Delivered' },
  { id: 'ORD-002', date: '2024-01-10', total: 149.99, status: 'Processing' },
]

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-slate-500">john@example.com</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link href="/account" className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-md">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </Link>
                <Link href="/account/wishlist" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
                  <MapPin className="h-5 w-5" />
                  <span>Addresses</span>
                </Link>
                <Link href="/account/settings" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Welcome */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Welcome back, John!</h2>
              <p className="text-slate-600">From your account dashboard you can view your recent orders, manage your shipping addresses, and edit your account details.</p>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-slate-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <span className={`text-sm ${
                          order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">No orders yet</p>
              )}
              <Link href="/account/orders" className="block mt-4">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
