import React, { useState } from 'react';
import { Button, Table } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';

const ScheduleDetailModal = ({ 
  isOpen, 
  onClose, 
  scheduleData, 
  onEdit, 
  onDelete,
  loading = false,
  onRefresh // Add refresh callback
}) => {
  const { showToast } = useApiToast();
  const [activeTab, setActiveTab] = useState('signups');
  const [actionLoading, setActionLoading] = useState({});
  const [localScheduleData, setLocalScheduleData] = useState(scheduleData);

  console.log('ScheduleDetailModal props:', { isOpen, scheduleData, loading });

  // Update local data when scheduleData changes
  React.useEffect(() => {
    setLocalScheduleData(scheduleData);
  }, [scheduleData]);

  if (!isOpen || !localScheduleData) {
    console.log('ScheduleDetailModal not rendering because:', { isOpen, hasScheduleData: !!localScheduleData });
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

  const getTypeLabel = (type) => {
    switch (type) {
      case 'private':
        return 'Private';
      case 'semi_private':
        return 'Semi-Private';
      case 'group':
        return 'Group';
      default:
        return type;
    }
  };

  const handleAttendanceChange = async (bookingId, attendance) => {
    setActionLoading(prev => ({ ...prev, [bookingId]: true }));
    try {
      await apiClient.put(`/api/booking/${bookingId}/attendance`, {
        attendance: attendance,
        notes: attendance === 'present' ? 'Hadir tepat waktu' : 'Tidak hadir'
      });
      
      // Update local data immediately
      setLocalScheduleData(prev => ({
        ...prev,
        signup_bookings: prev.signup_bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, attendance: attendance }
            : booking
        )
      }));
      
      showToast('Attendance berhasil diupdate', 'success');
    } catch (error) {
      showToast('Gagal update attendance', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleCancelSignup = async (bookingId) => {
    const reason = prompt('Alasan pembatalan:');
    if (!reason) return;

    setActionLoading(prev => ({ ...prev, [bookingId]: true }));
    try {
      await apiClient.put(`/api/booking/${bookingId}/cancel`, {
        reason: reason
      });
      
      // Update local data - move booking from signups to cancelled
      setLocalScheduleData(prev => {
        const cancelledBooking = prev.signup_bookings.find(booking => booking.id === bookingId);
        return {
          ...prev,
          signup_bookings: prev.signup_bookings.filter(booking => booking.id !== bookingId),
          cancelled_bookings: [...(prev.cancelled_bookings || []), cancelledBooking]
        };
      });
      
      showToast('Sign up berhasil dibatalkan', 'success');
    } catch (error) {
      showToast('Gagal membatalkan sign up', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      try {
        await onRefresh();
        showToast('Data berhasil di-refresh', 'success');
      } catch (error) {
        showToast('Gagal refresh data', 'error');
      }
    } else {
      showToast('Refresh function not available', 'error');
    }
  };

  const getAttendanceColor = (attendance) => {
    switch (attendance) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceText = (attendance) => {
    switch (attendance) {
      case 'present':
        return 'Hadir';
      case 'absent':
        return 'Tidak Hadir';
      default:
        return 'Belum Check';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary bg-opacity-20 -m-6 p-6 rounded mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-primary font-semibold">
                View Booking
              </h3>
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
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {localScheduleData.class_name} ({getTypeLabel(localScheduleData.type)})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="mt-1 text-sm text-gray-900">
                  {formatDate(localScheduleData.date_start)}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Coach</label>
                <div className="mt-1 text-sm text-gray-900">
                  {localScheduleData.trainer_name}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Time</label>
                <div className="mt-1 text-sm text-gray-900">
                  {formatTime(localScheduleData.time_start)} - {formatTime(localScheduleData.time_end)}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Spot</label>
                <div className="mt-1 text-sm text-gray-900">
                  {localScheduleData.current_signups}/{localScheduleData.max_capacity} Available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="small"
            onClick={handleRefresh}
            disabled={loading}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('signups')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'signups'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Sign Ups ({localScheduleData.signup_bookings?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'waitlist'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Waitlist ({localScheduleData.waitlist_bookings?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'cancelled'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Cancelled ({localScheduleData.cancelled_bookings?.length || 0})
          </button>
        </div>

        {/* Content */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Memuat detail...</p>
              </div>
            </div>
          ) : (
            <div>
              {activeTab === 'signups' && (
                <Table
                  columns={[
                    {
                      key: 'member_name',
                      header: 'Member Name',
                      span: 3,
                      render: (v, row) => (
                        <div>
                          <div className="font-medium text-gray-900">{v}</div>
                          <div className="text-sm text-gray-500">{row.member_email}</div>
                        </div>
                      )
                    },
                    {
                      key: 'package_info',
                      header: 'Package',
                      span: 2,
                      render: (v) => (
                        <div>
                          <div className="font-medium text-gray-900">{v?.package_name}</div>
                          <div className="text-sm text-gray-500 capitalize">{v?.package_type}</div>
                        </div>
                      )
                    },
                    {
                      key: 'attendance',
                      header: 'Attendance',
                      span: 2,
                      render: (v, row) => (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={v === 'present'}
                            onChange={(e) => handleAttendanceChange(row.id, e.target.checked ? 'present' : 'absent')}
                            disabled={actionLoading[row.id]}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className={`text-xs px-2 py-1 rounded-full ${getAttendanceColor(v)}`}>
                            {getAttendanceText(v)}
                          </span>
                        </div>
                      )
                    },
                    {
                      key: 'actions',
                      header: 'Actions',
                      span: 1,
                      render: (v, row) => (
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => handleCancelSignup(row.id)}
                          disabled={actionLoading[row.id]}
                        >
                          Cancel
                        </Button>
                      )
                    }
                  ]}
                  data={localScheduleData.signup_bookings || []}
                  emptyMessage="Tidak ada sign ups"
                />
              )}

              {activeTab === 'waitlist' && (
                <Table
                  columns={[
                    {
                      key: 'member_name',
                      header: 'Member Name',
                      span: 4,
                      render: (v, row) => (
                        <div>
                          <div className="font-medium text-gray-900">{v}</div>
                          <div className="text-sm text-gray-500">{row.member_email}</div>
                        </div>
                      )
                    },
                    {
                      key: 'package_info',
                      header: 'Package',
                      span: 3,
                      render: (v) => (
                        <div>
                          <div className="font-medium text-gray-900">{v?.package_name}</div>
                          <div className="text-sm text-gray-500 capitalize">{v?.package_type}</div>
                        </div>
                      )
                    },
                    {
                      key: 'created_at',
                      header: 'Joined',
                      span: 2,
                      render: (v) => (
                        <span className="text-sm text-gray-600">
                          {new Date(v).toLocaleDateString('id-ID')}
                        </span>
                      )
                    }
                  ]}
                  data={localScheduleData.waitlist_bookings || []}
                  emptyMessage="Tidak ada waitlist"
                />
              )}

              {activeTab === 'cancelled' && (
                <Table
                  columns={[
                    {
                      key: 'member_name',
                      header: 'Member Name',
                      span: 4,
                      render: (v, row) => (
                        <div>
                          <div className="font-medium text-gray-900">{v}</div>
                          <div className="text-sm text-gray-500">{row.member_email}</div>
                        </div>
                      )
                    },
                    {
                      key: 'package_info',
                      header: 'Package',
                      span: 3,
                      render: (v) => (
                        <div>
                          <div className="font-medium text-gray-900">{v?.package_name}</div>
                          <div className="text-sm text-gray-500 capitalize">{v?.package_type}</div>
                        </div>
                      )
                    },
                    {
                      key: 'created_at',
                      header: 'Cancelled',
                      span: 2,
                      render: (v) => (
                        <span className="text-sm text-gray-600">
                          {new Date(v).toLocaleDateString('id-ID')}
                        </span>
                      )
                    }
                  ]}
                  data={localScheduleData.cancelled_bookings || []}
                  emptyMessage="Tidak ada cancelled bookings"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailModal; 