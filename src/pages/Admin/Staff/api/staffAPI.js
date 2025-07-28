import { apiClient } from '@shared/services';

export const staffAPI = {
  // Get all staff with pagination and search
  getStaff: async (params = {}) => {
    return await apiClient.get('/api/staff', { params, silent: true });
  },

  // Get staff by ID
  getStaffById: async (id) => {
    return await apiClient.get(`/api/staff/${id}`, { silent: true });
  },

  // Create new staff
  createStaff: async (data) => {
    return await apiClient.post('/api/staff', data);
  },

  // Update staff
  updateStaff: async (id, data) => {
    return await apiClient.put(`/api/staff/${id}`, data);
  },

  // Delete staff
  deleteStaff: async (id) => {
    return await apiClient.delete(`/api/staff/${id}`);
  },
}; 