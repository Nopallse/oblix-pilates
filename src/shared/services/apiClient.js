import axios from 'axios'
import { showToast } from './apiErrorHandler'

// Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
}

// Create axios instance
const axiosInstance = axios.create(API_CONFIG)

// ==================== REQUEST INTERCEPTOR ====================
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🌐 ${config.method?.toUpperCase()}: ${config.baseURL}${config.url}`)
    }

    return config
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('Request interceptor error:', error)
    }
    return Promise.reject(error)
  }
)

// ==================== RESPONSE INTERCEPTOR ====================
axiosInstance.interceptors.response.use(
  (response) => {
    // Log success in development
    if (import.meta.env.DEV && response.config.url !== '/api/auth/profile') {
      console.log(`✅ ${response.config.method?.toUpperCase()} Success: ${response.config.url}`)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle token refresh - hanya untuk 401 dan bukan request refresh token itu sendiri
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/api/auth/refresh-token')) {
      
      originalRequest._retry = true
      return handleTokenRefresh(originalRequest)
    }

    // Handle other errors
    return Promise.reject(error)
  }
)

// ==================== UTILITY FUNCTIONS ====================

// Get auth token from localStorage
const getAuthToken = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage')
    if (!authStorage) return null
    const parsedStorage = JSON.parse(authStorage)
    return parsedStorage?.state?.accessToken || null
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error getting token:', error)
    }
    return null
  }
}
 
// Handle token refresh
const handleTokenRefresh = async (originalRequest) => {
  try {
    console.log('🔄 Attempting token refresh...')
    
    const authStorage = localStorage.getItem('auth-storage')
    const parsedStorage = JSON.parse(authStorage)
    const refreshToken = parsedStorage?.state?.refreshToken

    if (!refreshToken) {
      console.log('❌ No refresh token available')
      throw new Error('No refresh token available')
    }

    // Request new token
    const response = await axios.post(`${API_CONFIG.baseURL}/api/auth/refresh-token`, { 
      refreshToken: refreshToken 
    })
    
    console.log('📡 Refresh token response:', response.data)
    
    // Handle response format sesuai dengan API response yang diberikan
    const responseData = response.data
    const newAccessToken = responseData.data?.accessToken || responseData.accessToken

    if (!newAccessToken) {
      console.log('❌ No access token received from refresh')
      console.log('Response data:', responseData)
      throw new Error('No access token received from refresh')
    }

    // Update localStorage dengan token baru
    console.log('🔍 Current localStorage structure:', parsedStorage)
    console.log('🔍 Current accessToken in storage:', parsedStorage.state.accessToken?.substring(0, 20) + '...')
    
    parsedStorage.state.accessToken = newAccessToken
    // Note: API tidak mengembalikan refresh token baru, jadi kita keep yang lama
    localStorage.setItem('auth-storage', JSON.stringify(parsedStorage))

    // Verify the update
    const updatedStorage = JSON.parse(localStorage.getItem('auth-storage'))
    console.log('🔍 Updated localStorage structure:', updatedStorage)
    console.log('🔍 Updated accessToken in storage:', updatedStorage.state.accessToken?.substring(0, 20) + '...')

    // Update axios headers
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

    console.log('✅ Token refreshed successfully')
    console.log('🔑 New access token:', newAccessToken.substring(0, 20) + '...')
    console.log('📝 Updated localStorage and axios headers')
    
    // Force Zustand to update by triggering a re-render
    // This ensures the store state is in sync with localStorage
    const authStore = JSON.parse(localStorage.getItem('auth-storage'))
    if (authStore && authStore.state) {
        console.log('🔄 Forcing Zustand store update...')
        // Dispatch a custom event to notify Zustand
        window.dispatchEvent(new CustomEvent('auth-token-updated', {
            detail: { accessToken: newAccessToken }
        }))
    }
    
    // Retry original request
    return axiosInstance(originalRequest)
  } catch (error) {
    console.error('❌ Token refresh failed:', error)
    // Jangan hapus storage dan jangan redirect, biar bisa debug dulu
    localStorage.removeItem('auth-storage')
    window.location.href = '/login'
    return Promise.reject(error)
  }
}

// ==================== HTTP METHODS ====================

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const get = async (endpoint, options = {}) => {
  const { 
    params, 
    silent = false, 
    showError = true,
    ...axiosOptions 
  } = options

  try {
    const response = await axiosInstance.get(endpoint, {
      params,
      ...axiosOptions
    })

    return {
      success: true,
      data: response.data.data,
      status: response.status
    }
  } catch (error) {
    if (showError && !silent) {
      showToast('error', error.response?.data?.message || error.message)
    }
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      error
    }
  }
}

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {any} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const post = async (endpoint, data = null, options = {}) => {
  const { 
    silent = false, 
    showError = true,
    showSuccess = true,
    successMessage,
    ...axiosOptions 
  } = options

  try {
    const config = {
      headers: axiosOptions.headers || {},
      ...axiosOptions
    }

    // Handle FormData
    if (data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    const response = await axiosInstance.post(endpoint, data, config)

    // Show success message
    if (showSuccess && !silent) {
      const message = successMessage || response.data?.message || 'Operation successful'
      showToast('success', message)
    }

    return {
      success: true,
      data: response.data.data,
      status: response.status
    }
  } catch (error) {
    if (showError && !silent) {
      showToast('error', error.response?.data?.message || error.message)
    }
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      error
    }
  }
}

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {any} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const put = async (endpoint, data = null, options = {}) => {
  const { 
    silent = false, 
    showError = true,
    showSuccess = true,
    successMessage,
    ...axiosOptions 
  } = options

  try {
    const config = {
      headers: axiosOptions.headers || {},
      ...axiosOptions
    }

    // Handle FormData
    if (data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    const response = await axiosInstance.put(endpoint, data, config)

    // Show success message
    if (showSuccess && !silent) {
      const message = successMessage || response.data?.message || 'Update successful'
      showToast('success', message)
    }

    return {
      success: true,
      data: response.data.data,
      status: response.status
    }
  } catch (error) {
    if (showError && !silent) {
      showToast('error', error.response?.data?.message || error.message)
    }
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      error
    }
  }
}

/**
 * PATCH request
 * @param {string} endpoint - API endpoint
 * @param {any} data - Request data
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const patch = async (endpoint, data = null, options = {}) => {
  const { 
    silent = false, 
    showError = true,
    showSuccess = true,
    successMessage,
    ...axiosOptions 
  } = options

  try {
    const config = {
      headers: axiosOptions.headers || {},
      ...axiosOptions
    }

    // Handle FormData
    if (data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    const response = await axiosInstance.patch(endpoint, data, config)

    // Show success message
    if (showSuccess && !silent) {
      const message = successMessage || response.data?.message || 'Update successful'
      showToast('success', message)
    }

    return {
      success: true,
      data: response.data.data,
      status: response.status
    }
  } catch (error) {
    if (showError && !silent) {
      showToast('error', error.response?.data?.message || error.message)
    }
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      error
    }
  }
}

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const del = async (endpoint, options = {}) => {
  const { 
    silent = false, 
    showError = true,
    showSuccess = true,
    successMessage,
    ...axiosOptions 
  } = options

  try {
    const response = await axiosInstance.delete(endpoint, axiosOptions)

    // Show success message
    if (showSuccess && !silent) {
      const message = successMessage || response.data?.message || 'Delete successful'
      showToast('success', message)
    }

    return {
      success: true,
      data: response.data.data,
      status: response.status
    }
  } catch (error) {
    if (showError && !silent) {
      showToast('error', error.response?.data?.message || error.message)
    }
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      error
    }
  }
}

// ==================== FILE UPLOAD UTILITIES ====================

/**
 * Upload file with progress
 * @param {string} endpoint - Upload endpoint
 * @param {File|FileList} files - Files to upload
 * @param {object} additionalData - Additional form data
 * @param {object} options - Upload options
 * @returns {Promise} Upload result
 */
export const uploadFile = async (endpoint, files, additionalData = {}, options = {}) => {
  const { 
    onProgress, 
    silent = false,
    showError = true,
    showSuccess = true,
    ...axiosOptions 
  } = options

  try {
    const formData = new FormData()

    // Add files
    if (files instanceof File) {
      formData.append('file', files)
    } else if (files instanceof FileList || Array.isArray(files)) {
      Array.from(files).forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })
    } else if (typeof files === 'object') {
      Object.entries(files).forEach(([key, file]) => {
        formData.append(key, file)
      })
    }

    // Add additional data
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value)
      }
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...axiosOptions.headers,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentComplete = (progressEvent.loaded / progressEvent.total) * 100
          onProgress(Math.round(percentComplete))
        }
      },
      ...axiosOptions,
    }

    const response = await axiosInstance.post(endpoint, formData, config)

    if (showSuccess && !silent) {
      const message = response.data?.message || 'File uploaded successfully'
      showToast('success', message)
    }

    return {
      success: true,
      data: response.data,
      status: response.status
    }
  } catch (error) {
    if (showError && !silent) {
      showToast('error', error.response?.data?.message || error.message)
    }
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      error
    }
  }
}

// ==================== VALIDATION UTILITIES ====================

/**
 * Validate file
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxFiles = 10
  } = options

  const errors = []

  if (file instanceof FileList || Array.isArray(file)) {
    if (file.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`)
    }

    Array.from(file).forEach((f) => {
      if (f.size > maxSize) {
        errors.push(`File ${f.name} is too large (max ${Math.round(maxSize / 1024 / 1024)}MB)`)
      }
      if (!allowedTypes.includes(f.type)) {
        errors.push(`File type ${f.name} not supported`)
      }
    })
  } else if (file instanceof File) {
    if (file.size > maxSize) {
      errors.push(`File is too large (max ${Math.round(maxSize / 1024 / 1024)}MB)`)
    }
    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not supported')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// ==================== EXPORT ====================

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  uploadFile,
  validateFile,
  axios: axiosInstance,
}

export default apiClient