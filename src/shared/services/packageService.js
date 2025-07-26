import { apiClient } from './apiClient';

// Get membership packages
export const getMembershipPackages = async () => {
  try {
    const response = await apiClient.get('/api/membership-package');
    return response;
  } catch (error) {
    console.error('Error fetching membership packages:', error);
    throw error;
  }
};

// Get trial packages
export const getTrialPackages = async () => {
  try {
    const response = await apiClient.get('/api/trial-package');
    return response;
  } catch (error) {
    console.error('Error fetching trial packages:', error);
    throw error;
  }
};

// Get promo packages
export const getPromoPackages = async () => {
  try {
    const response = await apiClient.get('/api/promo-package');
    return response;
  } catch (error) {
    console.error('Error fetching promo packages:', error);
    throw error;
  }
}; 