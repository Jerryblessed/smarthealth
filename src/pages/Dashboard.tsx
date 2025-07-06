import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Utensils, 
  Activity, 
  MessageCircle, 
  ShoppingBag, 
  Crown,
  TrendingUp,
  Calendar,
  Target,
  Zap
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const { profile } = useAuth()
  const [dailyTip, setDailyTip] = useState('')
  const [mealOfTheDay, setMealOfTheDay] = useState('')
  const [bpEstimate, setBpEstimate] = useState('')

  useEffect(() => {
    // Simulate fetching daily content
    setDailyTip("Stay hydrated! Drinking 8 glasses of water daily helps maintain optimal blood pressure and supports overall cardiovascular health.")
    setMealOfTheDay("Mediterranean Quinoa Bowl with grilled vegetables, chickpeas, and olive oil dressing - packed with heart-healthy nutrients!")
    setBpEstimate("Based on your recent activity, your estimated BP is 118/76 mmHg - within healthy range!")
  }, [])

  const quickActions = [
    {
      title: 'Get Tips',
      description: 'Personalized health advice',
      icon: Heart,
      href: '/tips',
      color: 'from-rose-500 to-pink-500',
      available: true
    },
    {
      title: 'Plan My Meals',
      description: 'Custom meal planning',
      icon: Utensils,
      href: '/meals',
      color: 'from-orange-500 to-amber-500',
      available: profile?.subscription_tier !== 'free'
    },
    {
      title: 'Check BP',
      description: 'Blood pressure estimator',
      icon: Activity,
      href: '/bp-estimator',
      color: 'from-red-500 to-rose-500',
      available: profile?.subscription_tier !== 'free'
    },
    {
      title: 'Talk to GP',
      description: 'AI health consultation',
      icon: MessageCircle,
      href: '/chat',
      color: 'from-blue-500 to-indigo-500',
      available: profile?.subscription_tier !== 'free'
    },
    {
      title: 'Shop Accessories',
      description: 'Health monitoring devices',
      icon: ShoppingBag,
      href: '/store',
      color: 'from-emerald-500 to-teal-500',
      available: true
    },
    {
      title: 'Upgrade to Pro+',
      description: 'Unlock all features',
      icon: Crown,
      href: '/upgrade',
      color: 'from-purple-500 to-indigo-500',
      available: profile?.subscription_tier !== 'tier2'
    }
  ]

  const stats = [
    {
      label: 'Health Score',
      value: '85',
      unit: '/100',
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
    {
      label: 'Days Active',
      value: '12',
      unit: 'this month',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Goals Met',
      value: '8',
      unit: '/10',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      label: 'Streak',
      value: '5',
      unit: 'days',
      icon: Zap,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-emerald-100 text-lg">
                Ready to continue your health journey today?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{new Date().getDate()}</div>
                  <div className="text-sm text-emerald-100">
                    {new Date().toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {profile?.subscription_tier !== 'free' && (
            <div className="mt-4 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Crown className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium capitalize">
                {profile?.subscription_tier === 'tier1' ? 'Pro Member' : 'Pro+ Member'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
              <span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Daily Highlights */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Daily Tip</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{dailyTip}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center mb-4">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Meal of the Day</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{mealOfTheDay}</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 p-2 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">BP Estimate</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {profile?.subscription_tier === 'free' 
              ? 'Upgrade to Pro to access BP estimation'
              : bpEstimate
            }
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.available ? action.href : '/upgrade'}
              className={`group relative overflow-hidden rounded-xl p-6 transition-all transform hover:scale-105 ${
                action.available 
                  ? 'bg-white shadow-lg border border-gray-100 hover:shadow-xl' 
                  : 'bg-gray-50 border border-gray-200 opacity-75'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              
              <div className="relative">
                <div className={`bg-gradient-to-r ${action.color} p-3 rounded-xl w-fit mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
                
                {!action.available && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
                      Pro
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade CTA for Free Users */}
      {profile?.subscription_tier === 'free' && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white text-center">
          <Crown className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">Unlock Your Full Health Potential</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Get access to personalized meal plans, AI health consultations, BP monitoring, 
            and exclusive discounts on health accessories.
          </p>
          <Link
            to="/upgrade"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  )
}