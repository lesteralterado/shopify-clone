'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Bed, Bath, Square, Car, Calendar, Filter } from 'lucide-react'

// Demo properties
const properties = [
  {
    id: '1',
    title: 'Modern Family Home in Quezon City',
    slug: 'modern-family-home-quezon-city',
    description: 'A beautiful modern family home with 4 bedrooms, 3 bathrooms, and a spacious garage. Perfect for growing families.',
    propertyType: 'house',
    status: 'for_sale',
    price: 8500000,
    bedrooms: 4,
    bathrooms: 3,
    floorArea: 250,
    lotArea: 300,
    yearBuilt: 2020,
    parking: 2,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    address: '123 Modern Street',
    city: 'Quezon City',
    province: 'Metro Manila',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Luxury Condo in Makati CBD',
    slug: 'luxury-condo-makati-cbd',
    description: 'Premium condo unit in the heart of Makati. Walking distance to business centers and shopping malls.',
    propertyType: 'condo',
    status: 'for_sale',
    price: 5200000,
    bedrooms: 2,
    bathrooms: 2,
    floorArea: 85,
    yearBuilt: 2018,
    parking: 1,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    address: '456 Business Ave',
    city: 'Makati',
    province: 'Metro Manila',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Beachfront Villa in Cebu',
    slug: 'beachfront-villa-cebu',
    description: 'Stunning beachfront villa with breathtaking ocean views. Perfect for vacation homes or investment properties.',
    propertyType: 'house',
    status: 'for_sale',
    price: 15000000,
    bedrooms: 5,
    bathrooms: 4,
    floorArea: 400,
    lotArea: 500,
    yearBuilt: 2019,
    parking: 3,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    address: '789 Beach Road',
    city: 'Cebu City',
    province: 'Cebu',
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Cozy Apartment in BGC',
    slug: 'cozy-apartment-bgc',
    description: 'Modern apartment in the trendy Bonifacio Global City. Close to restaurants, cafes, and nightlife.',
    propertyType: 'apartment',
    status: 'for_rent',
    price: 45000,
    priceType: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    floorArea: 45,
    yearBuilt: 2021,
    parking: 0,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800',
    ],
    address: '321 BGC Street',
    city: 'Taguig',
    province: 'Metro Manila',
    isFeatured: false,
  },
]

const propertyTypes = ['all', 'house', 'apartment', 'condo', 'land', 'commercial']
const statuses = ['all', 'for_sale', 'for_rent']

export const metadata = {
  title: 'Property Listings - Real Estate',
  description: 'Browse our curated selection of properties for sale and rent.',
}

export default function PropertiesPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProperties = properties.filter((property) => {
    const matchesType = selectedType === 'all' || property.propertyType === selectedType
    const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Property Listings</h1>
          <p className="text-slate-300 max-w-2xl">
            Find your dream home from our curated selection of properties across the Philippines.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status === 'for_sale' ? 'For Sale' : 'For Rent'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/properties/${property.slug}`}>
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'for_sale' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                    {property.isFeatured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    {property.city}, {property.province}
                  </div>
                  <Link href={`/properties/${property.slug}`}>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-slate-600 transition-colors">
                      {property.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 mb-4 line-clamp-2">{property.description}</p>
                  
                  {/* Property Features */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    {property.bedrooms && (
                      <span className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms} bed
                      </span>
                    )}
                    {property.bathrooms && (
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms} bath
                      </span>
                    )}
                    {property.floorArea && (
                      <span className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        {property.floorArea} sqm
                      </span>
                    )}
                    {property.parking !== undefined && property.parking > 0 && (
                      <span className="flex items-center gap-1">
                        <Car className="h-4 w-4" />
                        {property.parking} parking
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">
                        ₱{property.price.toLocaleString()}
                      </span>
                      {property.priceType === 'rent' && (
                        <span className="text-slate-500">/month</span>
                      )}
                    </div>
                    <Link href={`/properties/${property.slug}`}>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">List Your Property With Us</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Want to sell or rent out your property? Contact us today and reach thousands of potential buyers.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
