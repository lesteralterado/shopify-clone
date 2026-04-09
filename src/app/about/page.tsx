import { MapPin, Phone, Mail, Clock, Award, Users, Truck, Shield, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company and our commitment to excellence.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
            alt="Our Store"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-6">About Our Company</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            We are dedicated to providing premium products and exceptional service to our customers across the Philippines and beyond.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4">
                Founded in 2020, our company has grown from a small local shop to a trusted online destination for quality products. We believe in the power of e-commerce to connect people with products they love.
              </p>
              <p className="text-slate-600 mb-4">
                Our mission is simple: to provide an exceptional shopping experience through quality products, competitive prices, and outstanding customer service.
              </p>
              <p className="text-slate-600">
                We carefully curate our product selection to ensure every item meets our high standards. From electronics to fashion, we bring you the best from trusted brands and manufacturers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
                alt="Our Store"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-slate-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-slate-400">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-slate-400">Partner Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-slate-400">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quality First</h3>
              <p className="text-slate-600 text-sm">
                We never compromise on quality. Every product is carefully selected and tested.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Customer Focus</h3>
              <p className="text-slate-600 text-sm">
                Our customers are at the heart of everything we do. Your satisfaction is our priority.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-slate-600 text-sm">
                Quick and reliable shipping to get your orders to you as fast as possible.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Shopping</h3>
              <p className="text-slate-600 text-sm">
                Your data and payments are protected with industry-leading security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300"
                alt="CEO"
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg font-bold">John Smith</h3>
              <p className="text-slate-500">CEO & Founder</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
                alt="COO"
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg font-bold">Sarah Johnson</h3>
              <p className="text-slate-500">Chief Operations Officer</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300"
                alt="CTO"
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg font-bold">Michael Chen</h3>
              <p className="text-slate-500">Chief Technology Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Truck className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="text-lg font-bold">Free Shipping</h3>
              </div>
              <p className="text-slate-600">
                Enjoy free shipping on orders over ₱500. Fast and reliable delivery across the Philippines.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="text-lg font-bold">Secure Payments</h3>
              </div>
              <p className="text-slate-600">
                Multiple payment options including credit cards, PayPal, and cash on delivery.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="text-lg font-bold">24/7 Support</h3>
              </div>
              <p className="text-slate-600">
                Our dedicated support team is always ready to help you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Have questions about our company or products? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
