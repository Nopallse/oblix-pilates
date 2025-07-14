import React, { createContext, useContext } from 'react'
import { useAuth as useAuthHook } from '../pages/public/auth/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const authValue = useAuthHook()

  return (
    <AuthContext.Provider value={authValue}>
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