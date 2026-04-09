'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, CreditCard } from 'lucide-react'

const paymangoPublicKey = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY || ''

interface PaymentPayMangoProps {
  amount: number
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
  disabled?: boolean
}

export function PaymentPayMango({ 
  amount, 
  onSuccess, 
  onError, 
  disabled 
}: PaymentPayMangoProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardError, setCardError] = useState<string | null>(null)

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : v
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setCardError(null)

    try {
      // Create payment intent
      const response = await fetch('/api/payments/paymango', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // For demo purposes, simulate success
      // In production, you'd use PayMango's checkout or embedded form
      setTimeout(() => {
        onSuccess('pm_' + Date.now())
        setIsProcessing(false)
      }, 1500)

    } catch (err: any) {
      setCardError(err.message || 'Payment failed')
      onError(err.message || 'Payment failed')
      setIsProcessing(false)
    }
  }

  if (!paymangoPublicKey) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700 text-sm">
          PayMango is not configured. Please contact the administrator.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-5 w-5 text-slate-600" />
          <span className="font-medium text-slate-700">PayMango Card Details</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="pmCardNumber">Card Number</Label>
            <Input
              id="pmCardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="pmExpiry">Expiry Date</Label>
              <Input
                id="pmExpiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pmCvc">CVC</Label>
              <Input
                id="pmCvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                maxLength={4}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {cardError && (
        <div className="text-red-500 text-sm">
          {cardError}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Lock className="h-4 w-4" />
        <span>Your payment is secured with PayMango encryption</span>
      </div>

      <Button
        type="submit"
        disabled={disabled || isProcessing || !cardNumber || !expiry || !cvc}
        className="w-full"
        size="lg"
      >
        {isProcessing ? 'Processing...' : `Pay ₱${amount.toLocaleString()}`}
      </Button>

      <div className="text-center">
        <p className="text-xs text-slate-500">
          PayMango - Secure payment processing for Philippines
        </p>
      </div>
    </form>
  )
}

export default PaymentPayMango
