import { apiClient } from './apiClient';
import { useAuthStore } from '@shared/store';
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
          
          // Handle success - redirect to finish_redirect_url if available
          if (result.finish_redirect_url) {
            console.log('Redirecting to finish_redirect_url:', result.finish_redirect_url);
            
            // Update has_purchased_package before redirect
            updateUserPackageStatus();
            
            // Redirect to finish_redirect_url
            window.location.href = result.finish_redirect_url;
          }
          
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

// Helper function to update user package status
const updateUserPackageStatus = () => {
  try {
    // Update Zustand store
    const store = useAuthStore.getState();
    if (store.user) {
      store.updatePurchaseStatus(true);
      console.log('Updated has_purchased_package in Zustand store');
    }
  } catch (error) {
    console.error('Error updating user package status:', error);
  }
};

// Handle payment finish redirect
export const handlePaymentFinish = async (redirectUrl) => {
  try {
    console.log('Handling payment finish redirect:', redirectUrl);
    
    // Extract parameters from URL
    let orderId, statusCode, transactionStatus;
    
    if (redirectUrl.includes('?')) {
      // Handle URL with query parameters
      const urlParams = new URLSearchParams(redirectUrl.split('?')[1]);
      orderId = urlParams.get('order_id');
      statusCode = urlParams.get('status_code');
      transactionStatus = urlParams.get('transaction_status');
    } else {
      // Handle URL without query parameters (might be encoded)
      const decodedUrl = decodeURIComponent(redirectUrl);
      if (decodedUrl.includes('?')) {
        const urlParams = new URLSearchParams(decodedUrl.split('?')[1]);
        orderId = urlParams.get('order_id');
        statusCode = urlParams.get('status_code');
        transactionStatus = urlParams.get('transaction_status');
      }
    }
    
    console.log('Payment finish params:', { orderId, statusCode, transactionStatus });
    
    // Check if payment was successful
    if (statusCode === '200' && transactionStatus === 'settlement') {
      // Update Zustand store only (no localStorage)
      const store = useAuthStore.getState();
      if (store.user) {
        store.updatePurchaseStatus(true);
        console.log('Updated has_purchased_package in Zustand store');
      }
      
      return { success: true, orderId, statusCode, transactionStatus };
    } else {
      console.log('Payment not successful:', { statusCode, transactionStatus });
      return { success: false, orderId, statusCode, transactionStatus };
    }
  } catch (error) {
    console.error('Error handling payment finish:', error);
    throw error;
  }
};

// Check if current URL is a payment finish redirect
export const isPaymentFinishRedirect = () => {
  if (typeof window === 'undefined') return false;
  
  const currentUrl = window.location.href;
  return currentUrl.includes('finish_redirect_url') || 
         currentUrl.includes('payment/finish') ||
         currentUrl.includes('transaction_status=settlement');
}; 