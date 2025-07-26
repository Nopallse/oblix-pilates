import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@shared/store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthSync } from '@shared/hooks/useAuthSync';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const UserLayout = ({ children }) => {
  const authStore = useAuthStore();
  const user = authStore?.user || null;
  const hasPurchasedPackage = authStore?.hasPurchasedPackage || (() => false);
  const userHasPackage = hasPurchasedPackage();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync data dengan backend
  useAuthSync();

  console.log('UserLayout Debug:', {
    user,
    hasPurchasedPackage: user?.has_purchased_package,
    userHasPackage,
    currentPath: location.pathname
  });

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch purchase status on mount
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      // Only fetch if user is authenticated and purchase status is null (not fetched yet)
      if (user && authStore?.isAuthenticated && hasPurchasedPackage === null && !authStore?.purchaseStatusLoading) {
        console.log('Fetching purchase status for user:', user.email);
        await authStore?.fetchPurchaseStatus();
      }
    };

    checkPurchaseStatus();
  }, [user, authStore?.isAuthenticated, hasPurchasedPackage, authStore?.purchaseStatusLoading]);

  // Redirect to buy-package if user hasn't purchased package and not already on buy-package page
  useEffect(() => {
    if (!userHasPackage && location.pathname !== '/buy-package') {
      navigate('/buy-package');
    }
  }, [userHasPackage, navigate, location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // Show loading while fetching purchase status
  if (authStore?.purchaseStatusLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memeriksa status package...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header di atas semua */}
      <Header 
        user={user}
        onToggleSidebar={toggleSidebar}
        onToggleSidebarCollapse={toggleSidebarCollapse}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      {/* Content area dengan sidebar dan main content */}
      <div className="flex flex-1 relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Fixed Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full z-50 transition-all duration-300
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:top-16 lg:h-[calc(100vh-4rem)]
        `}>
          <Sidebar 
            user={user}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
          />
        </div>
        
        {/* Main Content Area */}
        <div className={`
          flex-1 flex flex-col transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}>
          <main className="flex-1 bg-white">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
