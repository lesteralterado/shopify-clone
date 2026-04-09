'use client'

import Link from 'next/link'
import { ShoppingCart, User, Menu, Search } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Header() {
  const cartCount = useCartStore((state) => state.getItemCount())
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Shopify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Categories
            </Link>
            <Link href="/properties" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Properties
            </Link>
            <Link href="/blog" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Blog
            </Link>
            <Link href="/booking" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Booking
            </Link>
            <Link href="/about" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-900 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, Account */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-slate-900 text-xs text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Categories
              </Link>
              <Link href="/properties" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Properties
              </Link>
              <Link href="/blog" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Blog
              </Link>
              <Link href="/booking" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Booking
              </Link>
              <Link href="/about" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
