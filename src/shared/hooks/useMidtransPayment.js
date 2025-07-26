import { useState } from 'react';
import { createOrder, initializeMidtransSnap, isMidtransSnapLoaded } from '../services/midtransService';

export const useMidtransPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Wait for Midtrans Snap to be loaded
  const waitForMidtransSnap = (maxAttempts = 10) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const checkSnap = () => {
        attempts++;
        console.log(`Checking Midtrans Snap (attempt ${attempts})...`);
        
        if (isMidtransSnapLoaded()) {
          console.log('Midtrans Snap loaded successfully');
          resolve(true);
        } else if (attempts >= maxAttempts) {
          console.error('Midtrans Snap failed to load after', maxAttempts, 'attempts');
          reject(new Error('Midtrans payment system not ready. Please refresh the page and try again.'));
        } else {
          setTimeout(checkSnap, 500); // Check every 500ms
        }
      };
      
      checkSnap();
    });
  };

  const processPayment = async (packageId, onSuccess, onError) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Starting payment process for package:', packageId);
      
      // Wait for Midtrans Snap to be loaded
      await waitForMidtransSnap();

      // Create order
      console.log('Creating order...');
      const orderResponse = await createOrder(packageId);
      console.log('Order created:', orderResponse);
      console.log('Order response structure:', {
        success: orderResponse.success,
        data: orderResponse.data,
        status: orderResponse.status,
        hasOrderId: orderResponse.data?.order_id,
        hasToken: orderResponse.data?.token,
        tokenLength: orderResponse.data?.token?.length,
        paymentUrl: orderResponse.data?.payment_url
      });

      if (!orderResponse.success) {
        throw new Error('Failed to create order. Please try again.');
      }

      if (!orderResponse.data || !orderResponse.data.order_id) {
        console.error('Missing order_id in response:', orderResponse);
        throw new Error('Invalid order response from server.');
      }

      // Check if snap token exists
      if (!orderResponse.data.token) {
        console.error('No token in response:', orderResponse.data);
        console.error('Available keys in data:', Object.keys(orderResponse.data || {}));
        throw new Error('Payment token not received. Please try again.');
      }

      console.log('Token received:', orderResponse.data.token);

      // Initialize Midtrans Snap
      console.log('Initializing Midtrans Snap...');
      try {
        const paymentResult = await initializeMidtransSnap(orderResponse.data.token);
        
        console.log('Payment result:', paymentResult);
        
        if (paymentResult.success) {
          // Payment successful
          console.log('Payment successful');
          onSuccess && onSuccess(paymentResult.result);
        } else if (paymentResult.pending) {
          // Payment pending
          console.log('Payment pending');
          onSuccess && onSuccess({ ...paymentResult.result, status: 'pending' });
        } else {
          throw new Error('Payment failed');
        }
      } catch (snapError) {
        console.error('Midtrans Snap failed, trying payment URL fallback:', snapError);
        
        // Fallback to payment URL
        if (orderResponse.data.payment_url) {
          console.log('Redirecting to payment URL:', orderResponse.data.payment_url);
          window.open(orderResponse.data.payment_url, '_blank');
          onSuccess && onSuccess({ status: 'redirected', payment_url: orderResponse.data.payment_url });
        } else {
          throw snapError;
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      
      let errorMessage = 'Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.closed) {
        errorMessage = 'Pembayaran dibatalkan.';
      } else if (err.error) {
        errorMessage = 'Pembayaran gagal. Silakan coba lagi.';
      }
      
      setError(errorMessage);
      onError && onError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
    clearError: () => setError(null)
  };
}; 