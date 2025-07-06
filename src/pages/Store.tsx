import React, { useState } from 'react'
import { ShoppingCart, Star, Heart, Filter } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { storeItems } from '../lib/store-data'

export function Store() {
  const { profile } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fitness-tracker', name: 'Fitness Trackers' },
    { id: 'health-monitor', name: 'Health Monitors' },
    { id: 'wearable', name: 'Wearables' },
    { id: 'wellness', name: 'Wellness' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory)

  const addToCart = (itemId: string) => {
    if (profile?.subscription_tier === 'tier2' && cart.length >= 3) {
      alert('Pro+ members can add up to 3 items for discount')
      return
    }
    
    if (!cart.includes(itemId)) {
      setCart([...cart, itemId])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(id => id !== itemId))
  }

  const getDiscountedPrice = (price: number) => {
    return profile?.subscription_tier === 'tier2' ? price * 0.9 : price
  }

  const getTotalPrice = () => {
    return cart.reduce((total, itemId) => {
      const item = storeItems.find(i => i.id === itemId)
      if (!item) return total
      return total + getDiscountedPrice(item.price)
    }, 0)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Accessories Store</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Curated health monitoring devices to support your wellness journey
        </p>
        
        {profile?.subscription_tier === 'tier2' && (
          <div className="mt-6 inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full">
            <Star className="h-5 w-5 mr-2" />
            <span className="font-semibold">Pro+ Member: Get 10% off up to 3 items!</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Categories</h3>
            </div>
            
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center mb-3">
                  <ShoppingCart className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="font-semibold text-emerald-900">Cart ({cart.length})</h4>
                </div>
                
                <div className="space-y-2 mb-4">
                  {cart.map(itemId => {
                    const item = storeItems.find(i => i.id === itemId)
                    if (!item) return null
                    
                    const discountedPrice = getDiscountedPrice(item.price)
                    const hasDiscount = profile?.subscription_tier === 'tier2' && discountedPrice < item.price
                    
                    return (
                      <div key={itemId} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 truncate mr-2">{item.name}</span>
                        <div className="flex items-center">
                          {hasDiscount && (
                            <span className="text-gray-400 line-through mr-1">${item.price}</span>
                          )}
                          <span className="font-medium text-emerald-700">
                            ${discountedPrice.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="border-t border-emerald-200 pt-3">
                  <div className="flex justify-between items-center font-semibold text-emerald-900">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(0)}</span>
                  </div>
                  
                  <button className="w-full mt-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isInCart = cart.includes(item.id)
              const discountedPrice = getDiscountedPrice(item.price)
              const hasDiscount = profile?.subscription_tier === 'tier2' && discountedPrice < item.price
              
              return (
                <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {hasDiscount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        10% OFF
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {hasDiscount && (
                          <span className="text-gray-400 line-through mr-2">${item.price}</span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">
                          ${discountedPrice.toFixed(0)}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => isInCart ? removeFromCart(item.id) : addToCart(item.id)}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        isInCart
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                      }`}
                    >
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}