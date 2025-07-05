import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && isLoginPage) {
    const redirectTo = user?.type === 'admin' ? '/admin' : '/dashboard'
    return <Navigate to={redirectTo} replace />
  }

  // Redirect authenticated admin away from all public pages
  if (isAuthenticated && user?.type === 'admin') {
    return <Navigate to="/admin" replace />
  }

  if (isAuthenticated && user?.type === 'user') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute
