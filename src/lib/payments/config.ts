// Payment configuration for Stripe, PayPal, and PayMango

export const paymentConfig = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  paypal: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    mode: process.env.PAYPAL_MODE || 'sandbox', // sandbox or live
  },
  paymango: {
    publicKey: process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY || '',
    secretKey: process.env.PAYMONGO_SECRET_KEY || '',
  },
}

// Currency configuration
export const currencyConfig = {
  currency: 'PHP',
  currencySymbol: '₱',
  locale: 'en-PH',
}

// Shipping rates
export const shippingRates = {
  standard: {
    name: 'Standard Shipping',
    price: 49,
    freeOver: 500,
    estimatedDays: '5-7 business days',
  },
  express: {
    name: 'Express Shipping',
    price: 99,
    freeOver: 1000,
    estimatedDays: '2-3 business days',
  },
  free: {
    name: 'Free Shipping',
    price: 0,
    freeOver: 1500,
    estimatedDays: '7-10 business days',
  },
}

// Tax rates by region
export const taxRates = {
  default: 0.08, // 8% default VAT
  regions: {
    'NCR': 0.12,
    'Region III': 0.12,
    'Region IV-A': 0.12,
  },
}

// Calculate shipping cost
export function calculateShipping(subtotal: number, method: string = 'standard'): number {
  const rate = shippingRates[method as keyof typeof shippingRates] || shippingRates.standard
  if (subtotal >= rate.freeOver) {
    return 0
  }
  return rate.price
}

// Calculate tax
export function calculateTax(subtotal: number, region: string = 'default'): number {
  const rate = taxRates.regions[region as keyof typeof taxRates.regions] || taxRates.default
  return subtotal * rate
}

// Format price with currency
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: currencyConfig.currency,
  }).format(amount)
}
