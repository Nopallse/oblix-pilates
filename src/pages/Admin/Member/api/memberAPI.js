import { memberService } from '@shared/services/memberService';
 
export const memberAPI = {
  getMembers: memberService.getMembers,
  // Tambahkan create, update, delete jika diperlukan
}; 