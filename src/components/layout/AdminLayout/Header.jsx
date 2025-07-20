import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../pages/public/auth/api'
import { logoSekunder } from '../../../shared/utils/assets'

const Header = ({ user, onToggleSidebar, onToggleSidebarCollapse, sidebarCollapsed }) => {
  const { logout, loading } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    await logout()
  }

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className={`bg-secondary border-b border-gray-700/20 sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'shadow-lg backdrop-blur-sm' : 'shadow-sm'
    }`}>
      <div className="w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Left side - Sidebar Toggle & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Desktop: Collapse/Expand */}
            <button
              onClick={onToggleSidebarCollapse}
              className="hidden lg:inline-flex p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              )}
            </button>
            
            {/* Mobile: Open sidebar */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Brand */}
            <div className="flex-shrink-0">
              <Link to="/admin" className="flex items-center group">
                <img 
                  src={logoSekunder} 
                  alt="Oblix Pilates Admin" 
                  className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto transition-transform duration-200 group-hover:scale-105" 
                />
                <span className="ml-2 text-white font-semibold text-sm sm:text-base lg:text-lg">Admin</span>
              </Link>
            </div>
          </div>

          {/* Right side - Profile dropdown */}
          <div className="flex items-center" ref={dropdownRef}>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
              >
                {/* Profile Photo */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm lg:text-base ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-200">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
                </div>
                
                {/* Name */}
                <div className="hidden sm:block text-left">
                  <span className="text-xs sm:text-sm lg:text-base font-medium text-white block leading-tight">
                    {user?.email || 'Admin'}
                  </span>
                  <span className="text-xs text-gray-300 block leading-tight">
                    Administrator
                  </span>
                </div>
                
                {/* Dropdown Arrow */}
                <svg 
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-300 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                  {/* User Info in Dropdown */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.email || 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Administrator
                    </p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/admin"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/website"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {loading ? 'Logging out...' : 'Sign out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 