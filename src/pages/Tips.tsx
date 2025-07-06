import React, { useState, useEffect } from 'react'
import { Heart, Lightbulb, Clock, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface DailyTip {
  id: string
  title: string
  content: string
  category: string
  target_audience: string
  created_at: string
}

export function Tips() {
  const { profile } = useAuth()
  const [tips, setTips] = useState<DailyTip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Tips', icon: Lightbulb },
    { id: 'nutrition', name: 'Nutrition', icon: Heart },
    { id: 'exercise', name: 'Exercise', icon: User },
    { id: 'mental_health', name: 'Mental Health', icon: Heart },
    { id: 'sleep', name: 'Sleep', icon: Clock },
    { id: 'hydration', name: 'Hydration', icon: Heart }
  ]

  useEffect(() => {
    fetchTips()
  }, [profile])

  const fetchTips = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('daily_tips')
        .select('*')
        .eq('is_active', true)
        .in('target_audience', ['all', profile?.subscription_tier || 'free'])
        .order('created_at', { ascending: false })

      if (error) throw error
      setTips(data || [])
    } catch (error) {
      console.error('Error fetching tips:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory)

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl w-fit mx-auto mb-6">
          <Lightbulb className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Tips</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Personalized health advice to help you live your best life
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
            }`}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map(tip => (
          <div key={tip.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                tip.target_audience === 'tier2' 
                  ? 'bg-purple-100 text-purple-700'
                  : tip.target_audience === 'tier1'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {tip.target_audience === 'tier2' ? 'Pro+' : 
                 tip.target_audience === 'tier1' ? 'Pro' : 'Free'}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {tip.category.replace('_', ' ')}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{tip.content}</p>
            
            <div className="text-xs text-gray-400">
              {new Date(tip.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
          <p className="text-gray-600">Try selecting a different category or check back later.</p>
        </div>
      )}
    </div>
  )
}