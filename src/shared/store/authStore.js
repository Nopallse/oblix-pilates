import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/authService'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            isSyncingPurchaseStatus: false,
            purchaseStatusLoading: false,
            hasPurchasedPackage: null, // Will be fetched from server

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
                    isLoading: false,
                    hasPurchasedPackage: null
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

            // Sync purchase status dengan backend
            syncPurchaseStatus: async () => {
                try {
                    console.log('🔄 Syncing purchase status with backend...')
                    set({ isSyncingPurchaseStatus: true })
                    
                    const response = await authService.getPurchaseStatus()
                    
                    console.log('📡 Backend response:', response)
                    
                    // Handle response yang langsung berisi data atau yang punya success property
                    const responseData = response.success ? response.data : response
                    
                    if (responseData && typeof responseData.has_purchased_package === 'boolean') {
                        const currentUser = get().user
                        console.log('👤 Current user before sync:', currentUser)
                        
                        if (currentUser) {
                            const updatedUser = {
                                ...currentUser,
                                has_purchased_package: responseData.has_purchased_package
                            }
                            set({ user: updatedUser, isSyncingPurchaseStatus: false })
                            console.log('✅ Purchase status synced:', responseData.has_purchased_package)
                            console.log('👤 Updated user:', updatedUser)
                        } else {
                            console.log('⚠️ No current user found for sync')
                            set({ isSyncingPurchaseStatus: false })
                        }
                    } else {
                        console.log('❌ Invalid response format:', responseData)
                        set({ isSyncingPurchaseStatus: false })
                    }
                } catch (error) {
                    console.error('❌ Failed to sync purchase status:', error)
                    set({ isSyncingPurchaseStatus: false })
                    // Jangan throw error, biarkan aplikasi tetap jalan
                }
            },

            // Sync user data dengan backend
            syncUserData: async () => {
                try {
                    console.log('Syncing user data with backend...')
                    const response = await authService.getCurrentUser()
                    
                    if (response.success) {
                        set({ user: response.data })
                        console.log('User data synced from backend')
                    }
                } catch (error) {
                    console.error('Failed to sync user data:', error)
                    // Jangan throw error, biarkan aplikasi tetap jalan
                }
            },

            // Fetch purchase status from server
            fetchPurchaseStatus: async () => {
                const { isAuthenticated } = get()
                
                if (!isAuthenticated) {
                    console.log('User not authenticated, skipping purchase status fetch')
                    return false
                }

                set({ purchaseStatusLoading: true })
                
                try {
                    console.log('Fetching purchase status from server...')
                    const response = await authService.getPurchaseStatus()
                    
                    if (response.success) {
                        const hasPurchased = response.data.has_purchased_package
                        console.log('Purchase status from server:', hasPurchased)
                        
                        set({ 
                            hasPurchasedPackage: hasPurchased,
                            purchaseStatusLoading: false
                        })
                        
                        return hasPurchased
                    } else {
                        console.error('Failed to fetch purchase status:', response.message)
                        set({ purchaseStatusLoading: false })
                        return false
                    }
                } catch (error) {
                    console.error('Error fetching purchase status:', error)
                    set({ purchaseStatusLoading: false })
                    return false
                }
            },

            // Update purchase status (for after successful payment)
            updatePurchaseStatus: (hasPurchased) => {
                console.log('Updating purchase status to:', hasPurchased)
                set({ hasPurchasedPackage: hasPurchased })
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

            // Check if user has purchased package (from server)
            hasPurchasedPackage: () => {
                const { user, isAuthenticated } = get()
                const hasPackage = isAuthenticated && user?.has_purchased_package === true
                console.log('hasPurchasedPackage check:', { 
                    isAuthenticated, 
                    hasPurchasedPackage: user?.has_purchased_package, 
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
                    isLoading: false,
                    hasPurchasedPackage: null
                })
            },

            // Clear localStorage and reset (for development/testing)
            clearLocalStorage: () => {
                console.log('Auth Store - Clearing localStorage')
                localStorage.removeItem('auth-storage')
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isLoading: false,
                    hasPurchasedPackage: null
                })
            }
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
            // Don't persist hasPurchasedPackage - always fetch from server
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading
                // hasPurchasedPackage is intentionally excluded
            })
        }
    )
) 