import { useState, useEffect, useCallback } from 'react'
import { profileAPI } from './profileAPI'
import { extractErrorMessage } from '@shared/services/apiErrorHandler'

export const useProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  // Load profile data
  const loadProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await profileAPI.getProfile()
      // Mapping flatten
      const user = response.data
      const member = user.Member || {}

      setProfile({
        id: user.id,
        email: user.email,
        role: user.role,
        username: member.username || '',
        full_name: member.full_name || '',
        phone_number: member.phone_number || '',
        dob: member.dob || '',
        profile_picture: member.profile_picture || '',
        // tambahkan field lain jika perlu
      })
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat profile')
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])


  // Update profile
  const updateProfile = useCallback(async (profileData) => {
    setUpdating(true)
    setError(null)
    
    try {
      if (!profileData.name || !profileData.email) {
        throw new Error('Nama dan email wajib diisi')
      }

      const response = await profileAPI.updateProfile(profileData)
      setProfile(response.data)
      return response.data
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal mengupdate profile')
      setError(errorMessage)
      throw err
    } finally {
      setUpdating(false)
    }
  }, [])

  // Change password
  const changePassword = useCallback(async (passwordData) => {
    setUpdating(true)
    
    try {
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        throw new Error('Mohon lengkapi semua field')
      }

      if (passwordData.newPassword.length < 8) {
        throw new Error('Password baru harus minimal 8 karakter')
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('Konfirmasi password tidak cocok')
      }

      const response = await profileAPI.changePassword(passwordData)
      return response.data
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal mengubah password')
      setError(errorMessage)
      throw err
    } finally {
      setUpdating(false)
    }
  }, [])

  // Upload profile picture
  const uploadProfilePicture = useCallback(async (file) => {
    setUploading(true)
    
    try {
      if (!file) {
        throw new Error('File tidak boleh kosong')
      }

      // Basic file validation
      const maxSize = 5 * 1024 * 1024 // 5MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

      if (file.size > maxSize) {
        throw new Error('Ukuran file terlalu besar (maksimal 5MB)')
      }

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Format file tidak didukung')
      }

      const response = await profileAPI.uploadProfilePicture(file)
      
      // Update profile with new picture URL
      setProfile(prev => ({
        ...prev,
        profilePicture: response.data.profilePicture
      }))
      
      return response.data
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal mengupload foto profile')
      setError(errorMessage)
      throw err
    } finally {
      setUploading(false)
    }
  }, [])


 
  // Load all data on mount
  useEffect(() => {
    loadProfile()
  }, [])

  return {
    // State
    profile,
    loading,
    updating,
    uploading,
    error,
    
    // Actions
    loadProfile,
    updateProfile,
    changePassword,
    uploadProfilePicture,
    
    // Utilities
    clearError: () => setError(null)
  }
}

// Form hooks for profile management
export const useProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  })
  const { updateProfile, updating } = useProfile()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(formData)
      return { success: true }
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, error }
    }
  }

  // Make resetForm stable with useCallback
  const resetForm = useCallback((initialValues) => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        username: initialValues.username || '',
        email: initialValues.email || '',
        phoneNumber: initialValues.phoneNumber || '',
        dateOfBirth: initialValues.dateOfBirth || ''
      });
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: ''
      });
    }
  }, []);

  return {
    formData,
    updating,
    handleChange,
    handleSubmit,
    resetForm
  }
}

export const usePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const { changePassword, updating } = useProfile()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await changePassword(formData)
      resetForm()
      return { success: true }
    } catch (error) {
      console.error('Password change error:', error)
      return { success: false, error }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Make resetForm stable with useCallback
  const resetForm = useCallback(() => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowPassword(false)
  }, [])

  return {
    formData,
    showPassword,
    updating,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    resetForm
  }
} 