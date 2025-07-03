import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const Profile = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Name:</label>
                <span className="text-gray-900">{user?.name || 'Demo User'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Email:</label>
                <span className="text-gray-900">{user?.email || 'demo@oblixpilates.com'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Role:</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user?.type === 'admin' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {user?.type === 'admin' ? 'Administrator' : 'Member'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <label className="text-sm font-medium text-gray-600">Member Since:</label>
                <span className="text-gray-900">{user?.createdAt || 'January 2024'}</span>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">
                Edit Profile
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium">
                Change Password
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium">
                Notification Settings
              </button>
              <button 
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">45</div>
              <div className="text-sm text-gray-600">Classes {user?.type === 'admin' ? 'Managed' : 'Attended'}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">120</div>
              <div className="text-sm text-gray-600">{user?.type === 'admin' ? 'Members Enrolled' : 'Hours Practiced'}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
