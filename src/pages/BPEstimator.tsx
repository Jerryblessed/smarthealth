import React, { useState } from 'react'
import { Activity, Heart, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export function BPEstimator() {
  const { user, profile } = useAuth()
  const [formData, setFormData] = useState({
    age: '',
    work_type: 'sedentary',
    activity_level: 'moderate',
    mood: 'good',
    stress_level: '5'
  })
  const [result, setResult] = useState<{ systolic: number; diastolic: number } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (profile?.subscription_tier === 'free') {
      alert('Upgrade to Pro to access the BP Estimator!')
      return
    }

    setLoading(true)

    try {
      // Simple BP estimation algorithm
      const baseSystemic = 120
      const baseDiastolic = 80
      
      const age = parseInt(formData.age)
      const stressLevel = parseInt(formData.stress_level)
      
      // Age factor
      const ageFactor = Math.max(0, (age - 30) * 0.5)
      
      // Work type factor
      const workFactor = {
        sedentary: 5,
        active: -3,
        high_stress: 8
      }[formData.work_type]
      
      // Activity factor
      const activityFactor = {
        low: 3,
        moderate: 0,
        high: -5
      }[formData.activity_level]
      
      // Mood factor
      const moodFactor = {
        excellent: -5,
        good: 0,
        fair: 3,
        poor: 8
      }[formData.mood]
      
      // Stress factor
      const stressFactor = (stressLevel - 5) * 2
      
      const systolic = Math.round(baseSystemic + ageFactor + workFactor + activityFactor + moodFactor + stressFactor)
      const diastolic = Math.round(baseDiastolic + (ageFactor + workFactor + activityFactor + moodFactor + stressFactor) * 0.6)
      
      setResult({ systolic, diastolic })
      
      // Save to database
      await supabase.from('bp_estimates').insert({
        user_id: user?.id,
        systolic,
        diastolic,
        age,
        work_type: formData.work_type,
        activity_level: formData.activity_level,
        mood: formData.mood,
        stress_level: stressLevel
      })
      
    } catch (error) {
      console.error('Error estimating BP:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBPCategory = (systolic: number, diastolic: number) => {
    if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: 'text-green-600' }
    if (systolic < 130 && diastolic < 80) return { category: 'Elevated', color: 'text-yellow-600' }
    if (systolic < 140 || diastolic < 90) return { category: 'Stage 1 High', color: 'text-orange-600' }
    if (systolic < 180 || diastolic < 120) return { category: 'Stage 2 High', color: 'text-red-600' }
    return { category: 'Crisis', color: 'text-red-800' }
  }

  if (profile?.subscription_tier === 'free') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BP Estimator</h1>
          <p className="text-xl text-gray-600 mb-8">
            Estimate your blood pressure based on lifestyle factors
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8">
            <Heart className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-emerald-900 mb-2">Upgrade to Pro</h3>
            <p className="text-emerald-700 mb-6">
              Get access to our AI-powered blood pressure estimator and track your cardiovascular health.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4 rounded-2xl w-fit mx-auto mb-6">
          <Activity className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">BP Estimator</h1>
        <p className="text-xl text-gray-600">
          Get an estimate of your blood pressure based on lifestyle factors
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Assessment</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                required
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
              <select
                value={formData.work_type}
                onChange={(e) => setFormData({...formData, work_type: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="sedentary">Sedentary (Desk job)</option>
                <option value="active">Active (Physical work)</option>
                <option value="high_stress">High Stress</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                value={formData.activity_level}
                onChange={(e) => setFormData({...formData, activity_level: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="low">Low (Little exercise)</option>
                <option value="moderate">Moderate (Regular exercise)</option>
                <option value="high">High (Very active)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Mood</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stress Level (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.stress_level}
                onChange={(e) => setFormData({...formData, stress_level: e.target.value})}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low (1)</span>
                <span className="font-medium">{formData.stress_level}</span>
                <span>High (10)</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-rose-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Estimate BP'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Results</h2>
          
          {result ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 mb-4">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {result.systolic}/{result.diastolic}
                  </div>
                  <div className="text-sm text-gray-600">mmHg</div>
                </div>
                
                <div className={`text-lg font-semibold ${getBPCategory(result.systolic, result.diastolic).color}`}>
                  {getBPCategory(result.systolic, result.diastolic).category}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Important Note</h4>
                <p className="text-sm text-blue-800">
                  This is an estimate based on lifestyle factors. For accurate readings, 
                  use a proper blood pressure monitor and consult with healthcare professionals.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Recommendations:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monitor your BP regularly with a proper device</li>
                  <li>• Maintain a healthy diet low in sodium</li>
                  <li>• Exercise regularly (30 min, 5 days/week)</li>
                  <li>• Manage stress through relaxation techniques</li>
                  <li>• Limit alcohol and avoid smoking</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Fill out the form to get your BP estimate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}