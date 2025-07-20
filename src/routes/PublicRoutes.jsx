import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../shared/store/authStore'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && isLoginPage) {
    const userRole = user?.role || user?.type
    const redirectTo = userRole === 'admin' ? '/admin' : '/dashboard'
    return <Navigate to={redirectTo} replace />
  }

  // Redirect authenticated admin away from all public pages
  if (isAuthenticated && (user?.role === 'admin' || user?.type === 'admin')) {
    return <Navigate to="/admin" replace />
  }

  if (isAuthenticated && (user?.role === 'user' || user?.type === 'user')) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute
