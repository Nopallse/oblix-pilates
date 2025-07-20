import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../shared/store/authStore'
import AdminLayout from '../components/layout/AdminLayout/AdminLayout'
import UserLayout from '../components/layout/UserLayout/UserLayout'

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  
  // Helper function to check if user is admin
  const isAdmin = () => {
    if (!user) return false
    const userRole = user?.role || user?.type
    const isAdmin = userRole === 'admin' || userRole === 'ADMIN'
    console.log('PrivateRoute isAdmin check:', { userRole, isAdmin })
    return isAdmin
  }
  
  // Debug logging
  console.log('PrivateRoute Debug:', {
    isAuthenticated,
    isLoading,
    user,
    userRole: user?.role || user?.type,
    requireAdmin,
    isAdminResult: isAdmin()
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login')
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin()) {
    console.log('User is not admin, redirecting to dashboard')
    return <Navigate to="/dashboard" replace />
  }

  // Determine layout based on user role
  const userRole = user?.role || user?.type
  const isAdminUser = userRole === 'admin' || userRole === 'ADMIN'
  const Layout = isAdminUser ? AdminLayout : UserLayout

  console.log('Using layout:', isAdminUser ? 'AdminLayout' : 'UserLayout')

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default PrivateRoute
