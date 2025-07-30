import { useState, useCallback } from 'react';
import { myClassesAPI } from './myClassesAPI';

export const useMyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentType, setCurrentType] = useState('upcoming');

  // Load classes
  const loadClasses = useCallback(async (type = currentType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await myClassesAPI.getMyClasses(type);
      console.log('📡 MyClasses API Response:', response);
      
      // Mapping data
      const classesArr = response.data?.classes || [];
      setClasses(classesArr);
      
      console.log('📋 Classes loaded:', classesArr);
    } catch (err) {
      console.error('❌ Failed to load classes:', err);
      setError('Gagal memuat data kelas');
    } finally {
      setLoading(false);
    }
  }, [currentType]);

  // Cancel booking
  const cancelBooking = useCallback(async (bookingId, reason = 'User cancelled') => {
    setLoading(true);
    try {
      const response = await myClassesAPI.cancelBooking(bookingId, reason);
      if (response.success) {
        // Reload classes after successful cancellation
        await loadClasses(currentType);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error('❌ Failed to cancel booking:', error);
      return { success: false, message: error.message || 'Gagal membatalkan booking' };
    } finally {
      setLoading(false);
    }
  }, [currentType, loadClasses]);

  // Ganti tipe
  const changeType = (type) => {
    setCurrentType(type);
    loadClasses(type);
  };

  return {
    classes,
    loading,
    error,
    currentType,
    loadClasses,
    cancelBooking,
    changeType,
  };
}; 