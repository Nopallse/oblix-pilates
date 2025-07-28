import { useState, useCallback } from 'react';
import { scheduleAPI } from './scheduleAPI';

export const useSchedule = () => {
  const [calendarData, setCalendarData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    filter_type: 'group',
    total_schedules: 0,
    schedules_by_date: {},
    schedules: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentScheduleType, setCurrentScheduleType] = useState('group');

  // Load calendar data
  const loadCalendarData = useCallback(async (month = null, year = null) => {
    setLoading(true);
    setError(null);
    try {
      const currentDate = new Date();
      const params = {
        month: month || currentDate.getMonth() + 1,
        year: year || currentDate.getFullYear()
      };
      
      const response = await scheduleAPI.getCalendarData(params);
      const data = response.data || {};
      
      setCalendarData({
        month: data.month || params.month,
        year: data.year || params.year,
        filter_type: data.filter_type || 'group',
        total_schedules: data.total_schedules || 0,
        schedules_by_date: data.schedules_by_date || {},
        schedules: data.schedules || []
      });
    } catch (err) {
      setError('Gagal memuat data kalender');
      console.error('Failed to load calendar data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get schedules for specific date
  const getSchedulesForDate = useCallback((date) => {
    const dateString = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    return calendarData.schedules_by_date[dateString] || [];
  }, [calendarData.schedules_by_date]);

  // Get schedule detail by type
  const getScheduleDetail = useCallback(async (id, type) => {
    console.log('getScheduleDetail called with id:', id, 'type:', type);
    try {
      let response;
      switch (type) {
        case 'group':
          console.log('Calling getGroupScheduleById with id:', id);
          response = await scheduleAPI.getGroupScheduleById(id);
          break;
        case 'semi_private':
          console.log('Calling getSemiPrivateScheduleById with id:', id);
          response = await scheduleAPI.getSemiPrivateScheduleById(id);
          break;
        case 'private':
          console.log('Calling getPrivateScheduleById with id:', id);
          response = await scheduleAPI.getPrivateScheduleById(id);
          break;
        default:
          throw new Error('Invalid schedule type');
      }
      console.log('API response:', response);
      return response.data;
    } catch (err) {
      console.error('Failed to get schedule detail:', err);
      throw err;
    }
  }, []);

  // Load trainers
  const loadTrainers = useCallback(async () => {
    try {
      const response = await scheduleAPI.getTrainers();
      const trainersData = response.data?.data || response.data?.trainers || [];
      setTrainers(trainersData);
    } catch (err) {
      console.error('Failed to load trainers:', err);
    }
  }, []);

  // Load classes
  const loadClasses = useCallback(async () => {
    try {
      const response = await scheduleAPI.getClasses();
      // Handle different response structures
      const classesData = response.data?.classes || response.data?.data?.classes || response.data || [];
      setClasses(classesData);
    } catch (err) {
      console.error('Failed to load classes:', err);
    }
  }, []);

  // Create group schedule
  const createGroupSchedule = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await scheduleAPI.createGroupSchedule(data);
      // Reload calendar data after creating
      await loadCalendarData(calendarData.month, calendarData.year);
      return response;
    } catch (err) {
      setError('Gagal membuat schedule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [calendarData.month, calendarData.year, loadCalendarData]);

  // Create semi-private schedule
  const createSemiPrivateSchedule = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await scheduleAPI.createSemiPrivateSchedule(data);
      // Reload calendar data after creating
      await loadCalendarData(calendarData.month, calendarData.year);
      return response;
    } catch (err) {
      setError('Gagal membuat schedule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [calendarData.month, calendarData.year, loadCalendarData]);

  // Create private schedule
  const createPrivateSchedule = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await scheduleAPI.createPrivateSchedule(data);
      // Reload calendar data after creating
      await loadCalendarData(calendarData.month, calendarData.year);
      return response;
    } catch (err) {
      setError('Gagal membuat schedule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [calendarData.month, calendarData.year, loadCalendarData]);

  // Update schedule by type
  const updateSchedule = useCallback(async (id, data, type) => {
    setLoading(true);
    try {
      let response;
      switch (type) {
        case 'group':
          response = await scheduleAPI.updateGroupSchedule(id, data);
          break;
        case 'semi-private':
          response = await scheduleAPI.updateSemiPrivateSchedule(id, data);
          break;
        case 'private':
          response = await scheduleAPI.updatePrivateSchedule(id, data);
          break;
        default:
          throw new Error('Invalid schedule type');
      }
      // Reload calendar data after updating
      await loadCalendarData(calendarData.month, calendarData.year);
      return response;
    } catch (err) {
      setError('Gagal mengupdate schedule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [calendarData.month, calendarData.year, loadCalendarData]);

  // Delete schedule by type
  const deleteSchedule = useCallback(async (id, type) => {
    setLoading(true);
    try {
      let response;
      switch (type) {
        case 'group':
          response = await scheduleAPI.deleteGroupSchedule(id);
          break;
        case 'semi-private':
          response = await scheduleAPI.deleteSemiPrivateSchedule(id);
          break;
        case 'private':
          response = await scheduleAPI.deletePrivateSchedule(id);
          break;
        default:
          throw new Error('Invalid schedule type');
      }
      // Reload calendar data after deleting
      await loadCalendarData(calendarData.month, calendarData.year);
      return response;
    } catch (err) {
      setError('Gagal menghapus schedule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [calendarData.month, calendarData.year, loadCalendarData]);

  // Navigate to different month
  const navigateMonth = useCallback(async (direction) => {
    let newMonth = calendarData.month + direction;
    let newYear = calendarData.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    await loadCalendarData(newMonth, newYear);
  }, [calendarData.month, calendarData.year, loadCalendarData]);

  // Go to today
  const goToToday = useCallback(async () => {
    const today = new Date();
    await loadCalendarData(today.getMonth() + 1, today.getFullYear());
  }, [loadCalendarData]);

  return {
    calendarData,
    loading,
    error,
    selectedSchedule,
    setSelectedSchedule,
    trainers,
    classes,
    currentScheduleType,
    setCurrentScheduleType,
    loadCalendarData,
    loadTrainers,
    loadClasses,
    getSchedulesForDate,
    getScheduleDetail,
    createGroupSchedule,
    createSemiPrivateSchedule,
    createPrivateSchedule,
    updateSchedule,
    deleteSchedule,
    navigateMonth,
    goToToday
  };
}; 