import { useState, useEffect, useCallback } from 'react'
import { checkClassAPI } from './checkClassAPI'
import { extractErrorMessage } from '@shared/services/apiErrorHandler'
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { id } from 'date-fns/locale'

export const useCheckClass = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateRange, setDateRange] = useState([])

  // Generate date range for the week
  const generateDateRange = useCallback((centerDate) => {
    const start = startOfWeek(centerDate, { weekStartsOn: 1 }) // Monday start
    const end = endOfWeek(centerDate, { weekStartsOn: 1 })
    const range = eachDayOfInterval({ start, end })
    setDateRange(range)
  }, [])

  // Load available classes for a specific date
  const loadAvailableClasses = useCallback(async (date) => {
    setLoading(true)
    setError(null)
    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const response = await checkClassAPI.getAvailableClasses(formattedDate)
      
      if (response.success) {
        setData(response.data)
        console.log('📅 Available classes loaded:', response.data)
      } else {
        throw new Error(response.message || 'Failed to fetch available classes')
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat data kelas')
      setError(errorMessage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Book a class
  const bookClass = useCallback(async (scheduleId) => {
    try {
      const response = await checkClassAPI.bookClass(scheduleId)
      if (response.success) {
        // Reload data after booking
        await loadAvailableClasses(selectedDate)
        return response
      } else {
        throw new Error(response.message || 'Failed to book class')
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal booking kelas')
      throw new Error(errorMessage)
    }
  }, [selectedDate, loadAvailableClasses])

  // Join waitlist
  const joinWaitlist = useCallback(async (scheduleId) => {
    try {
      const response = await checkClassAPI.joinWaitlist(scheduleId)
      if (response.success) {
        // Reload data after joining waitlist
        await loadAvailableClasses(selectedDate)
        return response
      } else {
        throw new Error(response.message || 'Failed to join waitlist')
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal join waitlist')
      throw new Error(errorMessage)
    }
  }, [selectedDate, loadAvailableClasses])

  // Cancel booking
  const cancelBooking = useCallback(async (bookingId, reason) => {
    try {
      const response = await checkClassAPI.cancelBooking(bookingId, reason)
      if (response.success) {
        await loadAvailableClasses(selectedDate)
        return response
      } else {
        throw new Error(response.message || 'Failed to cancel booking')
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal cancel booking')
      throw new Error(errorMessage)
    }
  }, [selectedDate, loadAvailableClasses])

  // Navigate to next week
  const nextWeek = useCallback(() => {
    const newDate = addDays(selectedDate, 7)
    setSelectedDate(newDate)
    generateDateRange(newDate)
  }, [selectedDate, generateDateRange])

  // Navigate to previous week
  const prevWeek = useCallback(() => {
    const newDate = subDays(selectedDate, 7)
    setSelectedDate(newDate)
    generateDateRange(newDate)
  }, [selectedDate, generateDateRange])

  // Select a specific date
  const selectDate = useCallback((date) => {
    setSelectedDate(date)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Initialize date range and load data on mount
  useEffect(() => {
    generateDateRange(selectedDate)
  }, [generateDateRange, selectedDate])

  // Load data when selected date changes
  useEffect(() => {
    if (selectedDate) {
      loadAvailableClasses(selectedDate)
    }
  }, [selectedDate, loadAvailableClasses])

  return {
    data,
    loading,
    error,
    selectedDate,
    dateRange,
    loadAvailableClasses,
    bookClass,
    joinWaitlist,
    cancelBooking,
    nextWeek,
    prevWeek,
    selectDate,
    clearError
  }
} 