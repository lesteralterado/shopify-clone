'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Trash2, Minus, Plus, Check, CreditCard, Truck, Shield, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/lib/store'
import { formatPrice, generateOrderNumber } from '@/lib/utils'

type CheckoutStep = 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Philippines',
  })

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'cod'>('stripe')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: 'percentage' | 'fixed' } | null>(null)

  const subtotal = getTotal()
  const shippingCost = subtotal > 500 ? 0 : 49
  const tax = subtotal * 0.08
  const discount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? subtotal * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0
  const total = subtotal + shippingCost + tax - discount

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('review')
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    try {
      // Calculate totals
      const subtotal = getTotal()
      const shippingCost = subtotal > 500 ? 0 : 49
      const tax = subtotal * 0.08
      const discount = appliedCoupon 
        ? appliedCoupon.type === 'percentage' 
          ? subtotal * (appliedCoupon.discount / 100)
          : appliedCoupon.discount
        : 0
      const total = subtotal + shippingCost + tax - discount

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            variant: item.variant,
            quantity: item.quantity,
            price: item.variant?.price || item.price,
          })),
          shippingInfo,
          paymentMethod,
          subtotal,
          shippingCost,
          tax,
          discount,
          total,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const data = await response.json()
      setOrderNumber(data.order.orderNumber)
      clearCart()
      setAppliedCoupon(null)
      router.push(`/checkout/success?order=${data.order.orderNumber}`)
    } catch (error) {
      console.error('Order error:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const applyCoupon = () => {
    // Demo coupon - in production, validate against API
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10, type: 'percentage' })
    } else if (couponCode.toUpperCase() === 'PHP100') {
      setAppliedCoupon({ code: 'PHP100', discount: 100, type: 'fixed' })
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-slate-600 mb-8">
            Add some products to your cart before checking out.
          </p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${currentStep === 'shipping' ? 'text-slate-900' : 'text-green-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'shipping' ? 'bg-slate-900 text-white' : 'bg-green-600 text-white'}`}>
              {currentStep !== 'shipping' ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <span className="text-sm font-medium">Shipping</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200">
            <div className={`h-full ${currentStep === 'payment' || currentStep === 'review' ? 'bg-slate-900' : 'bg-slate-200'}`} />
          </div>
          <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-slate-900' : currentStep === 'review' ? 'text-green-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'payment' ? 'bg-slate-900 text-white' : currentStep === 'review' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {currentStep === 'review' ? <Check className="h-4 w-4" /> : '2'}
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200">
            <div className={`h-full ${currentStep === 'review' ? 'bg-slate-900' : 'bg-slate-200'}`} />
          </div>
          <div className={`flex items-center gap-2 ${currentStep === 'review' ? 'text-slate-900' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'review' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>
              3
            </div>
            <span className="text-sm font-medium">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          {/* Shipping Form */}
          {currentStep === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Form */}
          {currentStep === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-slate-50 ${paymentMethod === 'stripe' ? 'border-slate-900 bg-slate-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="stripe"
                          checked={paymentMethod === 'stripe'}
                          onChange={() => setPaymentMethod('stripe')}
                          className="h-4 w-4"
                        />
                        <div>
                          <p className="font-medium">Credit/Debit Card (Stripe)</p>
                          <p className="text-sm text-slate-500">Pay securely with Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Visa</span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">MC</span>
                      </div>
                    </label>

                    <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-slate-50 ${paymentMethod === 'paypal' ? 'border-slate-900 bg-slate-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="h-4 w-4"
                        />
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-slate-500">Pay with your PayPal account</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-bold">PayPal</span>
                    </label>

                    <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-slate-50 ${paymentMethod === 'cod' ? 'border-slate-900 bg-slate-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="h-4 w-4"
                        />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-slate-500">Pay when you receive your order</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'stripe' && (
                    <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" className="mt-1" />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep('shipping')} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" size="lg">
                      Continue to Review
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Review Order */}
          {currentStep === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shipping Info Summary */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-sm text-slate-600">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.email}<br />
                    {shippingInfo.phone}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}<br />
                    {shippingInfo.country}
                  </p>
                  <button onClick={() => setCurrentStep('shipping')} className="text-sm text-blue-600 hover:underline mt-2">
                    Edit
                  </button>
                </div>

                {/* Payment Method Summary */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm text-slate-600">
                    {paymentMethod === 'stripe' && 'Credit/Debit Card (Stripe)'}
                    {paymentMethod === 'paypal' && 'PayPal'}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </p>
                  <button onClick={() => setCurrentStep('payment')} className="text-sm text-blue-600 hover:underline mt-2">
                    Edit
                  </button>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-medium">Order Items ({items.length})</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice((item.variant?.price || item.price) * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep('payment')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} className="flex-1" size="lg" disabled={isProcessing}>
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Place Order - {formatPrice(total)}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice((item.variant?.price || item.price) * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {appliedCoupon.code} applied - {appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}% off` : `₱${appliedCoupon.discount} off`}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-col gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is safe</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
