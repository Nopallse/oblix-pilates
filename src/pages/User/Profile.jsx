import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../../pages/public/auth/api'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import Modal from '../../components/ui/Modal/Modal'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useOutletContext()
  const { logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    dateOfBirth: user?.dateOfBirth || '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleLogout = () => {
    logout()
  }

  const handleEditProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Password changed successfully!')
      setShowPasswordModal(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      toast.error('Failed to change password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            {!isEditing && (
              <Button
                variant="submit"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
        
        {isEditing ? (
          <form onSubmit={handleEditProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Username"
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                placeholder="Enter your username"
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                placeholder="Enter your phone number"
              />
              <Input
                label="Date of Birth"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Full Name:</label>
                <span className="text-gray-900 font-medium">{profileData.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Username:</label>
                <span className="text-gray-900 font-medium">{profileData.username || 'Not provided'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Email:</label>
                <span className="text-gray-900 font-medium">{profileData.email || 'Not provided'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Phone Number:</label>
                <span className="text-gray-900 font-medium">{profileData.phoneNumber || 'Not provided'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Date of Birth:</label>
                <span className="text-gray-900 font-medium">
                  {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <label className="text-sm font-medium text-gray-600">Account Type:</label>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user?.type === 'admin' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {user?.type === 'admin' ? 'Administrator' : 'Member'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="text-4xl font-bold text-blue-600 mb-2">45</div>
            <div className="text-sm text-gray-600 font-medium">Classes {user?.type === 'admin' ? 'Managed' : 'Attended'}</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="text-4xl font-bold text-green-600 mb-2">120</div>
            <div className="text-sm text-gray-600 font-medium">{user?.type === 'admin' ? 'Members Enrolled' : 'Hours Practiced'}</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false)
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          })
        }}
        title="Change Password"
      >
        <div className="p-6">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              placeholder="Enter your current password"
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              placeholder="Enter your new password"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              placeholder="Confirm your new password"
              required
            />
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowPasswordModal(false)
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  })
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Profile
