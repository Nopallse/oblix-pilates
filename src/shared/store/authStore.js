import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            // Actions
            login: (user, token) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false
                })
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
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
                return isAuthenticated && user?.type === role
            },

            hasAnyRole: (roles = []) => {
                const { user, isAuthenticated } = get()
                return isAuthenticated && user?.type && roles.includes(user.type)
            },

            isAdmin: () => {
                return get().hasRole('admin')
            },

            isUser: () => {
                return get().hasRole('user')
            },

            isBorrower: () => {
                return get().hasRole('borrower')
            },

            checkAuth: () => {
                const { token, user, isAuthenticated } = get()
                return isAuthenticated && token && user
            },

            // Clear all auth data
            clearAuth: () => {
                set({
                    user: null,
                    token: null,
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