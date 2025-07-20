import { apiClient } from "@shared/services";

/**
 * Profile API Functions
 * Base URL: /api/v1/profile
 */

export const profileAPI = {
    // GET /api/v1/profile
    getProfile: async () => {
        const response = await apiClient.get('/profile', { silent: true });
        return response;
    },

    // PATCH /api/v1/profile
    updateProfile: async (profileData) => {
        const response = await apiClient.patch('/profile', profileData);
        return response;
    },

    // POST /api/v1/profile/change-password
    changePassword: async (passwordData) => {
        const response = await apiClient.post('/profile/change-password', passwordData);
        return response;
    },

    // POST /api/v1/profile/upload-picture
    uploadProfilePicture: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await apiClient.uploadFile('/profile/upload-picture', file);
        return response;
    },

    // // POST /api/v1/profile/delete-account
    // deleteAccount: async (password) => {
    //     const response = await apiClient.post('/profile/delete-account', { password });
    //     return response;
    // },

    // // GET /api/v1/profile/activity-stats
    // getActivityStats: async () => {
    //     const response = await apiClient.get('/profile/activity-stats', { silent: true });
    //     return response;
    // },

    // // GET /api/v1/bookings
    // getUserBookings: async (params = {}) => {
    //     const response = await apiClient.get('/bookings', { params, silent: true });
    //     return response;
    // },

    // // GET /api/v1/classes
    // getUserClasses: async (params = {}) => {
    //     const response = await apiClient.get('/classes', { 
    //         params: { ...params, user: 'me' }, 
    //         silent: true 
    //     });
    //     return response;
    // },

    // // POST /api/v1/bookings/:id/cancel
    // cancelBooking: async (bookingId) => {
    //     const response = await apiClient.post(`/bookings/${bookingId}/cancel`);
    //     return response;
    // },

    // // GET /api/v1/notifications
    // getNotifications: async (params = {}) => {
    //     const response = await apiClient.get('/notifications', { params, silent: true });
    //     return response;
    // },

    // // POST /api/v1/notifications/:id/read
    // markNotificationRead: async (notificationId) => {
    //     const response = await apiClient.post(`/notifications/${notificationId}/read`, {}, { silent: true });
    //     return response;
    // },

    // // POST /api/v1/notifications/read-all
    // markAllNotificationsRead: async () => {
    //     const response = await apiClient.post('/notifications/read-all', {}, { silent: true });
    //     return response;
    // }
}; 