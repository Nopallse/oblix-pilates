import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@shared/store/authStore'
import { useAuth } from '../../../pages/public/auth/api'
import { useUserData } from '../../../pages/User/profile/api'
import { logoSekunder, getProfileImageUrl } from '../../../shared/utils/assets'

const Header = ({ user, onToggleSidebar, onToggleSidebarCollapse, sidebarCollapsed, showSidebarControls = true }) => {
  const authStore = useAuthStore()
  const { logout, loading: logoutLoading } = useAuth()
  const { userData, loading: userDataLoading, error: userDataError, loadUserData } = useUserData()
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

  // Refresh user data when dropdown is opened
  const handleDropdownToggle = () => {
    if (!showDropdown) {
      // Refresh data when opening dropdown
      loadUserData()
    }
    setShowDropdown(!showDropdown)
  }

  return (
    <header className={`bg-secondary sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'shadow-lg backdrop-blur-sm' : 'shadow-sm'
    }`}>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Desktop: Collapse/Expand - Only show if sidebar controls are enabled */}
            {showSidebarControls && (
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
            )}
            
            {/* Mobile: Open sidebar - Only show if sidebar controls are enabled */}
            {showSidebarControls && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Open sidebar"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            {/* Brand */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <img 
                  src={logoSekunder} 
                  alt="Oblix Pilates Logo" 
                  className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto " 
                />
              </Link>
            </div>
          </div>

          {/* Right side - Profile dropdown */}
          <div className="flex items-center" ref={dropdownRef}>
            {/* Error indicator */}
            {userDataError && (
              <div className="mr-2">
                <button
                  onClick={loadUserData}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  title="Error loading user data. Click to retry."
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                disabled={userDataLoading}
              >
                {/* Profile Photo */}
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-200 overflow-hidden">
                  {userDataLoading ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4 animate-spin text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  ) : userData?.picture ? (
                    <>
                      <img
                        src={getProfileImageUrl(userData.picture)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Profile image failed to load:', userData.picture)
                          e.target.style.display = 'none'
                          // Show fallback initials
                          const fallback = e.target.parentElement.querySelector('.profile-fallback')
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      {/* Fallback initials - hidden by default if image exists */}
                      <div className="profile-fallback absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm lg:text-base hidden">
                        {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </>
                  ) : (
                    /* No picture - show initials only */
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm lg:text-base">
                      {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                
                {/* Name */}
                <div className="hidden sm:block text-left">
                  <span className="text-xs sm:text-sm lg:text-base font-medium text-white block leading-tight">
                    {userDataLoading ? 'Loading...' : (userData?.name || 'User')}
                  </span>
                  {userData?.email && (
                    <span className="text-xs text-gray-300 block leading-tight truncate max-w-32 lg:max-w-40">
                      {userData.email}
                    </span>
                  )}
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
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={logoutLoading}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {logoutLoading ? 'Logging out...' : 'Sign out'}
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