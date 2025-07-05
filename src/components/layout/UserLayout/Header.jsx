import React from 'react'
import { useAuth } from '../../../hooks/useAuth.js'
import { useNavigate, Link } from 'react-router-dom'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Oblix Pilates</h1>
            </Link>
          </div>

          {/* Navigation - Only show for non-admin users */}
          {user?.type !== 'admin' && (
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/classes" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Classes
              </Link>
              <Link 
                to="/members" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Members
              </Link>
              <Link 
                to="/user" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Member Portal
              </Link>
            </nav>
          )}

          {/* Admin indicator - Only show for admin users */}
          {user?.type === 'admin' && (
            <div className="hidden md:flex items-center">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-200">
                🔧 Admin Panel
              </span>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              Welcome, <span className="font-medium text-gray-700">{user?.email || 'User'}</span>
            </span>
            
            <Link 
              to="/profile" 
              className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-blue-50 px-3 py-2 rounded-md transition-colors"
            >
              Profile
            </Link>
            
            <button 
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only show for non-admin users */}
      {user?.type !== 'admin' && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              📊 Dashboard
            </Link>
            <Link 
              to="/classes" 
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              🧘‍♀️ Classes
            </Link>
            <Link 
              to="/members" 
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              👥 Members
            </Link>
            <Link 
              to="/user" 
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              🏠 Member Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header