import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../../../shared/store/authStore';
import { authAPI } from './authAPI';
import { extractErrorMessage } from '../../../../shared/services/apiErrorHandler';

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  // Get state and actions from Zustand store
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: storeLogin,
    logout: storeLogout,
    setLoading,
    updateUser,
    hasRole,
    hasAnyRole,
    isAdmin,
    isUser,
    isBorrower,
    checkAuth,
    clearAuth
  } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = authAPI.getCurrentUser();
        const currentToken = authAPI.getToken();
        const isAuth = authAPI.isAuthenticated();

        if (currentUser && currentToken && isAuth) {
          // Update store with current user data
          storeLogin(currentUser, currentToken);
        }
      } catch (err) {
        setError('Failed to initialize authentication');
        console.error('Auth initialization error:', err);
      }
    };

    initializeAuth();
  }, [storeLogin]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authAPI.login(credentials);

      if (result.success) {
        // Update Zustand store
        storeLogin(result.user, result.accessToken);
        setError(null);
        
        // Show success toast
        toast.success('Login successful!');
        
        return { success: true };
      } else {
        const errorMessage = extractErrorMessage(result.error);
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'An unexpected error occurred');
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authAPI.register(userData);

      if (result.success) {
        // Update Zustand store
        storeLogin(result.user, result.accessToken);
        setError(null);
        
        // Show success toast
        toast.success('Registration successful!');
        
        return { success: true };
      } else {
        const errorMessage = extractErrorMessage(result.error);
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'An unexpected error occurred');
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Call API logout
      authAPI.logout();
      
      // Clear Zustand store
      storeLogout();
      setError(null);
      
      // Show success toast
      toast.success('Logged out successfully');
      
      // Navigate to login page
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Even if API fails, clear local state
      storeLogout();
      navigate('/login');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authAPI.resetPassword(email);

      if (result.success) {
        setError(null);
        toast.success('Password reset email sent!');
        return { success: true };
      } else {
        const errorMessage = extractErrorMessage(result.error);
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'An unexpected error occurred');
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    // State from Zustand store
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    resetPassword,
    clearError,

    // Store actions
    updateUser,
    setLoading,

    // Utilities from store
    hasRole,
    hasAnyRole,
    isAdmin,
    isUser,
    isBorrower,
    checkAuth,
    clearAuth
  };
}; 