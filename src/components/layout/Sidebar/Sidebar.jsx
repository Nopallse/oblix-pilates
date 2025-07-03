import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const Sidebar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      label: 'Dashboard',
      path: user?.type === 'admin' ? '/admin' : '/dashboard',
      icon: '📊'
    },
    {
      label: 'Classes',
      path: '/classes',
      icon: '🧘‍♀️'
    },
    {
      label: 'Members',
      path: '/members',
      icon: '👥'
    },
    {
      label: 'Member Portal',
      path: '/user',
      icon: '🏠'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: '👤'
    }
  ]


  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Oblix Pilates</h2>
        <p className="text-sm text-gray-500 mt-1">Studio Management</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            const isAdminItem = item.path === '/admin'
            
            return (
              <button
                key={item.path}
                className={`
                  w-full flex items-center px-4 py-3 mb-2 text-left rounded-lg transition-all duration-200
                  ${isActive 
                    ? isAdminItem 
                      ? 'bg-red-100 text-red-700 border-l-4 border-red-500' 
                      : 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }
                  ${isAdminItem && !isActive ? 'hover:bg-red-50 hover:text-red-600' : ''}
                `}
                onClick={() => navigate(item.path)}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {isAdminItem && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* User info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {user?.email || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.type || 'user'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar