import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AdminLayout, UserLayout } from '../components/layout'

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isLoading, isAdmin, user } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />
  }

  // Use AdminLayout for admin users, UserLayout for regular users
  const Layout = user?.type === 'admin' ? AdminLayout : UserLayout

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default PrivateRoute
