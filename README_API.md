# API Structure Documentation

## Overview

This project uses a centralized API client with comprehensive error handling, retry logic, and file upload capabilities. The API structure is organized into modular functions that provide a clean and consistent interface for making HTTP requests.

## Core Components

### 1. API Client (`src/shared/services/apiClient.js`)

The main API client that handles all HTTP requests with built-in features:

- **Automatic token management**: Automatically adds Bearer tokens to requests
- **Error handling**: Centralized error processing with toast notifications
- **Retry logic**: Automatic retry for failed requests with exponential backoff
- **File upload**: Built-in file validation and upload capabilities
- **Development logging**: Request/response logging in development mode

#### Key Features:

```javascript
import { apiClient } from '@/shared/services/apiClient';

// Basic HTTP methods
await apiClient.get('/endpoint', { params: {}, silent: true });
await apiClient.post('/endpoint', data, { successMessage: 'Success!' });
await apiClient.patch('/endpoint', data);
await apiClient.put('/endpoint', data);
await apiClient.delete('/endpoint');

// File upload
await apiClient.uploadFile('/upload', file, additionalData, options);
await apiClient.uploadFileWithProgress('/upload', file, additionalData, {
  onProgress: (percent) => console.log(`${percent}%`)
});

// File validation
const validation = apiClient.validateFile(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png']
});
```

### 2. Error Handler (`src/shared/services/apiErrorHandler.js`)

Provides comprehensive error handling utilities:

```javascript
import { 
  showToast, 
  handleResponseError, 
  extractErrorMessage,
  isNetworkError,
  isAuthError,
  isValidationError 
} from '@/shared/services/apiErrorHandler';

// Show different types of toasts
showToast('success', 'Operation successful');
showToast('error', 'Something went wrong');
showToast('warning', 'Please check your input');
showToast('info', 'Information message');

// Check error types
if (isNetworkError(error)) {
  // Handle network errors
}

if (isAuthError(error)) {
  // Handle authentication errors
}
```

### 3. Retry Logic (`src/shared/services/apiRetry.js`)

Provides retry mechanisms for failed requests:

```javascript
import { 
  retryRequest, 
  retryOnNetworkError, 
  retryOnServerError 
} from '@/shared/services/apiRetry';

// Basic retry
await retryRequest(async () => {
  return await apiClient.get('/endpoint');
});

// Retry with custom config
await retryRequest(async () => {
  return await apiClient.post('/endpoint', data);
}, {
  maxRetries: 5,
  baseDelay: 2000,
  retryableStatuses: [500, 502, 503]
});
```

## API Organization

### Auth API (`src/pages/public/auth/api/authAPI.js`)

```javascript
import { authAPI } from '@/pages/public/auth/api/authAPI';

// Authentication functions
await authAPI.register(userData);
await authAPI.login(credentials);
await authAPI.logout();

// Profile management
await authAPI.getProfile();
await authAPI.updateProfile(profileData);
await authAPI.changePassword(passwordData);

// Password reset
await authAPI.forgotPassword(email);
await authAPI.resetPassword(resetData);
```

### Profile API (`src/pages/User/profile/api/profileAPI.js`)

```javascript
import { profileAPI } from '@/pages/User/profile/api/profileAPI';

// Profile management
await profileAPI.getProfile();
await profileAPI.updateProfile(profileData);
await profileAPI.changePassword(passwordData);
await profileAPI.uploadProfilePicture(file);
await profileAPI.deleteAccount(password);

// Activity and data
await profileAPI.getActivityStats();
await profileAPI.getUserBookings(params);
await profileAPI.getUserClasses(params);
await profileAPI.cancelBooking(bookingId);

// Notifications
await profileAPI.getNotifications(params);
await profileAPI.markNotificationRead(notificationId);
await profileAPI.markAllNotificationsRead();
```

## React Hooks

### useAuth Hook

```javascript
import { useAuth } from '@/pages/public/auth/api/useAuth';

const {
  user,
  token,
  isAuthenticated,
  isLoading,
  error,
  login,
  register,
  logout,
  resetPassword,
  changePassword,
  updateProfile,
  clearError
} = useAuth();
```

### useProfile Hook

```javascript
import { useProfile } from '@/pages/User/profile/api/useProfile';

const {
  profile,
  activityStats,
  bookings,
  classes,
  notifications,
  loading,
  updating,
  uploading,
  error,
  loadProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
  deleteAccount,
  cancelBooking,
  markNotificationRead,
  clearError
} = useProfile();
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Development mode
DEV=true
```

### Constants (`src/shared/utils/constants.js`)

```javascript
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  // ... more endpoints
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  // ... more status codes
};

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png'],
  MAX_FILES: 10
};
```

## Usage Examples

### Basic API Call

```javascript
import { apiClient } from '@/shared/services/apiClient';

// Simple GET request
const response = await apiClient.get('/users');

// POST with success message
const response = await apiClient.post('/users', userData, {
  successMessage: 'User created successfully'
});

// Silent request (no toast notifications)
const response = await apiClient.get('/users', { silent: true });
```

### File Upload

```javascript
import { apiClient } from '@/shared/services/apiClient';

// Upload single file
const response = await apiClient.uploadFile('/upload', file);

// Upload with progress
const response = await apiClient.uploadFileWithProgress('/upload', file, {}, {
  onProgress: (percent) => {
    console.log(`Upload progress: ${percent}%`);
  }
});

// Validate file before upload
const validation = apiClient.validateFile(file, {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png']
});

if (validation.isValid) {
  await apiClient.uploadFile('/upload', file);
} else {
  console.error('File validation failed:', validation.errors);
}
```

### Error Handling

```javascript
import { apiClient } from '@/shared/services/apiClient';

try {
  const response = await apiClient.get('/users');
  // Handle success
} catch (error) {
  // Error is automatically processed and toast is shown
  console.error('API Error:', error.message);
}
```

### Custom Error Handling

```javascript
import { apiClient } from '@/shared/services/apiClient';

try {
  const response = await apiClient.get('/users', { 
    silent: true, // Don't show automatic toast
    hideErrorToast: true // Don't show error toast
  });
} catch (error) {
  // Handle error manually
  if (error.status === 401) {
    // Redirect to login
  } else if (error.status === 404) {
    // Show custom message
  }
}
```

## Best Practices

1. **Use the provided hooks**: Use `useAuth` and `useProfile` hooks instead of calling API functions directly
2. **Handle loading states**: Always check loading states before showing UI
3. **Validate data**: Use the provided validation schemas before making API calls
4. **Error boundaries**: Wrap components in error boundaries to catch unexpected errors
5. **Silent requests**: Use `silent: true` for requests that shouldn't show success toasts
6. **File validation**: Always validate files before upload using `apiClient.validateFile()`

## Error Codes

The API client automatically handles common HTTP status codes:

- **400**: Bad Request - Validation errors
- **401**: Unauthorized - Authentication required
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **422**: Unprocessable Entity - Validation errors
- **429**: Too Many Requests - Rate limiting
- **500**: Internal Server Error - Server error
- **502/503/504**: Gateway/Service errors

## Development

In development mode, the API client provides detailed logging:

- Request URLs and methods
- Response status codes
- Error details
- Retry attempts

This helps with debugging and development workflow. 