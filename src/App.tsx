import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Chat } from './pages/Chat'
import { Store } from './pages/Store'
import { Tips } from './pages/Tips'
import { Meals } from './pages/Meals'
import { BPEstimator } from './pages/BPEstimator'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute requiredTier="tier1">
                  <Chat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tips" 
              element={
                <ProtectedRoute>
                  <Tips />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/meals" 
              element={
                <ProtectedRoute>
                  <Meals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bp-estimator" 
              element={
                <ProtectedRoute>
                  <BPEstimator />
                </ProtectedRoute>
              } 
            />
            <Route path="/store" element={<Store />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App