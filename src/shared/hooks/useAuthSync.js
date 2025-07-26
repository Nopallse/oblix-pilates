import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuthSync = () => {
  const { isAuthenticated, syncPurchaseStatus, syncUserData } = useAuthStore();

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

  return {
    syncPurchaseStatus,
    syncUserData
  };
}; 