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
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get hasPurchasedPackage from user object directly for consistency
  const hasPurchasedPackage = () => {
    const result = authStore?.isAuthenticated && user?.has_purchased_package === true;
    console.log('UserLayout hasPurchasedPackage check:', {
      isAuthenticated: authStore?.isAuthenticated,
      userHasPurchasedPackage: user?.has_purchased_package,
      result: result
    });
    return result;
  };
  
  const userHasPackage = hasPurchasedPackage();

  // Sync data dengan backend
  useAuthSync();

  // Debug logging with useEffect to ensure we get the latest state
  useEffect(() => {
    console.log('UserLayout Debug (useEffect):', {
      user,
      hasPurchasedPackage: user?.has_purchased_package,
      userHasPackage,
      currentPath: location.pathname,
      purchaseStatusLoading: authStore?.purchaseStatusLoading,
      isAuthenticated: authStore?.isAuthenticated
    });
  }, [user?.id, userHasPackage, location.pathname, authStore?.purchaseStatusLoading, authStore?.isAuthenticated]); // Use user.id instead of user object

  console.log('UserLayout Debug:', {
    user,
    hasPurchasedPackage: user?.has_purchased_package,
    userHasPackage,
    currentPath: location.pathname,
    purchaseStatusLoading: authStore?.purchaseStatusLoading,
    isAuthenticated: authStore?.isAuthenticated
  });

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch purchase status on mount
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (user && authStore?.isAuthenticated) {
        // Always sync for buy-package routes to ensure latest status
        if (location.pathname === '/buy-package' || location.pathname.startsWith('/buy-package/')) {
          console.log('🔄 UserLayout - Fetching purchase status for buy-package route...')
          try {
            await authStore?.syncPurchaseStatus();
          } catch (error) {
            console.error('❌ UserLayout - Failed to sync purchase status:', error);
          }
        } else if (user?.has_purchased_package === null && !authStore?.purchaseStatusLoading) {
          // For other routes, only sync if status is null
          console.log('🔄 UserLayout - Fetching purchase status for user:', user.email);
          try {
            await authStore?.syncPurchaseStatus();
          } catch (error) {
            console.error('❌ UserLayout - Failed to sync purchase status:', error);
          }
        }
      }
    };

    checkPurchaseStatus();
  }, [user?.id, authStore?.isAuthenticated, authStore?.purchaseStatusLoading, location.pathname]); // Use user.id instead of user object

  // Redirect to buy-package if user hasn't purchased package and not already on buy-package page
  useEffect(() => {
    // Don't redirect if user is on buy-package routes
    if (location.pathname === '/buy-package' || location.pathname.startsWith('/buy-package/')) {
      return;
    }
    
    // Redirect if user hasn't purchased package and is on protected routes
    if (!userHasPackage) {
      console.log('UserLayout - Redirecting to buy-package:', {
        userHasPackage,
        currentPath: location.pathname
      });
      // Add a small delay to ensure state is properly set
      setTimeout(() => {
        navigate('/buy-package');
      }, 100);
    }
  }, [userHasPackage, navigate, location.pathname]); // Remove user dependency to avoid infinite loop

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
  if (!userHasPackage && !(location.pathname === '/buy-package' || location.pathname.startsWith('/buy-package/')) && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Mengarahkan ke halaman package...</p>
        </div>
      </div>
    );
  }

  // Allow all users to access buy-package page with UserLayout
  // The BuyPackage component will handle its own styling based on userHasPackage

  // Layout untuk user yang sudah membeli package (layout asli)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header di atas semua */}
      <Header 
        user={user}
        onToggleSidebar={toggleSidebar}
        onToggleSidebarCollapse={toggleSidebarCollapse}
        sidebarCollapsed={sidebarCollapsed}
        showSidebarControls={true}
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
