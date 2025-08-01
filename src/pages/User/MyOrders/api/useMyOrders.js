import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@shared/services';
import { useApiToast } from '@shared/hooks';

export const useMyOrders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useApiToast();

  const loadMyOrders = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination parameters
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      // Add filter parameters
      if (params.status) queryParams.append('status', params.status);
      if (params.payment_status) queryParams.append('payment_status', params.payment_status);
      
      const queryString = queryParams.toString();
      const url = `/api/order/my-orders${queryString ? `?${queryString}` : ''}`;
      
      console.log('Fetching my orders with URL:', url);
      
      const response = await apiClient.get(url);
      
      console.log('My orders response:', response);
      
      if (response.success) {
        setData(response.data);
        console.log('My orders data set:', response.data);
      } else {
        setError(response.message || 'Failed to load orders');
        showToast('error', response.message || 'Failed to load orders');
      }
    } catch (err) {
      console.error('Error loading my orders:', err);
      const errorMessage = err.message || 'An error occurred while loading orders';
      setError(errorMessage);
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const getOrderDetail = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching order detail for ID:', orderId);
      
      const response = await apiClient.get(`/api/order/my-orders/${orderId}`);
      
      console.log('Order detail response:', response);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Failed to load order detail';
        setError(errorMessage);
        showToast('error', errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      console.error('Error loading order detail:', err);
      const errorMessage = err.message || 'An error occurred while loading order detail';
      setError(errorMessage);
      showToast('error', errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadMyOrders();
  }, [loadMyOrders]);

  return {
    data,
    loading,
    error,
    loadMyOrders,
    getOrderDetail,
    clearError
  };
}; 