import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePackageData } from '@shared/hooks/usePackageData';
import Button from '../../../components/ui/Button/Button';
import Header from '../../../components/layout/UserLayout/Header';
import Footer from '../../../components/layout/UserLayout/Footer';

const BuyPackage = () => {
  const [activeTab, setActiveTab] = useState('');
  
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
  } = usePackageData();

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

  // Get available categories for tabs
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pilih Package</h1>
            <p className="text-gray-600">Pilih package yang sesuai dengan kebutuhan Anda</p>
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
              <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Coba Lagi
              </button>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
                        {packages.map((pkg, index) => (
                          <div key={pkg.id || index} className="w-full md:w-64 h-96 relative">
                            <div className="w-full h-96 left-0 top-0 absolute bg-neutral-700 rounded-[2rem] md:rounded-3xl" />
                            <div className="absolute inset-0 p-4 flex flex-col mt-10">
                              <div className="text-center">
                                <h3 className="text-xl md:text-base font-semibold text-white mb-8 font-raleway">{pkg.paket}</h3>
                                <div className="text-7xl md:text-5xl font-bold text-white mb-8 font-raleway">
                                  {pkg.harga}
                                </div>
                                <ul className="space-y-2 text-lg md:text-sm text-white font-raleway mb-6">
                                  {pkg.benefit.map((benefit, benefitIndex) => (
                                    <li key={benefitIndex} className="text-center">
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                                {/* Buy Now Button */}
                                <Link to={`/buy-package/${pkg.id}`}>
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
                // Regular grid for other package types
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                  {activePackages.map((pkg, index) => (
                    <div key={pkg.id || index} className="w-full md:w-64 h-96 relative">
                      <div className="w-full md:w-64 h-96 left-0 top-0 absolute bg-neutral-700 rounded-[2rem] md:rounded-3xl" />
                      <div className="absolute inset-0 p-4 flex flex-col mt-10">
                        <div className="text-center">
                          <h3 className="text-xl md:text-base font-semibold text-white mb-8 font-raleway">{pkg.paket}</h3>
                          <div className="text-7xl md:text-5xl font-bold text-white mb-8 font-raleway">
                            {pkg.harga}
                          </div>
                          <ul className="space-y-2 text-lg md:text-sm text-white font-raleway mb-6">
                            {pkg.benefit.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="text-center">
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          {/* Buy Now Button */}
                          <Link to={`/buy-package/${pkg.id}`}>
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
              <p className="text-gray-600">Belum ada package tersedia untuk kategori ini.</p>
            </div>
          )}

          {/* Contact Section */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Butuh bantuan? Hubungi kami untuk informasi lebih lanjut
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="primary"
                size="medium"
                onClick={() => window.open(`https://wa.me/6285883335533?text=${encodeURIComponent(
                  "Halo Oblix Pilates! Saya ingin konsultasi tentang package yang tersedia. Boleh dibantu?"
                )}`, '_blank')}
              >
                Hubungi via WhatsApp
              </Button>
              <Button
                variant="outline"
                size="medium"
                to="/dashboard"
              >
                Kembali ke Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyPackage; 