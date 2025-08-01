import { apiClient } from '@shared/services';

export const dashboardService = {
  getDashboard: () => apiClient.get('/api/dashboard'),
}; 