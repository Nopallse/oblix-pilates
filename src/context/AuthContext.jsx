import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'
import { USER_ROLES } from '../utils/constants'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check if user is already authenticated on app start
    const initializeAuth = () => {
      try {
        const currentUser = authService.getCurrentUser()
        const isAuth = authService.isAuthenticated()

        if (currentUser && isAuth) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: currentUser }
          })
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: { error: 'Failed to initialize authentication' }
        })
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials) => {
    dispatch({ type: 'AUTH_START' })

    try {
      const result = await authService.login(credentials)

      if (result.success) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: result.user }
        })
        return { success: true }
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: { error: result.error }
        })
        return { success: false, error: result.error }
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred'
      dispatch({
        type: 'AUTH_FAILURE',
        payload: { error: errorMessage }
      })
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const hasRole = (role) => {
    return state.user?.type === role
  }

  const isAdmin = () => hasRole(USER_ROLES.ADMIN)
  const isUser = () => hasRole(USER_ROLES.USER)

  const value = {
    ...state,
    login,
    logout,
    clearError,
    hasRole,
    isAdmin,
    isUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}