export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData'
}

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: '/auth/logout',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Profile endpoints
  GET_PROFILE: '/profile',
  UPDATE_PROFILE: '/profile',
  CHANGE_PASSWORD: '/profile/change-password',
  UPLOAD_PROFILE_PICTURE: '/profile/upload-picture',
  DELETE_ACCOUNT: '/profile/delete-account',
  GET_ACTIVITY_STATS: '/profile/activity-stats',
  
  // User management endpoints
  GET_USERS: '/users',
  GET_USER: '/users/:id',
  CREATE_USER: '/users',
  UPDATE_USER: '/users/:id',
  DELETE_USER: '/users/:id',
  
  // Class endpoints
  GET_CLASSES: '/classes',
  GET_CLASS: '/classes/:id',
  CREATE_CLASS: '/classes',
  UPDATE_CLASS: '/classes/:id',
  DELETE_CLASS: '/classes/:id',
  BOOK_CLASS: '/classes/:id/book',
  CANCEL_BOOKING: '/bookings/:id/cancel',
  
  // Booking endpoints
  GET_BOOKINGS: '/bookings',
  GET_BOOKING: '/bookings/:id',
  CREATE_BOOKING: '/bookings',
  UPDATE_BOOKING: '/bookings/:id',
  DELETE_BOOKING: '/bookings/:id',
  
  // Trainer endpoints
  GET_TRAINERS: '/trainers',
  GET_TRAINER: '/trainers/:id',
  CREATE_TRAINER: '/trainers',
  UPDATE_TRAINER: '/trainers/:id',
  DELETE_TRAINER: '/trainers/:id',
  
  // File upload endpoints
  UPLOAD_FILE: '/upload',
  UPLOAD_MULTIPLE_FILES: '/upload/multiple',
  
  // Notification endpoints
  GET_NOTIFICATIONS: '/notifications',
  MARK_NOTIFICATION_READ: '/notifications/:id/read',
  MARK_ALL_NOTIFICATIONS_READ: '/notifications/read-all',
  DELETE_NOTIFICATION: '/notifications/:id'
}

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users'
  },
  USER: {
    DASHBOARD: '/user/dashboard'
  }
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILES: 10
}

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
}