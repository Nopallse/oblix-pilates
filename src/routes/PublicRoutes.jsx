import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Only redirect authenticated users away from login page
  // This allows them to still access the landing page while logged in
  if (isAuthenticated && isLoginPage) {
    const redirectTo = user?.type === 'admin' ? '/admin' : '/dashboard'
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PublicRoute
