import { jwtDecode } from 'jwt-decode'
import { STORAGE_KEYS } from './constants'
import { storage } from './storage'

export const isTokenValid = (token) => {
  if (!token) return false
  
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}

export const getTokenPayload = (token) => {
  if (!token) return null
  
  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

export const getUserFromToken = (token) => {
  const payload = getTokenPayload(token)
  return payload ? {
    id: payload.id,
    email: payload.email,
    type: payload.type
  } : null
}

export const clearAuthData = () => {
  storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
  storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
  storage.remove(STORAGE_KEYS.USER_DATA)
}