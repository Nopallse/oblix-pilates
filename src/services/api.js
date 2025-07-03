import axios from 'axios'
import { API_BASE_URL, STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants'
import { storage } from '../utils/storage'
import { isTokenValid } from '../utils/auth'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN)
    
    if (token && isTokenValid(token)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor untuk handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN)
        
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`,
            { refreshToken }
          )

          const { accessToken } = response.data.data
          storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken)

          // Retry original request dengan token baru
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Jika refresh token gagal, redirect ke login
        storage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api