import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredTier?: 'tier1' | 'tier2'
}

export function ProtectedRoute({ children, requiredTier }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredTier && profile?.subscription_tier !== requiredTier && profile?.subscription_tier !== 'tier2') {
    return <Navigate to="/upgrade" replace />
  }

  return <>{children}</>
}