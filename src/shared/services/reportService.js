import { apiClient } from '@shared/services';

export const reportService = {
  getRevenueReport: (params) => apiClient.get('/api/report/revenue', { params }),
  getPayrollReport: (params) => apiClient.get('/api/report/payroll', { params }),
  getPayrollDetail: (instructorId, params) => apiClient.get(`/api/report/payroll/${instructorId}`, { params }),
}; 