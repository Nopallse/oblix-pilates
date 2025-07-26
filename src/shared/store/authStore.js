import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,

            // Actions
            login: (user, accessToken, refreshToken) => {
                console.log('Auth Store - Login Data:', { user, accessToken, refreshToken })
                console.log('User role:', user?.role || user?.type)
                console.log('has_purchased_package:', user?.has_purchased_package)
                
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                    isLoading: false
                })
            },

            logout: () => {
                console.log('Auth Store - Logging out')
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isLoading: false
                })
            },

            setLoading: (loading) => {
                set({ isLoading: loading })
            },

            updateUser: (userData) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...userData }
                    })
                }
            },

            // Helper methods
            hasRole: (role) => {
                const { user, isAuthenticated } = get()
                const userRole = user?.role || user?.type
                const hasRole = isAuthenticated && (userRole === role || userRole === role.toUpperCase())
                console.log('hasRole check:', { userRole, requestedRole: role, hasRole })
                return hasRole
            },

            hasAnyRole: (roles = []) => {
                const { user, isAuthenticated } = get()
                const userRole = user?.role || user?.type
                const hasAnyRole = isAuthenticated && userRole && roles.some(role => 
                    userRole === role || userRole === role.toUpperCase()
                )
                console.log('hasAnyRole check:', { userRole, requestedRoles: roles, hasAnyRole })
                return hasAnyRole
            },

            isAdmin: () => {
                const { user, isAuthenticated } = get()
                const userRole = user?.role || user?.type
                const isAdmin = isAuthenticated && (userRole === 'admin' || userRole === 'ADMIN')
                console.log('isAdmin check:', { userRole, isAdmin })
                return isAdmin
            },

            isUser: () => {
                const { user, isAuthenticated } = get()
                const userRole = user?.role || user?.type
                const isUser = isAuthenticated && (userRole === 'user' || userRole === 'USER')
                console.log('isUser check:', { userRole, isUser })
                return isUser
            },

            isBorrower: () => {
                const { user, isAuthenticated } = get()
                const userRole = user?.role || user?.type
                const isBorrower = isAuthenticated && (userRole === 'borrower' || userRole === 'BORROWER')
                console.log('isBorrower check:', { userRole, isBorrower })
                return isBorrower
            },

            checkAuth: () => {
                const { accessToken, user, isAuthenticated } = get()
                const isAuth = isAuthenticated && accessToken && user
                console.log('checkAuth:', { isAuthenticated, hasToken: !!accessToken, hasUser: !!user, isAuth })
                return isAuth
            },

            // Get current user role
            getUserRole: () => {
                const { user } = get()
                const userRole = user?.role || user?.type
                console.log('getUserRole:', userRole)
                return userRole
            },

            // Check if user has purchased package
            hasPurchasedPackage: () => {
                const { user, isAuthenticated } = get()
                const hasPackage = isAuthenticated && user?.has_purchased_package === true
                console.log('hasPurchasedPackage check:', { 
                    isAuthenticated, 
                    hasPackage: user?.has_purchased_package, 
                    result: hasPackage 
                })
                return hasPackage
            },

            // Clear all auth data
            clearAuth: () => {
                console.log('Auth Store - Clearing auth data')
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isLoading: false
                })
            }
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
) 