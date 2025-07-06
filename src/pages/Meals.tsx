import React, { useState, useEffect } from 'react'
import { Utensils, Plus, Clock, DollarSign, Leaf } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface MealPlan {
  id: string
  goal: string
  dietary_preference: string
  budget: string
  meals: any[]
  created_at: string
}

export function Meals() {
  const { user, profile } = useAuth()
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    goal: 'weight_loss',
    dietary_preference: 'balanced',
    budget: 'medium'
  })

  useEffect(() => {
    if (user) {
      fetchMealPlans()
    }
  }, [user])

  const fetchMealPlans = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMealPlans(data || [])
    } catch (error) {
      console.error('Error fetching meal plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const createMealPlan = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (profile?.subscription_tier === 'free') {
      alert('Upgrade to Pro to create custom meal plans!')
      return
    }

    try {
      // Generate sample meals based on preferences
      const sampleMeals = generateSampleMeals(formData)
      
      const { error } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user?.id,
          ...formData,
          meals: sampleMeals
        })

      if (error) throw error
      
      setShowCreateForm(false)
      fetchMealPlans()
    } catch (error) {
      console.error('Error creating meal plan:', error)
    }
  }

  const generateSampleMeals = (preferences: any) => {
    const meals = {
      weight_loss: {
        breakfast: 'Greek yogurt with berries and almonds',
        lunch: 'Grilled chicken salad with mixed greens',
        dinner: 'Baked salmon with steamed vegetables',
        snack: 'Apple slices with almond butter'
      },
      energy_boost: {
        breakfast: 'Oatmeal with banana and walnuts',
        lunch: 'Quinoa bowl with roasted vegetables',
        dinner: 'Lean beef stir-fry with brown rice',
        snack: 'Trail mix with dried fruits'
      },
      immune_support: {
        breakfast: 'Smoothie with spinach, orange, and ginger',
        lunch: 'Lentil soup with whole grain bread',
        dinner: 'Turmeric chicken with sweet potato',
        snack: 'Green tea with honey'
      }
    }

    return meals[preferences.goal as keyof typeof meals] || meals.weight_loss
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Plans</h1>
          <p className="text-gray-600">Personalized nutrition for your health goals</p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          disabled={profile?.subscription_tier === 'free'}
          className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Plan
        </button>
      </div>

      {/* Free tier message */}
      {profile?.subscription_tier === 'free' && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-8">
          <div className="flex items-center">
            <Utensils className="h-6 w-6 text-emerald-600 mr-3" />
            <div>
              <h3 className="font-semibold text-emerald-900">Upgrade to Pro for Custom Meal Plans</h3>
              <p className="text-emerald-700 text-sm">Get personalized meal plans tailored to your goals and preferences.</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Meal Plan</h2>
            
            <form onSubmit={createMealPlan} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="energy_boost">Energy Boost</option>
                  <option value="immune_support">Immune Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                <select
                  value={formData.dietary_preference}
                  onChange={(e) => setFormData({...formData, dietary_preference: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="balanced">Balanced</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="low_carb">Low Carb</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meal Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mealPlans.map(plan => (
          <div key={plan.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <Utensils className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {plan.goal.replace('_', ' ')} Plan
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {plan.dietary_preference} • {plan.budget} budget
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(plan.created_at).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(plan.meals).map(([mealType, meal]) => (
                <div key={mealType} className="flex items-start">
                  <div className="text-sm font-medium text-gray-700 w-20 capitalize">
                    {mealType}:
                  </div>
                  <div className="text-sm text-gray-600 flex-1">{meal as string}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {mealPlans.length === 0 && profile?.subscription_tier !== 'free' && (
        <div className="text-center py-12">
          <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No meal plans yet</h3>
          <p className="text-gray-600">Create your first personalized meal plan to get started.</p>
        </div>
      )}
    </div>
  )
}