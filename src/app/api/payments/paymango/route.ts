import { NextRequest, NextResponse } from 'next/server'

// PayMango API integration
// PayMango is a Philippine payment gateway

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY || ''
const PAYMONGO_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY || ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'PHP', orderId, customerEmail, paymentMethod } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (!PAYMONGO_SECRET_KEY) {
      // Demo mode - simulate successful payment
      return NextResponse.json({
        success: true,
        paymentIntentId: `pm_demo_${Date.now()}`,
        message: 'Demo payment processed successfully',
      })
    }

    // In production, you would integrate with PayMango's API
    // This is a placeholder for the actual PayMango integration
    const response = await fetch('https://api.paymongo.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency.toLowerCase(),
            payment_method: paymentMethod || 'card',
            description: `Order payment - ₱${amount.toLocaleString()}`,
            metadata: {
              orderId: orderId || '',
              customerEmail: customerEmail || '',
            },
          },
        },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      return NextResponse.json(
        { error: data.errors[0]?.detail || 'Payment failed' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      paymentIntentId: data.data?.id,
      clientKey: data.data?.attributes?.client_key,
    })
  } catch (error: any) {
    console.error('PayMango error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

// Webhook handler for PayMango events
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, paymentIntentId, status } = body

    // Handle PayMango webhook events
    switch (eventType) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', paymentIntentId)
        // Update order status in database
        break
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', paymentIntentId)
        // Handle failed payment
        break
      default:
        console.log('Unhandled PayMango event:', eventType)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('PayMango webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process webhook' },
      { status: 500 }
    )
  }
}
