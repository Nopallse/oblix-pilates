import { apiClient } from '@shared/services';

export const memberService = {
  getMembers: (params) => apiClient.get('/api/member', { params }),
  // Tambahkan create, update, delete jika diperlukan
}; 