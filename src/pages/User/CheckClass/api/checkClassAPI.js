import { apiClient } from '@shared/services'

export const checkClassAPI = {
  // Get available classes for a specific date
  getAvailableClasses: async (date) => {
    try {
      const response = await apiClient.get('/api/check-class', {
        params: { date }
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // Book a class
  bookClass: async (scheduleId) => {
    try {
      const response = await apiClient.post('/api/booking', {
        schedule_id: scheduleId
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // Join waitlist
  joinWaitlist: async (scheduleId) => {
    try {
      const response = await apiClient.post('/api/join-waitlist', {
        schedule_id: scheduleId
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await apiClient.put(`/api/booking/${bookingId}/cancel`, {
        reason: reason
      })
      return response
    } catch (error) {
      throw error
    }
  }
} 