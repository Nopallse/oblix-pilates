import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@shared/store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const UserLayout = ({ children }) => {
  const { user, hasPurchasedPackage } = useAuthStore();
  const userHasPackage = hasPurchasedPackage();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('UserLayout Debug:', {
    user,
    hasPurchasedPackage: user?.has_purchased_package,
    userHasPackage,
    currentPath: location.pathname
  });

  // Redirect to buy-package if user hasn't purchased package and not already on buy-package page
  useEffect(() => {
    if (!userHasPackage && location.pathname !== '/buy-package') {
      navigate('/buy-package');
    }
  }, [userHasPackage, navigate, location.pathname]);

  // Show loading while checking package status (only if not on buy-package page)
  if (!userHasPackage && location.pathname !== '/buy-package') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Mengarahkan ke halaman package...</p>
        </div>
      </div>
    );
  }

  // If user doesn't have package and is on buy-package page, don't render UserLayout
  if (!userHasPackage && location.pathname === '/buy-package') {
    return null; // Let BuyPackage component handle its own layout
  }

  // Layout untuk user yang sudah membeli package (layout asli)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16 ml-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
