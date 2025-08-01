import { reportService } from '@shared/services/reportService';

export const reportAPI = {
  getRevenueReport: reportService.getRevenueReport,
  getPayrollReport: reportService.getPayrollReport,
  getPayrollDetail: reportService.getPayrollDetail,
}; 