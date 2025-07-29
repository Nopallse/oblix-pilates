import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuthSync = () => {
  const { isAuthenticated, syncPurchaseStatus, syncUserData, refreshToken, checkAuth } = useAuthStore();

  useEffect(() => {
    console.log('🔄 useAuthSync hook triggered, isAuthenticated:', isAuthenticated);
    
    // Sync data setiap kali user authenticated
    if (isAuthenticated) {
      console.log('✅ User authenticated, starting sync...');
      
      // Sync purchase status
      syncPurchaseStatus();
      
      // Sync user data (jika endpoint /api/me tersedia)
      // syncUserData();
    } else {
      console.log('❌ User not authenticated, skipping sync');
    }
  }, [isAuthenticated, syncPurchaseStatus, syncUserData]);

  // Function untuk handle auth check dengan refresh token
  const handleAuthCheck = async () => {
    try {
      console.log('🔍 Checking authentication status...');
      
      // Check if we have tokens but auth check fails
      const isAuth = checkAuth();
      
      if (!isAuth) {
        console.log('⚠️ Auth check failed, attempting token refresh...');
        const refreshSuccess = await refreshToken();
        
        if (refreshSuccess) {
          console.log('✅ Token refreshed successfully');
          // Retry sync after successful refresh
          syncPurchaseStatus();
        } else {
          console.log('❌ Token refresh failed, user needs to login again');
        }
      }
    } catch (error) {
      console.error('❌ Error during auth check:', error);
    }
  };

  return {
    syncPurchaseStatus,
    syncUserData,
    handleAuthCheck
  };
}; 