import { apiClient } from '@shared/services';

export const packageAPI = {
  // Categories
  getCategories: async (params = {}) => {
    return await apiClient.get('/api/category', { params, silent: true });
  },

  // Membership Package
  getMembershipPackages: async (params = {}) => {
    return await apiClient.get('/api/membership-package', { params, silent: true });
  },
  createMembershipPackage: async (data) => {
    return await apiClient.post('/api/membership-package', data);
  },
  updateMembershipPackage: async (id, data) => {
    return await apiClient.put(`/api/membership-package/${id}`, data);
  },
  deleteMembershipPackage: async (id) => {
    return await apiClient.delete(`/api/membership-package/${id}`);
  },

  // Trial Package
  getTrialPackages: async (params = {}) => {
    // Tidak perlu category
    return await apiClient.get('/api/trial-package', { ...params, silent: true });
  },
  createTrialPackage: async (data) => {
    // Hapus category_id jika ada
    const { category_id, ...rest } = data;
    return await apiClient.post('/api/trial-package', rest);
  },
  updateTrialPackage: async (id, data) => {
    const { category_id, ...rest } = data;
    return await apiClient.put(`/api/trial-package/${id}`, rest);
  },
  deleteTrialPackage: async (id) => {
    return await apiClient.delete(`/api/trial-package/${id}`);
  },

  // Promo Package
  getPromoPackages: async (params = {}) => {
    // Tidak perlu category
    return await apiClient.get('/api/promo-package', { ...params, silent: true });
  },
  createPromoPackage: async (data) => {
    const { category_id, ...rest } = data;
    return await apiClient.post('/api/promo-package', rest);
  },
  updatePromoPackage: async (id, data) => {
    const { category_id, ...rest } = data;
    return await apiClient.put(`/api/promo-package/${id}`, rest);
  },
  deletePromoPackage: async (id) => {
    return await apiClient.delete(`/api/promo-package/${id}`);
  },

  // Bonus Package
  getBonusPackages: async (params = {}) => {
    return await apiClient.get('/api/bonus-package', { params, silent: true });
  },
  createBonusPackage: async (data) => {
    return await apiClient.post('/api/bonus-package', data);
  },
  updateBonusPackage: async (id, data) => {
    return await apiClient.put(`/api/bonus-package/${id}`, data);
  },
  deleteBonusPackage: async (id) => {
    return await apiClient.delete(`/api/bonus-package/${id}`);
  },
}; 