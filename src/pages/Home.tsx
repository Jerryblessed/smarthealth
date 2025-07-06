import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Brain, Utensils, Activity, MessageCircle, ShoppingBag, CheckCircle, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Home() {
  const { user } = useAuth()

  const features = [
    {
      icon: Brain,
      title: 'AI Medical Tips',
      description: 'Get personalized health advice based on your symptoms and lifestyle'
    },
    {
      icon: Utensils,
      title: 'Smart Meal Planning',
      description: 'Custom meal plans for weight loss, energy boost, and immune support'
    },
    {
      icon: Activity,
      title: 'BP Estimator',
      description: 'Predict blood pressure using lifestyle factors and mood analysis'
    },
    {
      icon: MessageCircle,
      title: 'AI Chat & Voice',
      description: 'Chat with our AI doctor, with voice responses for Pro+ users'
    },
    {
      icon: ShoppingBag,
      title: 'Health Store',
      description: 'Curated health accessories with exclusive discounts for Pro+ members'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Wellness Enthusiast',
      content: 'SmartHealth transformed my daily routine. The meal plans are amazing!',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Healthcare Professional',
      content: 'The AI recommendations are surprisingly accurate and helpful.',
      rating: 5
    },
    {
      name: 'Emma Williams',
      role: 'Busy Professional',
      content: 'Love the convenience of having health advice at my fingertips.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16 pb-24">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Health Companion
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Eat right, live well, and stay well. SmartHealth combines AI-powered medical advice, 
              personalized meal planning, and curated health accessories to keep you out of hospitals 
              and living your best life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all border-2 border-emerald-200 hover:border-emerald-300"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive health tools powered by artificial intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-emerald-100"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Health Journey
            </h2>
            <p className="text-xl text-gray-600">
              Flexible plans to fit your wellness goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">₦0</div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Daily health tips</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Basic meal plans</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Health store access</span>
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full text-center bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">₦3,000</div>
                <p className="text-gray-600">Monthly subscription</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Full meal plans</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>GPT-4o AI chat</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>BP estimator</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                Start Pro Trial
              </Link>
            </div>

            {/* Pro+ Plan */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 rounded-2xl shadow-lg text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro+</h3>
                <div className="text-4xl font-bold mb-2">₦5,000</div>
                <p className="text-emerald-100">Everything + premium features</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span>All Pro features</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span>Voice AI responses</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span>10% off accessories</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span>Premium support</span>
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full text-center bg-white text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                Start Pro+ Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Health Enthusiasts
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about SmartHealth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg border border-emerald-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of users who are already living healthier lives with SmartHealth
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>
    </div>
  )
}