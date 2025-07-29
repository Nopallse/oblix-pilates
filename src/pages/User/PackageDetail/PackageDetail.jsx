import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';
import { myPackageAPI } from '../MyPackage/api';
import { useMidtransPayment } from '@shared/hooks/useMidtransPayment';
import { isMidtransSnapLoaded } from '@shared/services/midtransService';
import { useAuthStore } from '@shared/store/authStore';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const authStore = useAuthStore();
  const hasPurchasedPackage = authStore?.hasPurchasedPackage || (() => false);
  
  // Check if this route uses UserLayout (with sidebar) or standalone layout
  const shouldUseUserLayout = () => {
    const userLayoutRoutes = [
      '/check-class',
      '/profile', 
      '/my-classes',
      '/my-package',
      '/user',
      '/members'
    ];
    
    // For buy-package routes, check if user has purchased package
    if (location.pathname === '/buy-package' || location.pathname.startsWith('/buy-package/')) {
      return hasPurchasedPackage();
    }
    
    return userLayoutRoutes.includes(location.pathname);
  };
  
  const useUserLayout = shouldUseUserLayout();
  
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [midtransStatus, setMidtransStatus] = useState('checking');
  
  // Midtrans payment hook
  const { processPayment, loading: paymentLoading, error: paymentError, checkPaymentFinishRedirect } = useMidtransPayment();

  // Check for payment finish redirect on component mount
  useEffect(() => {
    const handlePaymentFinish = async () => {
      const result = await checkPaymentFinishRedirect();
      if (result) {
        if (result.success) {
          alert('Pembayaran berhasil! Package Anda telah dibeli.');
          navigate('/check-class');
        } else {
          alert('Pembayaran tidak berhasil diselesaikan.');
        }
      }
    };

    handlePaymentFinish();
  }, [checkPaymentFinishRedirect, navigate]);

  // Sync purchase status on mount
  useEffect(() => {
    const syncPurchaseStatus = async () => {
      if (authStore?.isAuthenticated && authStore?.user) {
        console.log('🔄 PackageDetail - Syncing purchase status...')
        try {
          await authStore.syncPurchaseStatus();
        } catch (error) {
          console.error('❌ PackageDetail - Failed to sync purchase status:', error)
        }
      }
    };

    syncPurchaseStatus();
  }, [authStore?.isAuthenticated, authStore?.user?.id]); // Use user.id instead of user object

  // Format price to Indonesian currency
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return `Rp${numPrice.toLocaleString('id-ID')}`;
  };

  // Calculate taxes (assuming 0% for now)
  const calculateTaxes = (price) => {
    return 0;
  };

  // Calculate total
  const calculateTotal = (price) => {
    const taxes = calculateTaxes(price);
    return parseFloat(price) + taxes;
  };

  // Handle payment success
  const handlePaymentSuccess = (result) => {
    if (result.status === 'pending') {
      alert('Pembayaran pending. Silakan cek status pembayaran Anda.');
    } else if (result.status === 'redirected') {
      alert('Halaman pembayaran telah dibuka di tab baru. Silakan selesaikan pembayaran Anda.');
    } else if (result.shouldRedirect && result.redirectUrl) {
      // Payment successful with redirect URL
      console.log('Redirecting to finish URL:', result.redirectUrl);
      alert('Pembayaran berhasil! Mengarahkan ke halaman konfirmasi...');
      window.location.href = result.redirectUrl;
    } else {
      alert('Pembayaran berhasil!');
      navigate('/check-class');
    }
  };

  // Handle payment error
  const handlePaymentError = (err) => {
    if (err.closed) {
      alert('Pembayaran dibatalkan.');
    } else {
      alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    }
  };

  // Handle payment with Midtrans
  const handlePayment = async () => {
    if (!packageData) return;
    
    console.log('Package data for payment:', packageData);
    
    await processPayment(
      packageData.id,
      handlePaymentSuccess,
      handlePaymentError
    );
  };

  // Load package data
  useEffect(() => {
    const loadPackageData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Try to find package in all categories
        const [membershipResponse, trialResponse, promoResponse] = await Promise.allSettled([
          myPackageAPI.getMembershipPackages(),
          myPackageAPI.getTrialPackages(),
          myPackageAPI.getPromoPackages()
        ]);

        let foundPackage = null;

        // Check membership packages
        if (membershipResponse.status === 'fulfilled' && membershipResponse.value.success) {
          foundPackage = membershipResponse.value.data.packages.find(pkg => pkg.id === id);
        }

        // Check trial packages
        if (!foundPackage && trialResponse.status === 'fulfilled' && trialResponse.value.success) {
          foundPackage = trialResponse.value.data.packages.find(pkg => pkg.id === id);
        }

        // Check promo packages
        if (!foundPackage && promoResponse.status === 'fulfilled' && promoResponse.value.success) {
          foundPackage = promoResponse.value.data.packages.find(pkg => pkg.id === id);
        }

        if (foundPackage) {
          setPackageData(foundPackage);
        } else {
          setError('Package tidak ditemukan');
        }
      } catch (err) {
        setError('Gagal memuat data package');
        console.error('Error loading package:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPackageData();
    }
  }, [id]);

  // Check Midtrans status
  useEffect(() => {
    const checkMidtransStatus = () => {
      const isLoaded = isMidtransSnapLoaded();
      setMidtransStatus(isLoaded ? 'loaded' : 'not-loaded');
      console.log('Midtrans status:', isLoaded ? 'loaded' : 'not-loaded');
    };

    // Check immediately
    checkMidtransStatus();

    // Check again after a delay
    const timer = setTimeout(checkMidtransStatus, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat detail package...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button to={useUserLayout ? "/my-package" : "/buy-package"} variant="primary" size="medium">
          {useUserLayout ? "Kembali ke My Package" : "Kembali ke Pilih Package"}
        </Button>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-4">Package tidak ditemukan</p>
        <Button to={useUserLayout ? "/my-package" : "/buy-package"} variant="primary" size="medium">
          {useUserLayout ? "Kembali ke My Package" : "Kembali ke Pilih Package"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation - Only show if using UserLayout (with sidebar) */}
      {useUserLayout && (
        <div className="mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/my-package" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                  My Package
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <Link to="/buy-package" className="ml-1 text-sm font-medium text-gray-700 hover:text-primary md:ml-2">
                    Pilih Package
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Detail Package</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      )}

      {/* Back Button - Only show if using standalone layout (without sidebar) */}
      {!useUserLayout && (
        <div className="mb-6">
          <Link 
            to="/buy-package"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Pilih Package
          </Link>
        </div>
      )}

      {/* Payment Error Alert */}
      {paymentError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{paymentError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Detail Package Card */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Detail Package</h2>
          <div className="space-y-4">
            <div className="text-gray-600">
              {packageData.name}
            </div>
            <div className="text-gray-600">
              {packageData.session} {packageData.category?.name || 'Session'}
            </div>
            <div className="text-gray-600">
              Duration: {packageData.duration_value} {packageData.duration_unit}{packageData.duration_value > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Detail Pembayaran Card */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Detail Pembayaran</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Package Fee</span>
              <span className="text-gray-800 font-medium">{formatPrice(packageData.price)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes Fee</span>
              <span className="text-gray-800 font-medium">{formatPrice(calculateTaxes(packageData.price))}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-gray-800 font-bold">Total</span>
              <span className="text-gray-800 font-bold text-lg">{formatPrice(calculateTotal(packageData.price))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Now Button */}
      <div className="text-center">
        <button
          onClick={handlePayment}
          disabled={paymentLoading || midtransStatus !== 'loaded'}
          className={`bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-2xl transition-colors duration-200 text-lg w-full ${
            (paymentLoading || midtransStatus !== 'loaded') ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {paymentLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Memproses Pembayaran...
            </div>
          ) : midtransStatus !== 'loaded' ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Menyiapkan Pembayaran...
            </div>
          ) : (
            'Pay Now'
          )}
        </button>
        
        {midtransStatus !== 'loaded' && (
          <p className="text-sm text-gray-500 mt-2">
            Menunggu sistem pembayaran siap...
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageDetail; 