import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../shared/store/authStore'

const PublicRoute = ({ children }) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore?.isAuthenticated || false
  const isLoading = authStore?.isLoading || false
  const user = authStore?.user || null
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  // Debug logging
  useEffect(() => {
    console.log('PublicRoute Debug:', {
      isAuthenticated,
      isLoading,
      user,
      userRole: user?.role || user?.type,
      hasPurchasedPackage: user?.has_purchased_package,
      currentPath: location.pathname
    });
  }, [isAuthenticated, isLoading, user, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && isLoginPage) {
    const userRole = user?.role || user?.type
    let redirectTo;
    
    if (userRole === 'admin' || userRole === 'ADMIN') {
      redirectTo = '/admin';
    } else {
      // Check if user has purchased package
      const hasPurchasedPackage = user?.has_purchased_package === true;
      redirectTo = hasPurchasedPackage ? '/dashboard' : '/buy-package';
    }
    
    console.log('PublicRoute - Redirect after login:', {
      userRole,
      hasPurchasedPackage: user?.has_purchased_package,
      redirectTo
    });
    
    return <Navigate to={redirectTo} replace />
  }

  // Redirect authenticated admin away from all public pages
  if (isAuthenticated && (user?.role === 'admin' || user?.type === 'admin')) {
    return <Navigate to="/admin" replace />
  }

  // Redirect authenticated users based on purchase status
  if (isAuthenticated && (user?.role === 'user' || user?.type === 'user')) {
    const hasPurchasedPackage = user?.has_purchased_package === true;
    const redirectTo = hasPurchasedPackage ? '/dashboard' : '/buy-package';
    
    console.log('PublicRoute - Redirect user:', {
      hasPurchasedPackage,
      redirectTo
    });
    
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PublicRoute
