import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../shared/store/authStore'
import AdminLayout from '../components/layout/AdminLayout/AdminLayout'
import UserLayout from '../components/layout/UserLayout/UserLayout'


const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isLoading, isAdmin, user } = useAuthStore()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />
  }

  // Use AdminLayout for admin users, UserLayout for regular users
  const Layout = user?.type === 'admin' ? AdminLayout : UserLayout

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default PrivateRoute
