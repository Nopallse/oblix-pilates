import { apiClient } from "@shared/services";

/**
 * Auth API Functions
 * Base URL: /api/v1/auth
 */

export const authAPI = {
    register: async (userData) => {
        const response = await apiClient.post('/api/auth/register', userData, { silent: true });
        return response;
    },

    login: async (credentials) => {
        console.log('AuthAPI - Login request:', credentials);
        const response = await apiClient.post('/api/auth/login', credentials, { silent: true });
        console.log('AuthAPI - Login response:', response);
        return response;
    },

    // GET /api/v1/auth/profile
    getProfile: async () => {
        const response = await apiClient.get('/api/auth/profile', { silent: true });
        return response;
    },

    // PATCH /api/v1/auth/profile
    updateProfile: async (profileData) => {
        const response = await apiClient.patch('/api/auth/profile', profileData, { silent: true });
        return response;
    },

    // POST /api/v1/auth/logout
    logout: async () => {
        // Hapus data login dari localStorage/sessionStorage
        localStorage.removeItem('auth-storage');
        sessionStorage.removeItem('auth-storage');
        await new Promise(res => setTimeout(res, 1000));
        return Promise.resolve();
    },

    // POST /api/v1/auth/change-password
    changePassword: async (passwordData) => {
        const response = await apiClient.post('/api/auth/change-password', passwordData, { silent: true });
        return response;
    },

    // POST /api/v1/auth/forgot-password
    forgotPassword: async (email) => {
        const response = await apiClient.post('/api/auth/forgot-password', { email }, { silent: true });
        return response;
    },

    // POST /api/v1/auth/reset-password
    resetPassword: async (resetData) => {
        const response = await apiClient.post('/api/auth/reset-password', resetData, { silent: true });
        return response;
    }
}; 