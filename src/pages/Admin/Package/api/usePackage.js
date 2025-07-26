import { useState, useCallback } from 'react';
import { packageAPI } from './packageAPI';

export const usePackage = () => {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    per_page: 20,
  });
  const [currentCategory, setCurrentCategory] = useState('membership');

  // Ambil API function sesuai kategori
  const getApiFunction = useCallback((category) => {
    switch (category) {
      case 'membership': return packageAPI.getMembershipPackages;
      case 'trial': return packageAPI.getTrialPackages;
      case 'promo': return packageAPI.getPromoPackages;
      case 'bonus': return packageAPI.getBonusPackages;
      default: return packageAPI.getMembershipPackages;
    }
  }, []);

  // Ambil create API function sesuai kategori
  const getCreateApiFunction = useCallback((category) => {
    switch (category) {
      case 'membership': return packageAPI.createMembershipPackage;
      case 'trial': return packageAPI.createTrialPackage;
      case 'promo': return packageAPI.createPromoPackage;
      case 'bonus': return packageAPI.createBonusPackage;
      default: return packageAPI.createMembershipPackage;
    }
  }, []);

  // Ambil update API function sesuai kategori
  const getUpdateApiFunction = useCallback((category) => {
    switch (category) {
      case 'membership': return packageAPI.updateMembershipPackage;
      case 'trial': return packageAPI.updateTrialPackage;
      case 'promo': return packageAPI.updatePromoPackage;
      case 'bonus': return packageAPI.updateBonusPackage;
      default: return packageAPI.updateMembershipPackage;
    }
  }, []);

  // Ambil delete API function sesuai kategori
  const getDeleteApiFunction = useCallback((category) => {
    switch (category) {
      case 'membership': return packageAPI.deleteMembershipPackage;
      case 'trial': return packageAPI.deleteTrialPackage;
      case 'promo': return packageAPI.deletePromoPackage;
      case 'bonus': return packageAPI.deleteBonusPackage;
      default: return packageAPI.deleteMembershipPackage;
    }
  }, []);

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      const response = await packageAPI.getCategories();
      const categoriesArr = response.data?.categories || [];
      setCategories(categoriesArr);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  }, []);

  // Load packages
  const loadPackages = useCallback(async (category = currentCategory, page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const apiFunction = getApiFunction(category);
      const response = await apiFunction({ page, limit });
      // Mapping data
      const packagesArr = response.data?.packages || [];
      setPackages(packagesArr);
      // Mapping pagination
      const rawPagination = response.data?.pagination;
      setPagination({
        current_page: rawPagination?.currentPage || 1,
        total_pages: rawPagination?.totalPages || 1,
        total_items: rawPagination?.totalItems || packagesArr.length,
        per_page: rawPagination?.itemsPerPage || limit,
      });
    } catch (err) {
      setError('Gagal memuat data package');
    } finally {
      setLoading(false);
    }
  }, [currentCategory, getApiFunction]);

  // Create package
  const createPackage = useCallback(async (data) => {
    setLoading(true);
    try {
      const apiFunction = getCreateApiFunction(currentCategory);
      let payload = { ...data };
      if (currentCategory === 'trial' || currentCategory === 'promo') {
        // Hapus category_id jika ada
        delete payload.category_id;
      }
      const response = await apiFunction(payload);
      if (response.success) {
        await loadPackages(currentCategory, pagination.current_page, pagination.per_page);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [currentCategory, getCreateApiFunction, loadPackages, pagination]);

  // Update package
  const updatePackage = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const apiFunction = getUpdateApiFunction(currentCategory);
      let payload = { ...data };
      if (currentCategory === 'trial' || currentCategory === 'promo') {
        delete payload.category_id;
      }
      const response = await apiFunction(id, payload);
      if (response.success) {
        await loadPackages(currentCategory, pagination.current_page, pagination.per_page);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [currentCategory, getUpdateApiFunction, loadPackages, pagination]);

  // Delete package
  const deletePackage = useCallback(async (id) => {
    setLoading(true);
    try {
      const apiFunction = getDeleteApiFunction(currentCategory);
      const response = await apiFunction(id);
      if (response.success) {
        await loadPackages(currentCategory, pagination.current_page, pagination.per_page);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [currentCategory, getDeleteApiFunction, loadPackages, pagination]);

  // Ganti kategori
  const changeCategory = (category) => {
    setCurrentCategory(category);
    loadPackages(category, 1, pagination.per_page);
  };

  // Mapping data sesuai kategori
  const tableData = packages.map((item, idx) => {
    if (currentCategory === 'bonus') {
      return {
        ...item,
        id: item.package_id, // tambahkan id untuk Table
        member_name: item.members?.[0]?.name ?? '-',
        member_id: item.members?.[0]?.id ?? '',
        group_session: item.group_session ?? '-',
        private_session: item.private_session ?? '-',
        actions: '',
      };
    }
    if (currentCategory === 'promo') {
      return {
        ...item,
        start_time: item.start_time ?? '-',
        end_time: item.end_time ?? '-',
        group_session: item.group_session ?? '-',
        private_session: item.private_session ?? '-',
        actions: '',
      };
    }
    // membership & trial
    return {
      ...item,
      group_session: item.group_session ?? '-',
      private_session: item.private_session ?? '-',
      actions: '',
    };
  });

  return {
    packages,
    categories,
    loading,
    error,
    pagination,
    currentCategory,
    loadPackages,
    loadCategories,
    changeCategory,
    createPackage,
    updatePackage,
    deletePackage,
  };
}; 