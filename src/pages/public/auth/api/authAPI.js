import axios from 'axios'
import apiClient from '../../../../shared/services/apiClient'
import { API_ENDPOINTS, STORAGE_KEYS } from '../../../../shared/utils/constants'
import { storage } from '../../../../shared/utils/storage'
import { getUserFromToken } from '../../../../shared/utils/auth'

// Create auth-specific API client with token handling
const authApiClient = axios.create({
  baseURL: apiClient.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor untuk menambahkan token
authApiClient.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN)
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor untuk handle token refresh
authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN)
        
        if (refreshToken) {
          const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken })

          const { accessToken } = response.data.data
          storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken)

          // Retry original request dengan token baru
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return authApiClient(originalRequest)
        }
      } catch (refreshError) {
        // Jika refresh token gagal, clear storage
        storage.clear()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials)
      const { data } = response.data
      
      // Simpan tokens dan user data
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken)
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken)
      storage.set(STORAGE_KEYS.USER_DATA, data.user)
      
      return {
        success: true,
        user: data.user,
        accessToken: data.accessToken
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData)
      const { data } = response.data
      
      // Simpan tokens dan user data
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken)
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken)
      storage.set(STORAGE_KEYS.USER_DATA, data.user)
      
      return {
        success: true,
        user: data.user,
        accessToken: data.accessToken
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  },

  resetPassword: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, { email })
      return {
        success: true,
        message: 'Password reset email sent'
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Password reset failed'
      }
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN)
      
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN, {
        refreshToken
      })

      const { accessToken } = response.data.data
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
      
      return {
        success: true,
        accessToken
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Token refresh failed'
      }
    }
  },

  logout: () => {
    storage.clear()
    return { success: true }
  },

  getCurrentUser: () => {
    const userData = storage.get(STORAGE_KEYS.USER_DATA)
    const accessToken = storage.get(STORAGE_KEYS.ACCESS_TOKEN)
    
    if (userData) {
      return userData
    }
    
    if (accessToken) {
      return getUserFromToken(accessToken)
    }
    
    return null
  },

  isAuthenticated: () => {
    const accessToken = storage.get(STORAGE_KEYS.ACCESS_TOKEN)
    return !!accessToken
  },

  // Get token for external use
  getToken: () => {
    return storage.get(STORAGE_KEYS.ACCESS_TOKEN)
  },

  // Set token manually (for sync with store)
  setToken: (token) => {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, token)
  }
} 