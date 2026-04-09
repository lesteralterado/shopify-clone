'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface PaymentStripeProps {
  amount: number
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
  disabled?: boolean
}

function StripeCardForm({ amount, onSuccess, onError, disabled }: PaymentStripeProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setCardError(null)

    try {
      // Create payment intent on the server
      const response = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(amount * 100) }), // Convert to cents
      })

      const { clientSecret, error: serverError } = await response.json()

      if (serverError) {
        setCardError(serverError)
        onError(serverError)
        setIsProcessing(false)
        return
      }

      // Confirm the payment
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        setCardError('Card element not found')
        onError('Card element not found')
        setIsProcessing(false)
        return
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (error) {
        setCardError(error.message || 'Payment failed')
        onError(error.message || 'Payment failed')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id)
      }
    } catch (err: any) {
      setCardError(err.message || 'An unexpected error occurred')
      onError(err.message || 'An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-5 w-5 text-slate-600" />
          <span className="font-medium text-slate-700">Card Details</span>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1e293b',
                '::placeholder': {
                  color: '#94a3b8',
                },
              },
              invalid: {
                color: '#dc2626',
              },
            },
          }}
          className="p-3 border border-slate-300 rounded-md"
          onChange={(e) => {
            if (e.error) {
              setCardError(e.error.message)
            } else {
              setCardError(null)
            }
          }}
        />
      </div>

      {cardError && (
        <div className="text-red-500 text-sm flex items-center gap-2">
          <Lock className="h-4 w-4" />
          {cardError}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Lock className="h-4 w-4" />
        <span>Your payment is secured with SSL encryption</span>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing || disabled}
        className="w-full"
        size="lg"
      >
        {isProcessing ? 'Processing...' : `Pay ₱${amount.toLocaleString()}`}
      </Button>
    </form>
  )
}

export function PaymentStripe(props: PaymentStripeProps) {
  return (
    <Elements stripe={stripePromise}>
      <StripeCardForm {...props} />
    </Elements>
  )
}

export default PaymentStripe
