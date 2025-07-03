import api from './api'
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants'
import { storage } from '../utils/storage'
import { getUserFromToken } from '../utils/auth'

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials)
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

  refreshToken: async () => {
    try {
      const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN)
      
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
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
  }
}