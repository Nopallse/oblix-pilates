import { apiClient } from './apiClient';

export const authService = {
  // Fetch purchase status dari backend
  getPurchaseStatus: async () => {
    try {
      const response = await apiClient.get('/api/auth/purchase-status');
      console.log('🔍 Raw API response:', response);
      
      // Handle response yang berbeda format
      if (response.data && response.data.success) {
        // Format: { success: true, data: { has_purchased_package: true } }
        return response.data;
      } else if (response.data && typeof response.data.has_purchased_package === 'boolean') {
        // Format: { has_purchased_package: true }
        return response.data;
      } else {
        // Format lain, return response.data langsung
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching purchase status:', error);
      throw error;
    }
  },

  // Fetch user profile dari backend (jika ada endpoint /api/me)
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
}; 