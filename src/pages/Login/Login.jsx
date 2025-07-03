import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
  const { login, isLoading, error, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  // Redirect if already authenticated
  if (isAuthenticated) {
    // Redirect admin to admin page, others to dashboard
    const redirectPath = user?.type === 'admin' ? '/admin' : '/'
    return <Navigate to={redirectPath} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(credentials)
    
    if (result.success) {
      // Let the redirect happen via the effect above
      setTimeout(() => {
        window.location.reload() // Force reload to update auth state
      }, 100)
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  // Demo login functions
  const handleAdminLogin = () => {
    setCredentials({
      email: 'admin@example.com',
      password: 'admin123'
    })
    // Auto submit after setting credentials
    setTimeout(() => {
      login({ email: 'admin@example.com', password: 'admin123' })
    }, 100)
  }

  const handleUserLogin = () => {
    setCredentials({
      email: 'user@example.com',
      password: 'user123'
    })
    setTimeout(() => {
      login({ email: 'user@example.com', password: 'user123' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Oblix Pilates</h1>
          <p className="text-blue-100 text-sm">Studio Management System</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-center text-gray-700 font-medium mb-3">Demo Logins:</h3>
              <div className="space-y-2">
                <button 
                  type="button" 
                  onClick={handleAdminLogin}
                  disabled={isLoading}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  🔧 Demo Admin Login
                </button>
                <button 
                  type="button" 
                  onClick={handleUserLogin}
                  disabled={isLoading}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  👤 Demo User Login
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                <strong>Admin:</strong> admin@example.com / admin123<br/>
                <strong>User:</strong> user@example.com / user123
              </p>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Forgot your password? 
                <a href="#reset" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                  Reset here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
