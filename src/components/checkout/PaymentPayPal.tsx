'use client'

import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''

interface PaymentPayPalProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
  disabled?: boolean
  currency?: string
}

export function PaymentPayPal({ 
  amount, 
  onSuccess, 
  onError, 
  disabled,
  currency = 'PHP' 
}: PaymentPayPalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: `Order payment - ₱${amount.toLocaleString()}`,
        },
      ],
      application_context: {
        brand_name: 'Shopify Store',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${window.location.origin}/checkout/success`,
        cancel_url: `${window.location.origin}/checkout`,
      },
    })
  }

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true)
    try {
      const details = await actions.order.capture()
      onSuccess(details.id)
    } catch (err: any) {
      onError(err.message || 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleError = (err: any) => {
    onError(err.message || 'Payment failed')
    setIsProcessing(false)
  }

  const handleCancel = () => {
    onError('Payment was cancelled')
    setIsProcessing(false)
  }

  if (!paypalClientId) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700 text-sm">
          PayPal is not configured. Please contact the administrator.
        </p>
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: paypalClientId,
        currency: currency,
        intent: 'capture',
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Lock className="h-4 w-4" />
          <span>Your payment is secured with PayPal</span>
        </div>

        <div className="space-y-2">
          <PayPalButtons
            fundingSource={FUNDING.PAYPAL}
            style={{
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'paypal',
              height: 45,
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={handleError}
            onCancel={handleCancel}
            disabled={disabled || isProcessing}
          />
        </div>

        <div className="text-center text-sm text-slate-500">
          <p>You will be redirected to PayPal to complete your payment</p>
        </div>
      </div>
    </PayPalScriptProvider>
  )
}

export default PaymentPayPal
