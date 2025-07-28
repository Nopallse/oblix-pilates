import { useState, useCallback } from 'react';
import { staffAPI } from './staffAPI';

export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    per_page: 20,
  });
  const [search, setSearch] = useState('');

  // Load staff
  const loadStaff = useCallback(async (page = 1, limit = 20, searchQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      const response = await staffAPI.getStaff(params);
      const staffArr = response.data?.staff || [];
      setStaff(staffArr);
      
      // Mapping pagination
      const rawPagination = response.data?.pagination?.pagination || response.data?.pagination;
      setPagination({
        current_page: rawPagination?.current_page || 1,
        total_pages: rawPagination?.total_pages || 1,
        total_items: rawPagination?.total_items || staffArr.length,
        per_page: rawPagination?.per_page || limit,
      });
    } catch (err) {
      setError('Gagal memuat data staff');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create staff
  const createStaff = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await staffAPI.createStaff(data);
      if (response.success) {
        await loadStaff(pagination.current_page, pagination.per_page, search);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [loadStaff, pagination, search]);

  // Update staff
  const updateStaff = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const response = await staffAPI.updateStaff(id, data);
      if (response.success) {
        await loadStaff(pagination.current_page, pagination.per_page, search);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [loadStaff, pagination, search]);

  // Delete staff
  const deleteStaff = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await staffAPI.deleteStaff(id);
      if (response.success) {
        await loadStaff(pagination.current_page, pagination.per_page, search);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [loadStaff, pagination, search]);

  // Search staff
  const searchStaff = useCallback((searchQuery) => {
    setSearch(searchQuery);
    loadStaff(1, pagination.per_page, searchQuery);
  }, [loadStaff, pagination.per_page]);

  // Change page
  const changePage = useCallback((page) => {
    loadStaff(page, pagination.per_page, search);
  }, [loadStaff, pagination.per_page, search]);

  return {
    staff,
    loading,
    error,
    pagination,
    search,
    loadStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    searchStaff,
    changePage,
  };
}; 