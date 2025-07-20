import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../../pages/public/auth/api'
import Header from './Header'
import Sidebar from './Sidebar'

const AdminLayout = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header
        user={user}
        onToggleSidebar={toggleSidebar}
        onToggleSidebarCollapse={toggleSidebarCollapse}
        sidebarCollapsed={sidebarCollapsed}
      />
      <div className="flex flex-1">
        <Sidebar
          user={user}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
        />
        <main className="flex-1 p-6 bg-white">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
