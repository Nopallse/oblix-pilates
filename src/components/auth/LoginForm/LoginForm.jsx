import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Card from '../../ui/Card'
import { ROUTES } from '../../../utils/constants'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    clearError()
  }, [clearError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await login(formData)
    
    if (result.success) {
      navigate(from, { replace: true })
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-medium mb-2">Demo Accounts:</p>
          <div className="space-y-1">
            <div>Admin: admin@example.com</div>
            <div>User: user@example.com</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm