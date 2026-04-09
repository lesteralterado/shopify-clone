import Link from 'next/link'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Orders',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    title: 'Products',
    value: '48',
    change: '+2.1%',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'Customers',
    value: '234',
    change: '-1.3%',
    trend: 'down',
    icon: Users,
  },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: 199.99, status: 'completed' },
  { id: 'ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: 149.99, status: 'processing' },
  { id: 'ORD-003', customer: 'Bob Wilson', product: 'Laptop Stand', amount: 79.99, status: 'pending' },
  { id: 'ORD-004', customer: 'Alice Brown', product: 'USB-C Hub', amount: 59.99, status: 'completed' },
  { id: 'ORD-005', customer: 'Charlie Davis', product: 'Webcam HD', amount: 89.99, status: 'shipped' },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-md text-slate-900">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <ShoppingBag className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-600">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-slate-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span className="text-slate-500">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
