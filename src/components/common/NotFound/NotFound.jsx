import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button'
import { useAuth } from '../../../pages/public/auth/api'
import { ROUTES } from '../../../shared/utils/constants'

const NotFound = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin } = useAuth()

  const handleGoHome = () => {
    if (isAuthenticated) {
      const dashboardRoute = isAdmin() ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD
      navigate(dashboardRoute)
    } else {
      navigate(ROUTES.LOGIN)
    }
  }

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or you don't have permission to access it.</p>
        <Button onClick={handleGoHome}>
          Go to {isAuthenticated ? 'Dashboard' : 'Login'}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
