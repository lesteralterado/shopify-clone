'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Mail, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || 'ORD-UNKNOWN'

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-slate-600 mb-2">
          Your order has been placed successfully.
        </p>
        
        <p className="text-slate-500 mb-8">
          Order Number: <span className="font-mono font-medium text-slate-900">{orderNumber}</span>
        </p>

        <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold mb-4">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Order Confirmation Email</p>
                <p className="text-xs text-slate-500">We've sent a confirmation email with your order details.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Order Processing</p>
                <p className="text-xs text-slate-500">We're preparing your items for shipment.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Order Status
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
