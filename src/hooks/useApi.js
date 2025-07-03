import { useState, useCallback } from 'react'
import api from '../services/api'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (config) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api(config)
      setLoading(false)
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }, [])

  const get = useCallback((url, config = {}) => {
    return request({ method: 'GET', url, ...config })
  }, [request])

  const post = useCallback((url, data, config = {}) => {
    return request({ method: 'POST', url, data, ...config })
  }, [request])

  const put = useCallback((url, data, config = {}) => {
    return request({ method: 'PUT', url, data, ...config })
  }, [request])

  const del = useCallback((url, config = {}) => {
    return request({ method: 'DELETE', url, ...config })
  }, [request])

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    delete: del,
    clearError: () => setError(null)
  }
}