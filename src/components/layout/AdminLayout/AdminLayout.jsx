import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../../pages/public/auth/api'
import Sidebar from './Sidebar'

const AdminLayout = () => {
  const { user, isLoading } = useAuth()

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

  return (
    <div className="min-h-screen flex">
      <Sidebar user={user} />
      <main className="flex-1 bg-gray-50">
        <div className="p-6">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
