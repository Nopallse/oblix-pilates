import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAvailablePackages } from '../MyPackage/api';
import { useAuthStore } from '@shared/store/authStore';
import { Button } from '@components/ui';
import Loading from '@components/ui/Loading/Loading';

const BuyPackage = () => {
  const [activeTab, setActiveTab] = useState('');
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
  
  // Use package data from API
  const { 
    membershipPackages, 
    trialPackages, 
    promoPackages, 
    loading, 
    error,
    getGroupedMembershipPackages,
    getGroupedTrialPackages,
    getGroupedPromoPackages
  } = useAvailablePackages();

  console.log('BuyPackage Debug:', {
    membershipPackages,
    trialPackages,
    promoPackages
  });

  // Get packages based on active tab
  const getActiveTabPackages = () => {
    switch (activeTab) {
      case 'Membership Package':
        return membershipPackages;
      case 'Trial Package':
        return trialPackages;
      case 'Promo Package':
        return promoPackages;
      default:
        return membershipPackages;
    }
  };

  // Get available categories for tabs (excluding trial for new version)
  const getAvailableCategories = () => {
    const categories = [];
    if (membershipPackages.length > 0) categories.push('Membership Package');
    if (trialPackages.length > 0) categories.push('Trial Package');
    if (promoPackages.length > 0) categories.push('Promo Package');
    return categories;
  };

  const availableCategories = getAvailableCategories();
  const activePackages = getActiveTabPackages();

  // Set default active tab when data is loaded
  useEffect(() => {
    if (!loading && availableCategories.length > 0 && !activeTab) {
      setActiveTab(availableCategories[0]);
    }
  }, [loading, availableCategories, activeTab]);

  // Sync purchase status on mount
  useEffect(() => {
    const syncPurchaseStatus = async () => {
      if (authStore?.isAuthenticated && authStore?.user) {
        console.log('🔄 BuyPackage - Syncing purchase status...')
        try {
          await authStore.syncPurchaseStatus();
        } catch (error) {
          console.error('❌ BuyPackage - Failed to sync purchase status:', error)
        }
      }
    };

    syncPurchaseStatus();
  }, [authStore?.isAuthenticated, authStore?.user?.id]); // Use user.id instead of user object

  // Main content component
  const MainContent = () => (
    <div>
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Pilih Package</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        )}

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Pilih Package
          </h1>
          <p className="mt-2 text-gray-600">
            Pilih package yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === category
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data package...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
              <Button 
                variant="secondary" 
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Package Cards Grid */}
        {!loading && !error && activePackages.length > 0 && (
          <div className="mb-8">
            {activeTab === 'Membership Package' ? (
              // Group by category for membership packages
              (() => {
                const groupedByCategory = activePackages.reduce((acc, pkg) => {
                  const category = pkg.kategori || 'Other';
                  if (!acc[category]) {
                    acc[category] = [];
                  }
                  acc[category].push(pkg);
                  return acc;
                }, {});

                return Object.entries(groupedByCategory).map(([category, packages], categoryIndex) => (
                  <div key={category} className="mb-12">
                    {/* Category Divider */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <div className="px-6">
                        <h3 className="text-xl font-semibold text-gray-700">{category}</h3>
                      </div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Package Cards for this category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {packages.map((pkg, index) => (
                        <div
                          key={pkg.id || index}
                          className="relative flex flex-col bg-neutral-700 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden w-full max-w-xs mx-auto min-h-[370px] transition-transform duration-200 hover:scale-105"
                        >
                          <div className="flex-1 flex flex-col justify-between p-6">
                            <div>
                              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 font-raleway text-center">
                                {pkg.paket}
                              </h3>
                              <div className="text-4xl md:text-5xl font-bold text-white mb-4 font-raleway text-center">
                                {pkg.harga}
                              </div>
                              <ul className="space-y-2 text-base md:text-sm text-white font-raleway mb-6">
                                {pkg.benefit.map((benefit, benefitIndex) => (
                                  <li key={benefitIndex} className="text-center">
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-center mt-4">
                              <Link to={`/buy-package/${pkg.id}`} className="w-full">
                                <Button
                                  variant="primary"
                                  size="medium"
                                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                >
                                  Buy Now
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()
            ) : (
              // Different card style for Trial and Promo packages
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activePackages.map((pkg, index) => (
                  <div
                    key={pkg.id || index}
                    className="relative flex flex-col bg-neutral-700 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden w-full max-w-xs mx-auto min-h-[370px] transition-transform duration-200 hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex-1 flex flex-col justify-between p-6">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-4 font-raleway text-center">
                          {pkg.paket}
                        </h3>
                        <div className="text-4xl md:text-5xl font-bold text-white mb-4 font-raleway text-center">
                          {pkg.harga}
                        </div>
                        <ul className="space-y-2 text-base md:text-sm text-white font-raleway mb-6">
                          {pkg.benefit.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-center">
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-center mt-4">
                        <Link to={`/buy-package/${pkg.id}`} className="w-full">
                          <Button
                            variant="primary"
                            size="medium"
                            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm text-center"
                          >
                            {activeTab === 'Trial Package' ? 'Book Trial' : 'Buy Now'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && activePackages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Belum ada package tersedia untuk kategori ini.</p>
            <Link to={useUserLayout ? "/my-package" : "/dashboard"}>
              <Button variant="secondary">
                {useUserLayout ? "Kembali ke My Package" : "Kembali ke Dashboard"}
              </Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );

  // Render content - layout handled by FlexibleLayout
  return <MainContent />;
};

export default BuyPackage; 