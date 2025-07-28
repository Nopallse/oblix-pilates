import React from 'react';
import { Button } from '@components/ui';
import { useApiToast } from '@shared/hooks';

const ScheduleDetailModal = ({ 
  isOpen, 
  onClose, 
  scheduleData, 
  onEdit, 
  onDelete,
  loading = false 
}) => {
  const { showToast } = useApiToast();

  console.log('ScheduleDetailModal props:', { isOpen, scheduleData, loading });

  if (!isOpen || !scheduleData) {
    console.log('ScheduleDetailModal not rendering because:', { isOpen, hasScheduleData: !!scheduleData });
    return null;
  }

  const handleDelete = () => {
    if (window.confirm('Hapus schedule ini?')) {
      onDelete();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString?.slice(0, 5) || timeString;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'minimum_not_met':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'minimum_not_met':
        return 'Minimum Signup Belum Terpenuhi';
      case 'active':
        return 'Aktif';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Detail Schedule - {scheduleData.class_name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {formatDate(scheduleData.date_start)} • {formatTime(scheduleData.time_start)} - {formatTime(scheduleData.time_end)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="small"
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={handleDelete}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Delete
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Memuat detail...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 border-b pb-2">Informasi Dasar</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Class</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: scheduleData.class_color }}
                      ></div>
                      <p className="text-gray-900">{scheduleData.class_name}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Trainer</label>
                    <p className="text-gray-900 mt-1">{scheduleData.trainer_name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Tanggal</label>
                    <p className="text-gray-900 mt-1">{formatDate(scheduleData.date_start)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Waktu</label>
                    <p className="text-gray-900 mt-1">
                      {formatTime(scheduleData.time_start)} - {formatTime(scheduleData.time_end)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(scheduleData.status)}`}>
                      {getStatusText(scheduleData.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Capacity & Bookings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 border-b pb-2">Kapasitas & Booking</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Kapasitas Maksimal</label>
                    <p className="text-gray-900 mt-1">{scheduleData.max_capacity} peserta</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Pendaftar Saat Ini</label>
                    <p className="text-gray-900 mt-1">{scheduleData.current_signups} peserta</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Slot Tersedia</label>
                    <p className="text-gray-900 mt-1">{scheduleData.available_slots} slot</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Waitlist</label>
                    <p className="text-gray-900 mt-1">{scheduleData.waitlist_count} peserta</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Dibatalkan</label>
                    <p className="text-gray-900 mt-1">{scheduleData.cancelled_count} peserta</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Minimum Signup</label>
                    <p className="text-gray-900 mt-1">{scheduleData.min_signup} peserta</p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4 md:col-span-2">
                <h4 className="font-semibold text-gray-900 border-b pb-2">Pengaturan</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tipe Repeat</label>
                    <p className="text-gray-900 mt-1 capitalize">{scheduleData.repeat_type || 'Tidak ada'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Schedule Until</label>
                    <p className="text-gray-900 mt-1">
                      {scheduleData.schedule_until ? formatDate(scheduleData.schedule_until) : 'Tidak ada'}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Booking Deadline</label>
                    <p className="text-gray-900 mt-1">{scheduleData.booking_deadline_hour} jam sebelum kelas</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Waitlist Lock</label>
                    <p className="text-gray-900 mt-1">{scheduleData.waitlist_lock_minutes} menit</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Cancel Buffer</label>
                    <p className="text-gray-900 mt-1">{scheduleData.cancel_buffer_minutes} menit</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Dapat Dibooking</label>
                    <p className="text-gray-900 mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        scheduleData.can_book ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {scheduleData.can_book ? 'Ya' : 'Tidak'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bookings List */}
              {scheduleData.signup_bookings && scheduleData.signup_bookings.length > 0 && (
                <div className="space-y-4 md:col-span-2">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Daftar Pendaftar</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {scheduleData.signup_bookings.map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <p className="font-medium text-gray-900">{booking.member_name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{booking.member_email || 'N/A'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              {new Date(booking.created_at).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Waitlist */}
              {scheduleData.waitlist_bookings && scheduleData.waitlist_bookings.length > 0 && (
                <div className="space-y-4 md:col-span-2">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Waitlist</h4>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {scheduleData.waitlist_bookings.map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <p className="font-medium text-gray-900">{booking.member_name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{booking.member_email || 'N/A'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              {new Date(booking.created_at).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailModal; 