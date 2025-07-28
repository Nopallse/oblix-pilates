import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../../pages/public/auth/api'
import Header from './Header'
import Sidebar from './Sidebar'

const AdminLayout = ({ children }) => {
  const { user, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header di atas semua */}
      <Header 
        user={user}
        onToggleSidebar={toggleSidebar}
        onToggleSidebarCollapse={toggleSidebarCollapse}
        sidebarCollapsed={sidebarCollapsed}
        showSidebarControls={true}
      />
      
      {/* Content area dengan sidebar dan main content */}
      <div className="flex flex-1 relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Fixed Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full z-50 transition-all duration-300
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:top-16 lg:h-[calc(100vh-4rem)]
        `}>
          <Sidebar 
            user={user}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
          />
        </div>
        
        {/* Main Content Area */}
        <div className={`
          flex-1 flex flex-col transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}>
          <main className="flex-1 bg-white">
            <div className="p-6">
              {children || <Outlet context={{ user }} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
