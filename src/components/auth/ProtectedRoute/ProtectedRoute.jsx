import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import Loading from '../../ui/Loading'
import { ROUTES } from '../../../utils/constants'

const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    // Simpan lokasi yang ingin diakses untuk redirect setelah login
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute