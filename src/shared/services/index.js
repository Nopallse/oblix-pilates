// API Client
export { default as apiClient } from './apiClient'

// Error handling utilities
export { 
  showToast, 
  handleResponseError,
  extractErrorMessage,
  isNetworkError,
  isAuthError,
  isValidationError,
  isServerError,
  getErrorDetails,
  createErrorHandler,
  withErrorHandling
} from './apiErrorHandler'
// Retry utilities (if needed)
export { 
  retryRequest,
  retryWithConfig,
  retryOnNetworkError,
  retryOnServerError,
  retryOnTimeout,
  retryWithJitter,
  retryWithErrorHandler,
  createRetryableApiFunction,
  retryConfig
} from './apiRetry'

