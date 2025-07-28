import { apiClient } from "@shared/services";

/**
 * Package API Functions
 * Unified API for all package-related operations
 */

export const myPackageAPI = {
    // GET /api/member-package/my-packages
    getMyPackages: async () => {
        const response = await apiClient.get('/api/member-package/my-packages', { silent: true });
        return response;
    },

    // GET /api/member-package/invoice/{invoice_number}
    getInvoiceDetail: async (invoiceNumber) => {
        const response = await apiClient.get(`/api/member-package/invoice/${invoiceNumber}`, { silent: true });
        return response;
    },

    // GET /api/membership-package
    getMembershipPackages: async () => {
        const response = await apiClient.get('/api/membership-package', { silent: true });
        return response;
    },

    // GET /api/trial-package
    getTrialPackages: async () => {
        const response = await apiClient.get('/api/trial-package', { silent: true });
        return response;
    },

    // GET /api/promo-package
    getPromoPackages: async () => {
        const response = await apiClient.get('/api/promo-package', { silent: true });
        return response;
    }
}; 