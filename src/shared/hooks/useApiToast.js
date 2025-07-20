import { useCallback } from 'react'
import { showToast as showToastFromService } from '../services/apiErrorHandler'

/**
 * Custom hook for API toast notifications
 * Provides consistent toast messaging across the application
 */
export const useApiToast = () => {
  // Success toast
  const showSuccessToast = useCallback((message) => {
    showToastFromService('success', message)
  }, [])

  // Error toast
  const showErrorToast = useCallback((message) => {
    showToastFromService('error', message)
  }, [])

  // Warning toast
  const showWarningToast = useCallback((message) => {
    showToastFromService('warning', message)
  }, [])

  // Info toast
  const showInfoToast = useCallback((message) => {
    showToastFromService('info', message)
  }, [])

  // Generic toast with type
  const showToast = useCallback((type, message) => {
    showToastFromService(type, message)
  }, [])

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast
  }
}

export default useApiToast 