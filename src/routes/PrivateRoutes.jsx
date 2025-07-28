import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../shared/store/authStore'
import AdminLayout from '../components/layout/AdminLayout/AdminLayout'
import UserLayout from '../components/layout/UserLayout/UserLayout'

const PrivateRoute = ({ children }) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore?.isAuthenticated || false
  const isLoading = authStore?.isLoading || false
  const user = authStore?.user || null
  
  // Debug logging
  console.log('PrivateRoute Debug:', {
    isAuthenticated,
    isLoading,
    user,
    userRole: user?.role || user?.type,
    hasPurchasedPackage: user?.has_purchased_package
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading authentication...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login')
    return <Navigate to="/login" replace />
  }

  // Add additional check to ensure user data is loaded
  if (!user) {
    console.log('User data not loaded yet, showing loading')
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading user data...</span>
      </div>
    )
  }

  // Layout is now handled by FlexibleLayout in AppRoutes
  // Just render the Outlet without any layout wrapper
  console.log('PrivateRoute: Rendering Outlet (layout handled by FlexibleLayout)')
  return <Outlet />
}

export default PrivateRoute
