import { useState, useCallback } from 'react';
import { memberAPI } from './memberAPI';

export const useMember = () => {
  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await memberAPI.getMembers(params);
      setMembers(res.data?.members || []);
      
      // Map pagination fields to match expected format
      const rawPagination = res.data?.pagination;
      if (rawPagination) {
        setPagination({
          current_page: rawPagination.currentPage,
          total_pages: rawPagination.totalPages,
          total_items: rawPagination.totalItems,
          per_page: rawPagination.itemsPerPage,
          has_next: (rawPagination.currentPage < rawPagination.totalPages),
          has_prev: (rawPagination.currentPage > 1)
        });
      } else {
        setPagination({});
      }
    } catch (err) {
      setError('Gagal memuat data member');
      console.error('Failed to fetch members:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    members,
    pagination,
    loading,
    error,
    fetchMembers,
  };
}; 