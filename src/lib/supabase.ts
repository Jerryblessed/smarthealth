import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type UserProfile = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  institution?: string
  role?: 'student' | 'faculty' | 'staff'
  subscription_tier: 'free' | 'tier1' | 'tier2'
  vouchers?: number
  created_at: string
  updated_at: string
}

export type HealthData = {
  id: string
  user_id: string
  age?: number
  work_type?: 'sedentary' | 'active' | 'high_stress'
  last_activity?: string
  mood?: 'excellent' | 'good' | 'fair' | 'poor'
  symptoms?: string[]
  lifestyle_habits?: string[]
  created_at: string
}

export type MealPlan = {
  id: string
  user_id: string
  goal: 'weight_loss' | 'energy_boost' | 'immune_support'
  dietary_preference: 'vegan' | 'keto' | 'low_carb' | 'balanced'
  budget: 'low' | 'medium' | 'high'
  meals: any[]
  created_at: string
}

export type ChatMessage = {
  id: string
  user_id: string
  message: string
  response?: string
  message_type: 'text' | 'voice'
  created_at: string
}

export type BPEstimate = {
  id: string
  user_id: string
  systolic: number
  diastolic: number
  age?: number
  work_type?: 'sedentary' | 'active' | 'high_stress'
  activity_level?: 'low' | 'moderate' | 'high'
  mood?: 'excellent' | 'good' | 'fair' | 'poor'
  stress_level?: number
  created_at: string
}

export type Order = {
  id: string
  user_id: string
  subscription_tier?: 'tier1' | 'tier2'
  total_amount: number
  discount_amount?: number
  paystack_reference?: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  item_type: 'subscription' | 'accessory'
  item_id: string
  item_name: string
  quantity?: number
  unit_price: number
  discounted_price: number
  created_at: string
}

export type DailyTip = {
  id: string
  title: string
  content: string
  category: 'nutrition' | 'exercise' | 'mental_health' | 'sleep' | 'hydration' | 'general'
  target_audience: 'all' | 'free' | 'tier1' | 'tier2'
  is_active: boolean
  created_at: string
}