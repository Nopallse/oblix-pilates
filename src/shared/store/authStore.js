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
            isSyncingPurchaseStatusFlag: false, // Flag to prevent multiple calls

            // Actions
            login: (user, accessToken, refreshToken) => {
                console.log('Auth Store - Login Data:', { user, accessToken, refreshToken })
                console.log('User role:', user?.role || user?.type)
                console.log('has_purchased_package:', user?.has_purchased_package)
                console.log('User object keys:', user ? Object.keys(user) : 'No user object')
                
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                    isLoading: false
                })
                
                console.log('Auth Store - State after login set')
                console.log('Auth Store - User in state:', user)
                console.log('Auth Store - has_purchased_package in state:', user?.has_purchased_package)
                
                // Sync purchase status after login with delay
                setTimeout(async () => {
                    try {
                        console.log('🔄 Syncing purchase status after login...')
                        const store = get()
                        if (!store.isSyncingPurchaseStatusFlag) {
                            await store.syncPurchaseStatus()
                        }
                    } catch (error) {
                        console.error('❌ Failed to sync purchase status after login:', error)
                    }
                }, 500); // Increased delay to ensure state is properly set
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
                const { isSyncingPurchaseStatusFlag } = get()
                
                // Prevent multiple simultaneous calls
                if (isSyncingPurchaseStatusFlag) {
                    console.log('🔄 Purchase status sync already in progress, skipping...')
                    return
                }
                
                try {
                    console.log('🔄 Syncing purchase status with backend...')
                    set({ isSyncingPurchaseStatus: true, isSyncingPurchaseStatusFlag: true })
                    
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
                            set({ user: updatedUser, isSyncingPurchaseStatus: false, isSyncingPurchaseStatusFlag: false })
                            console.log('✅ Purchase status synced:', responseData.has_purchased_package)
                            console.log('👤 Updated user:', updatedUser)
                        } else {
                            console.log('⚠️ No current user found for sync')
                            set({ isSyncingPurchaseStatus: false, isSyncingPurchaseStatusFlag: false })
                        }
                    } else {
                        console.log('❌ Invalid response format:', responseData)
                        set({ isSyncingPurchaseStatus: false, isSyncingPurchaseStatusFlag: false })
                    }
                } catch (error) {
                    console.error('❌ Failed to sync purchase status:', error)
                    set({ isSyncingPurchaseStatus: false, isSyncingPurchaseStatusFlag: false })
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
                    result: hasPackage,
                    user: user
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
            },

            // Refresh token manually
            refreshToken: async () => {
                try {
                    console.log('🔄 Auth Store - Manual token refresh...')
                    const { refreshToken } = get()
                    
                    if (!refreshToken) {
                        console.log('❌ No refresh token available')
                        throw new Error('No refresh token available')
                    }

                    const response = await authService.refreshToken(refreshToken)
                    
                    if (response.success) {
                        const currentUser = get().user
                        const oldToken = get().accessToken
                        
                        console.log('🔄 Auth Store - Updating tokens...')
                        console.log('🔑 Old access token:', oldToken?.substring(0, 20) + '...')
                        console.log('🔑 New access token:', response.accessToken.substring(0, 20) + '...')
                        
                        set({
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken,
                            user: currentUser,
                            isAuthenticated: true
                        })
                        
                        // Verify the update
                        const updatedToken = get().accessToken
                        console.log('🔍 Auth Store - Token after update:', updatedToken?.substring(0, 20) + '...')
                        
                        console.log('✅ Auth Store - Token refreshed successfully')
                        console.log('🔑 New access token in store:', response.accessToken.substring(0, 20) + '...')
                        return true
                    } else {
                        throw new Error('Refresh token failed')
                    }
                } catch (error) {
                    console.error('❌ Auth Store - Token refresh failed:', error)
                    
                    // Clear auth data and redirect to login
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        hasPurchasedPackage: null
                    })
                    
                    // Redirect to login
                    window.location.href = '/login'
                    return false
                }
            },

            // Sync token from localStorage (for external updates)
            syncTokenFromStorage: () => {
                try {
                    const authStorage = localStorage.getItem('auth-storage')
                    if (authStorage) {
                        const parsedStorage = JSON.parse(authStorage)
                        const storedToken = parsedStorage?.state?.accessToken
                        
                        if (storedToken) {
                            const currentToken = get().accessToken
                            if (storedToken !== currentToken) {
                                console.log('🔄 Auth Store - Syncing token from localStorage...')
                                console.log('🔑 Current token in store:', currentToken?.substring(0, 20) + '...')
                                console.log('🔑 Token in localStorage:', storedToken.substring(0, 20) + '...')
                                
                                set({
                                    accessToken: storedToken,
                                    user: get().user,
                                    isAuthenticated: true
                                })
                                
                                console.log('✅ Auth Store - Token synced from localStorage')
                            }
                        }
                    }
                } catch (error) {
                    console.error('❌ Error syncing token from localStorage:', error)
                }
            }
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
            // Persist all auth data including has_purchased_package
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading
            })
        }
    )
) 