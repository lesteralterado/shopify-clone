import nodemailer from 'nodemailer'

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig)

// Store email template functions
interface OrderItem {
  name: string
  quantity: number
  price: number
  total: number
}

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface OrderData {
  orderNumber: string
  email: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  shippingInfo: ShippingInfo
  createdAt: Date
}

// Admin email notification
export async function sendAdminOrderNotification(order: OrderData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shopify.com'
  
  const subject = `New Order Received - ${order.orderNumber}`
  
  const itemsList = order.items.map(item => 
    `- ${item.name} x${item.quantity} = ₱${item.total.toLocaleString()}`
  ).join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e293b;">New Order Received!</h2>
      <p>A new order has been placed on your store.</p>
      
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <h3 style="margin-top: 0;">Order Details</h3>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      </div>

      <h3>Items Ordered:</h3>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} x${item.quantity} = ₱${item.total.toLocaleString()}</li>
        `).join('')}
      </ul>

      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p><strong>Subtotal:</strong> ₱${order.subtotal.toLocaleString()}</p>
        <p><strong>Shipping:</strong> ₱${order.shippingCost.toLocaleString()}</p>
        <p><strong>Tax:</strong> ₱${order.tax.toLocaleString()}</p>
        ${order.discount > 0 ? `<p><strong>Discount:</strong> -₱${order.discount.toLocaleString()}</p>` : ''}
        <p><strong>Total:</strong> ₱${order.total.toLocaleString()}</p>
      </div>

      <h3>Customer Information:</h3>
      <p>
        ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}<br>
        ${order.shippingInfo.email}<br>
        ${order.shippingInfo.phone}<br>
        ${order.shippingInfo.address}<br>
        ${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.postalCode}<br>
        ${order.shippingInfo.country}
      </p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Shopify Store" <noreply@shopify.com>',
      to: adminEmail,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    return { success: false, error }
  }
}

// Customer invoice email
export async function sendCustomerInvoice(order: OrderData) {
  const subject = `Order Confirmation - ${order.orderNumber}`

  const itemsList = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">₱${item.price.toLocaleString()}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">₱${item.total.toLocaleString()}</td>
    </tr>
  `).join('')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #1e293b; margin: 0;">Thank You!</h1>
        <p style="color: #64748b;">Your order has been confirmed.</p>
      </div>

      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p style="margin: 8px 0 0;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <h3 style="color: #1e293b;">Order Items</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Item</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">Qty</th>
            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e2e8f0;">Price</th>
            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e2e8f0;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>

      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 8px 0;"><strong>Subtotal:</strong> <span style="float: right;">₱${order.subtotal.toLocaleString()}</span></p>
        <p style="margin: 8px 0;"><strong>Shipping:</strong> <span style="float: right;">₱${order.shippingCost.toLocaleString()}</span></p>
        <p style="margin: 8px 0;"><strong>Tax:</strong> <span style="float: right;">₱${order.tax.toLocaleString()}</span></p>
        ${order.discount > 0 ? `<p style="margin: 8px 0;"><strong>Discount:</strong> <span style="float: right; color: #16a34a;">-₱${order.discount.toLocaleString()}</span></p>` : ''}
        <p style="margin: 16px 0 0; padding-top: 16px; border-top: 2px solid #e2e8f0; font-size: 18px;"><strong>Total:</strong> <span style="float: right; color: #16a34a;">₱${order.total.toLocaleString()}</span></p>
      </div>

      <h3 style="color: #1e293b;">Shipping Address</h3>
      <p style="color: #64748b;">
        ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}<br>
        ${order.shippingInfo.address}<br>
        ${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.postalCode}<br>
        ${order.shippingInfo.country}
      </p>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px;">
        <p>Thank you for shopping with us!</p>
        <p>For any questions, contact us at support@shopify.com</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Shopify Store" <noreply@shopify.com>',
      to: order.email,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send invoice:', error)
    return { success: false, error }
  }
}

// Contact form notification
export async function sendContactNotification(name: string, email: string, subject: string, message: string) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shopify.com'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e293b;">New Contact Form Submission</h2>
      
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Shopify Store" <noreply@shopify.com>',
      to: adminEmail,
      subject: `Contact Form: ${subject}`,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send contact notification:', error)
    return { success: false, error }
  }
}

// Verify email configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log('Email server is ready')
    return { success: true }
  } catch (error) {
    console.error('Email server verification failed:', error)
    return { success: false, error }
  }
}
