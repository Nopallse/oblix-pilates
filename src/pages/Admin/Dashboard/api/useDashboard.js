import { useState, useCallback } from 'react';
import { dashboardAPI } from './dashboardAPI';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardAPI.getDashboard();
      setDashboardData(res.data);
    } catch (err) {
      setError('Gagal memuat data dashboard');
      console.error('Failed to fetch dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dashboardData,
    loading,
    error,
    fetchDashboard,
  };
}; 