import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import NotFound from '../../common/NotFound'

const RoleGuard = ({ 
  children, 
  allowedRoles = [], 
  fallback = <NotFound /> 
}) => {
  const { user, hasRole } = useAuth()

  if (!user) {
    return fallback
  }

  const hasAccess = allowedRoles.length === 0 || 
                   allowedRoles.some(role => hasRole(role))

  if (!hasAccess) {
    return fallback
  }

  return children
}

export default RoleGuard