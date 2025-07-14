import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor untuk menambahkan headers umum
apiClient.interceptors.request.use(
  (config) => {
    // Add any common headers here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor untuk handle common responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here if needed
    return Promise.reject(error)
  }
)

export default apiClient