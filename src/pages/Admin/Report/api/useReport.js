import { useState, useCallback } from 'react';
import { reportAPI } from './reportAPI';

export const useReport = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [payrollData, setPayrollData] = useState(null);
  const [payrollDetailData, setPayrollDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRevenueReport = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportAPI.getRevenueReport(params);
      if (res.success) {
        setRevenueData(res.data);
      } else {
        setError('Gagal memuat data revenue report');
      }
    } catch (err) {
      setError('Gagal memuat data revenue report');
      console.error('Failed to fetch revenue report:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPayrollReport = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportAPI.getPayrollReport(params);
      if (res.success) {
        setPayrollData(res.data);
      } else {
        setError('Gagal memuat data payroll report');
      }
    } catch (err) {
      setError('Gagal memuat data payroll report');
      console.error('Failed to fetch payroll report:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPayrollDetail = useCallback(async (instructorId, params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportAPI.getPayrollDetail(instructorId, params);
      if (res.success) {
        setPayrollDetailData(res.data);
      } else {
        setError('Gagal memuat data payroll detail');
      }
    } catch (err) {
      setError('Gagal memuat data payroll detail');
      console.error('Failed to fetch payroll detail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    revenueData,
    payrollData,
    payrollDetailData,
    loading,
    error,
    fetchRevenueReport,
    fetchPayrollReport,
    fetchPayrollDetail,
  };
}; 