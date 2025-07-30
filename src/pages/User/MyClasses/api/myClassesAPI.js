import { apiClient } from '../../../../shared/services/apiClient';

export const myClassesAPI = {
  getMyClasses: (type) => apiClient.get(`/api/my-classes?type=${type}`),
  cancelBooking: (bookingId, reason) => apiClient.put(`/api/booking/${bookingId}/cancel`, { reason }),
}; 