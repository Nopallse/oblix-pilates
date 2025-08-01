import React, { useEffect } from 'react';
import { useAuthStore } from '@shared/store/authStore';
import { useLocation } from 'react-router-dom';
import Header from '../UserLayout/Header';
import Footer from '../UserLayout/Footer';
import UserLayout from '../UserLayout/UserLayout';
import AdminLayout from '../AdminLayout/AdminLayout';

const FlexibleLayout = ({ children }) => {
  const authStore = useAuthStore();
  const location = useLocation();
  const user = authStore?.user || null;
  
  // Get hasPurchasedPackage from user object directly for consistency
  const hasPurchasedPackage = () => {
    const result = authStore?.isAuthenticated && user?.has_purchased_package === true;
    console.log('FlexibleLayout hasPurchasedPackage check:', {
      isAuthenticated: authStore?.isAuthenticated,
      userHasPurchasedPackage: user?.has_purchased_package,
      result: result
    });
    return result;
  };
  
  // Sync purchase status on mount if user is authenticated
  useEffect(() => {
    const syncPurchaseStatus = async () => {
      if (authStore?.isAuthenticated && user) {
        // Always sync for buy-package routes to ensure latest status
        if (location.pathname === '/buy-package' || location.pathname.startsWith('/buy-package/')) {
          console.log('🔄 FlexibleLayout - Syncing purchase status for buy-package route...')
          try {
            await authStore.syncPurchaseStatus();
          } catch (error) {
            console.error('❌ FlexibleLayout - Failed to sync purchase status:', error)
          }
        } else if (user?.has_purchased_package === null) {
          // For other routes, only sync if status is null
          console.log('🔄 FlexibleLayout - Syncing purchase status...')
          try {
            await authStore.syncPurchaseStatus();
          } catch (error) {
            console.error('❌ FlexibleLayout - Failed to sync purchase status:', error)
          }
        }
      }
    };

    syncPurchaseStatus();
  }, [authStore?.isAuthenticated, user?.id, location.pathname]); // Use user.id instead of user object
  
  // Debug logging with useEffect to ensure we get the latest state
  useEffect(() => {
    console.log('FlexibleLayout Debug (useEffect):', {
      currentPath: location.pathname,
      hasPurchasedPackage: hasPurchasedPackage(),
      user: authStore?.user,
      userRole: user?.role || user?.type,
      userHasPurchasedPackage: user?.has_purchased_package,
      isAuthenticated: authStore?.isAuthenticated
    });
  }, [location.pathname, user?.id, authStore?.isAuthenticated]); // Use user.id instead of user object

  console.log('FlexibleLayout Debug:', {
    currentPath: location.pathname,
    hasPurchasedPackage: hasPurchasedPackage(),
    user: authStore?.user,
    userRole: user?.role || user?.type,
    userHasPurchasedPackage: user?.has_purchased_package
  });
  
  // Check if user is admin
  const isAdmin = () => {
    if (!user) return false;
    const userRole = user?.role || user?.type;
    return userRole === 'admin' || userRole === 'ADMIN';
  };
  
  // For admin users, use AdminLayout
  if (isAdmin()) {
    console.log('FlexibleLayout: Using AdminLayout for admin user');
    return <AdminLayout>{children}</AdminLayout>;
  }
  
  // Determine if this route should use UserLayout (with sidebar)
  const shouldUseUserLayout = () => {
    const userLayoutRoutes = [
      '/check-class',
      '/profile', 
      '/my-classes',
      '/my-package',
      '/my-orders',
      '/user',
      '/members'
    ];
    
    // For buy-package routes, check if user has purchased package
    if (location.pathname === '/buy-package' || location.pathname.startsWith('/buy-package/')) {
      return hasPurchasedPackage();
    }
    
    // For my-orders routes, always use UserLayout
    if (location.pathname.startsWith('/my-orders/')) {
      return true;
    }
    
    return userLayoutRoutes.includes(location.pathname);
  };

  // If route should use UserLayout, wrap with UserLayout
  if (shouldUseUserLayout()) {
    console.log('FlexibleLayout: Using UserLayout (with sidebar)');
    return <UserLayout>{children}</UserLayout>;
  }

  // Otherwise, use standalone layout (header + footer only)
  console.log('FlexibleLayout: Using standalone layout (no sidebar)');
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSidebarControls={false} />
      <main className="pt-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlexibleLayout; 