import { apiClient } from '@shared/services';

export const scheduleAPI = {
  // Get calendar data
  getCalendarData: async (params = {}) => {
    return await apiClient.get('/api/schedule/calendar', { params, silent: true });
  },

  // Get group schedule by ID
  getGroupScheduleById: async (id) => {
    return await apiClient.get(`/api/schedule/group/${id}`, { silent: true });
  },

  // Get semi-private schedule by ID
  getSemiPrivateScheduleById: async (id) => {
    return await apiClient.get(`/api/schedule/semi-private/${id}`, { silent: true });
  },

  // Get private schedule by ID
  getPrivateScheduleById: async (id) => {
    return await apiClient.get(`/api/schedule/private/${id}`, { silent: true });
  },

  // Get trainers
  getTrainers: async (params = {}) => {
    return await apiClient.get('/api/trainer', { params, silent: true });
  },

  // Get classes
  getClasses: async (params = {}) => {
    return await apiClient.get('/api/class', { params, silent: true });
  },

  // Create group schedule
  createGroupSchedule: async (data) => {
    return await apiClient.post('/api/schedule/group', data);
  },

  // Update group schedule
  updateGroupSchedule: async (id, data) => {
    return await apiClient.put(`/api/schedule/group/${id}`, data);
  },

  // Update semi-private schedule
  updateSemiPrivateSchedule: async (id, data) => {
    return await apiClient.put(`/api/schedule/semi-private/${id}`, data);
  },

  // Update private schedule
  updatePrivateSchedule: async (id, data) => {
    return await apiClient.put(`/api/schedule/private/${id}`, data);
  },

  // Delete group schedule
  deleteGroupSchedule: async (id) => {
    return await apiClient.delete(`/api/schedule/group/${id}`);
  },

  // Delete semi-private schedule
  deleteSemiPrivateSchedule: async (id) => {
    return await apiClient.delete(`/api/schedule/semi-private/${id}`);
  },

  // Delete private schedule
  deletePrivateSchedule: async (id) => {
    return await apiClient.delete(`/api/schedule/private/${id}`);
  },

  // Create semi-private schedule
  createSemiPrivateSchedule: async (data) => {
    return await apiClient.post('/api/schedule/semi-private', data);
  },

  // Update semi-private schedule
  updateSemiPrivateSchedule: async (id, data) => {
    return await apiClient.put(`/api/schedule/semi-private/${id}`, data);
  },

  // Delete semi-private schedule
  deleteSemiPrivateSchedule: async (id) => {
    return await apiClient.delete(`/api/schedule/semi-private/${id}`);
  },

  // Create private schedule
  createPrivateSchedule: async (data) => {
    return await apiClient.post('/api/schedule/private', data);
  },

  // Update private schedule
  updatePrivateSchedule: async (id, data) => {
    return await apiClient.put(`/api/schedule/private/${id}`, data);
  },

  // Delete private schedule
  deletePrivateSchedule: async (id) => {
    return await apiClient.delete(`/api/schedule/private/${id}`);
  },
}; 