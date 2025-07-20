import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../../public/auth/api'
import { useProfile, useProfileForm, usePasswordForm } from './api'
import ProfileDetail from './ProfileDetail'
import ProfileEditForm from './ProfileEditForm'
import ChangePasswordForm from './ChangePasswordForm'
import Button from '../../../components/ui/Button/Button'
import Modal from '../../../components/ui/Modal/Modal'
import toast from 'react-hot-toast'

const TAB_PROFILE = 'profile';
const TAB_PASSWORD = 'password';

const Profile = () => {
  const { user } = useOutletContext()
  const { logout } = useAuth()
  const profileHook = useProfile();
  const {
    profile, 
    error,
    clearError 
  } = profileHook;

  const {
    formData,
    updating: profileUpdating,
    handleChange,
    handleSubmit,
    resetForm
  } = useProfileForm(profileHook);

  // Use new Formik-based password form hook
  const {
    formik: passwordFormik,
    loading: passwordLoading
  } = usePasswordForm();
  
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState(TAB_PROFILE)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [deleteData, setDeleteData] = useState({
    password: '',
    confirmation: ''
  })

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Basic file validation
      const maxSize = 5 * 1024 * 1024 // 5MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

      if (file.size > maxSize) {
        toast.error('Ukuran file terlalu besar (maksimal 5MB)');
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error('Format file tidak didukung');
        return;
      }

      // Update formData dengan file yang dipilih
      const updatedFormData = {
        ...formData,
        picture: file
      };
      
      resetForm(updatedFormData);
      toast.success('Foto profile berhasil dipilih!');
    } catch (err) {
      toast.error('Gagal memilih foto profile');
    }
  };

  // Initialize form data when profile changes
  useEffect(() => {
    if (profile) {
      resetForm({
        name: profile.full_name || '',
        username: profile.username || '',
        email: profile.email || '',
        phoneNumber: profile.phone_number || '',
        dateOfBirth: profile.dob ? profile.dob.slice(0, 10) : '', // format yyyy-mm-dd
        picture: profile.picture || null  // ✅ Include existing picture
      })
    }
  }, [profile, resetForm])

  const handleEditProfile = async (e) => {
    e.preventDefault()
    
    try {
      console.log('Starting profile update...')
      const result = await handleSubmit(e)
      if (result.success) {
        console.log('Profile update successful, closing edit mode...')
        setIsEditing(false)
        
        // Force reload profile data to ensure ProfileDetail shows latest data
        await profileHook.loadProfile()
      }
    } catch (error) {
      console.error('Profile update error:', error)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset form data to original values
    if (profile) {
      resetForm({
        name: profile.full_name || '',
        username: profile.username || '',
        email: profile.email || '',
        phoneNumber: profile.phone_number || '',
        dateOfBirth: profile.dob ? profile.dob.slice(0, 10) : '', // format yyyy-mm-dd
        picture: profile.picture || null  // ✅ Include existing picture
      })
    }
    clearError()
  }

  const handleEditProfileClick = () => {
    setIsEditing(true);
    // Set formData dengan data profile flatten
    resetForm({
      name: profile.full_name || '',
      username: profile.username || '',
      email: profile.email || '',
      phoneNumber: profile.phone_number || '',
      dateOfBirth: profile.dob ? profile.dob.slice(0, 10) : '', // format yyyy-mm-dd
      picture: profile.picture || null  // ✅ Include existing picture
    });
    clearError();
  };

  const handleCancelPassword = () => {
    passwordFormik.resetForm();
    clearError();
    setActiveTab(TAB_PROFILE);
  };

  // Tab navigation classes
  const tabClass = (tab) =>
    `px-6 py-2  font-semibold text-base duration-150 ` +
    (activeTab === tab
      ? ' text-primary'
      : ' text-gray-600 hover:text-primary')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
              My Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your Pilates journey today.
          </p>
        </div>
      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b border-gray-200 mb-6">
        <button
          className={tabClass(TAB_PROFILE)}
          onClick={() => { setActiveTab(TAB_PROFILE); setIsEditing(false); clearError(); }}
        >
          Profile
        </button>
        <button
          className={tabClass(TAB_PASSWORD)}
          onClick={() => { setActiveTab(TAB_PASSWORD); setIsEditing(false); clearError(); passwordFormik.resetForm(); }}
        >
          Change Password
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === TAB_PROFILE && (
        <>
          {/* Profile Section */}
          {!isEditing ? (
            <ProfileDetail
              profile={profile}
              onEdit={handleEditProfileClick}
            />
          ) : (
            <ProfileEditForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleEditProfile}
              onCancel={handleCancelEdit}
              loading={profileUpdating}
              onUploadPhoto={handleUploadPhoto}
            />
          )}
        </>
      )}
      {activeTab === TAB_PASSWORD && (
        <ChangePasswordForm
          formik={passwordFormik}
          loading={passwordLoading}
          onCancel={handleCancelPassword}
        />
      )}

    </div>
    </div>
  )
}

export default Profile
