import { apiClient } from './apiClient';

const MIDTRANS_CLIENT_KEY = 'SB-Mid-server-J5fY9PYLPHKtqFgAieIycNpg';

// Create order
export const createOrder = async (packageId) => {
  try {
    const response = await apiClient.post('/api/order/create', {
      package_id: packageId
    });
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get Midtrans snap token
export const getSnapToken = async (orderId) => {
  try {
    const response = await apiClient.get(`/api/order/${orderId}/snap-token`);
    return response;
  } catch (error) {
    console.error('Error getting snap token:', error);
    throw error;
  }
};

// Get Midtrans client key
export const getClientKey = () => {
  return MIDTRANS_CLIENT_KEY;
};

// Check if Midtrans Snap is loaded
export const isMidtransSnapLoaded = () => {
  return typeof window !== 'undefined' && window.snap && typeof window.snap.pay === 'function';
};

// Initialize Midtrans Snap
export const initializeMidtransSnap = (token) => {
  return new Promise((resolve, reject) => {
    console.log('Initializing Midtrans Snap with token:', token);
    
    // Check if Midtrans Snap is loaded
    if (!isMidtransSnapLoaded()) {
      console.error('Midtrans Snap not loaded');
      reject(new Error('Midtrans Snap not loaded. Please refresh the page and try again.'));
      return;
    }

    // Check if token is valid
    if (!token) {
      console.error('Invalid token:', token);
      reject(new Error('Invalid token received from server.'));
      return;
    }

    try {
      window.snap.pay(token, {
        onSuccess: function(result) {
          console.log('Payment success:', result);
          resolve({ success: true, result });
        },
        onPending: function(result) {
          console.log('Payment pending:', result);
          resolve({ success: false, pending: true, result });
        },
        onError: function(result) {
          console.log('Payment error:', result);
          reject({ success: false, error: true, result });
        },
        onClose: function() {
          console.log('Customer closed the popup without finishing payment');
          reject({ success: false, closed: true });
        }
      });
    } catch (error) {
      console.error('Error initializing Midtrans Snap:', error);
      reject(new Error('Failed to initialize payment popup. Please try again.'));
    }
  });
}; 