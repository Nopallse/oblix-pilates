import { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { profileAPI } from './profileAPI'
import { extractErrorMessage } from '@shared/services/apiErrorHandler'
import { validateForm, changePasswordValidation } from './profileValidation'
import { useApiToast } from '@shared/hooks';
import { useAuthStore } from '@shared/store';

// Password validation schema
const passwordChangeValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Current password is required')
    .min(6, 'Current password must be at least 6 characters'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
});

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
      if (!response.success || !response.data) {
        throw new Error('Profile data not found')
      }
      const user = response.data
      console.log('user Response:', user)
      const newProfileData = {
        id: user.id,
        email: user.email,
        username: user.username || '',
        full_name: user.full_name || '',
        phone_number: user.phone_number || '',
        dob: user.dob || '',
        picture: user.picture || '',
        member_code: user.member_code || '',
        address: user.address || '',
        date_of_join: user.date_of_join || '',
        status: user.status || '',
      }
      // ...mapping seperti sebelumnya
      setProfile(newProfileData)
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat profile')
      setError(errorMessage)
      setProfile(null) // atau biarkan profile tetap null
    } finally {
      setLoading(false)
    }
  }, [])


  // Update profile
  const updateProfile = useCallback(async (profileData) => {
    console.log('Updating profile with data:', profileData)
    setUpdating(true)
    setError(null)
    
    try {
      if (!profileData.name || !profileData.email) {
        throw new Error('Nama dan email wajib diisi')
      }

      // Compare with current profile data to only send changed fields
      const updateData = {}
      
      if (profileData.name !== profile?.full_name) {
        updateData.full_name = profileData.name
      }
      if (profileData.username !== profile?.username) {
        updateData.username = profileData.username
      }
      if (profileData.email !== profile?.email) {
        updateData.email = profileData.email
      }
      if (profileData.phoneNumber !== profile?.phone_number) {
        updateData.phone_number = profileData.phoneNumber
      }
      if (profileData.dateOfBirth !== (profile?.dob ? profile.dob.slice(0, 10) : '')) {
        updateData.dob = profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString() : null
      }
      if (profileData.address !== profile?.address) {
        updateData.address = profileData.address
      }
      if (profileData.picture instanceof File) {
        updateData.picture = profileData.picture
      }

      console.log('Updating profile with changed data:', updateData)

      const response = await profileAPI.updateProfile(updateData)
      console.log('Profile update API response:', response)
      
      // Reload profile data after update
      console.log('Reloading profile data after update...')
      await loadProfile()
      console.log('Profile reload completed')
      
      return response.data
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal mengupdate profile')
      setError(errorMessage)
      throw err
    } finally {
      setUpdating(false)
    }
  }, [profile, loadProfile])

  // Change password
  const changePassword = useCallback(async (passwordData) => {
    setUpdating(true)
    setError(null)
    
    try {
      // Validate password data using profileValidation
      const validation = validateForm(passwordData, changePasswordValidation)
      
      if (!validation.isValid) {
        // Return validation errors to be displayed in form
        return {
          success: false,
          errors: validation.errors
        }
      }

      console.log('Changing password...')
      const response = await profileAPI.changePassword(passwordData)
      console.log('Password change API response:', response)
      
      return {
        success: true,
        data: response.data
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal mengubah password')
      setError(errorMessage)
      throw err
    } finally {
      setUpdating(false)
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
    dateOfBirth: '',
    picture: null
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
        dateOfBirth: initialValues.dateOfBirth || '',
        picture: initialValues.picture || null
      });
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        picture: null
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

/**
 * Custom hook for password change form with Formik
 * @returns {object} Form state and handlers
 */
export const usePasswordForm = () => {
  const authStore = useAuthStore();
  const logout = authStore?.logout || (() => {});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: passwordChangeValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        const result = await profileAPI.changePassword(values);
        
        if (result.success) {
          resetForm();
          // Logout after successful password change
          setTimeout(() => {
            logout();
          }, 2000);
        } else {
          // Handle validation errors from API
          if (result.errors) {
            // Set field errors
            Object.keys(result.errors).forEach(field => {
              formik.setFieldError(field, result.errors[field]);
            });
          }
        }
      } catch (error) {
        console.error('Password change error:', error);
        // Let apiClient handle toast for errors
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    }
  });

  return {
    formik,
    loading
  };
}; 

// Hook untuk mengambil data user (bisa digunakan di Header)
export const useUserData = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const authStore = useAuthStore()

  // Load user data
  const loadUserData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await profileAPI.getProfile()
      if (!response.success || !response.data) {
        throw new Error('User data not found')
      }
      const user = response.data
      console.log('User data loaded from API:', user)
      
      // Map user data untuk Header
      const mappedUserData = {
        id: user.id,
        name: user.full_name || user.username || 'User',
        email: user.email || '',
        username: user.username || '',
        picture: user.picture || '',
        member_code: user.member_code || '',
        status: user.status || '',
        role: user.role || user.type || 'user',
        has_purchased_package: user.has_purchased_package
      }
      
      setUserData(mappedUserData)
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat data user')
      setError(errorMessage)
      console.error('Error loading user data from API:', err)
      
      // Fallback ke local storage data
      const localUser = authStore?.user
      if (localUser) {
        console.log('Using fallback data from local storage:', localUser)
        const fallbackUserData = {
          id: localUser.id,
          name: localUser.name || localUser.full_name || localUser.username || 'User',
          email: localUser.email || '',
          username: localUser.username || '',
          picture: localUser.picture || '',
          member_code: localUser.member_code || '',
          status: localUser.status || '',
          role: localUser.role || localUser.type || 'user',
          has_purchased_package: localUser.has_purchased_package
        }
        setUserData(fallbackUserData)
        setError(null) // Clear error since we have fallback data
      } else {
        setUserData(null)
      }
    } finally {
      setLoading(false)
    }
  }, [authStore])

  // Load user data on mount
  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  return {
    userData,
    loading,
    error,
    loadUserData
  }
} 