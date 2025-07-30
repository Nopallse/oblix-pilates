import React, { useState, useEffect } from 'react';
import { useCheckClass } from './api';
import { Button } from '@components/ui';
import Loading from '@components/ui/Loading/Loading';
import { format, isSameDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { icons } from '@shared/utils/assets';
import { useApiToast } from '@shared/hooks';

const CheckClass = () => {
  const {
    data,
    loading,
    error,
    selectedDate,
    dateRange,
    bookClass,
    joinWaitlist,
    cancelBooking,
    nextWeek,
    prevWeek,
    selectDate,
    clearError
  } = useCheckClass();

  const { showToast } = useApiToast();
  const [bookingLoading, setBookingLoading] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelScheduleId, setCancelScheduleId] = useState(null);

  // Format time from 24h to 12h
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Format time for display (handle special cases like in the image)
  const formatDisplayTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    
    // Handle special cases like 13:10 -> 13:10 PM (as shown in image)
    if (hour >= 12) {
      return `${hour}:${minutes} PM`;
    } else {
      return `${hour}:${minutes} AM`;
    }
  };

  // Handle booking
  const handleBooking = async (scheduleId, scheduleType) => {
    setBookingLoading(prev => ({ ...prev, [scheduleId]: true }));
    try {
      if (scheduleType === 'waitlist') {
        await joinWaitlist(scheduleId);
      } else {
        await bookClass(scheduleId);
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setBookingLoading(prev => ({ ...prev, [scheduleId]: false }));
    }
  };

  // Handle cancel booking
  const handleCancelBooking = (schedule) => {
    setCancelScheduleId(schedule.booking_id)
    setCancelReason('')
    setShowCancelModal(true)
  }

  // Handle confirm cancel with reason
  const handleConfirmCancel = async () => {
    if (!cancelReason.trim()) {
      showToast('Alasan pembatalan harus diisi', 'error')
      return
    }

    setBookingLoading(prev => ({ ...prev, [cancelScheduleId]: true }))
    try {
      await cancelBooking(cancelScheduleId, cancelReason)
      // Close modal and reset state
      setShowCancelModal(false)
      setCancelReason('')
      setCancelScheduleId(null)
    } catch (error) {
      console.error('Cancel booking error:', error)
      showToast('Gagal membatalkan booking', 'error')
    } finally {
      setBookingLoading(prev => ({ ...prev, [cancelScheduleId]: false }))
    }
  }

  // Handle close cancel modal
  const handleCloseCancelModal = () => {
    setShowCancelModal(false)
    setCancelReason('')
    setCancelScheduleId(null)
  }

  // Get availability text
  const getAvailabilityText = (schedule) => {
    if (schedule.available_slots === null) {
      return `${schedule.available_sessions}/10 Available`;
    }
    // Format: "booked_count/total_capacity Available"
    const totalCapacity = schedule.booked_count + schedule.available_slots;
    return `${schedule.booked_count}/${totalCapacity} Available`;
  };

  // Check if class is full
  const isClassFull = (schedule) => {
    if (schedule.available_slots === null) {
      return schedule.available_sessions === 0;
    }
    return schedule.available_slots === 0;
  };

  // Get action button based on booking status
  const getActionButton = (schedule) => {
    const { booking_status, can_book, is_booked, id: scheduleId, booking_id } = schedule;
    const loadingKey = booking_id || scheduleId;

    if (is_booked && booking_status === 'signup') {
      return (
        <Button 
          variant="primary" 
          size="small" 
          onClick={() => handleCancelBooking(schedule)} 
          loading={bookingLoading[loadingKey]} 
          disabled={bookingLoading[loadingKey]}
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          Cancel Booking
        </Button>
      );
    }

    if (is_booked && booking_status === 'waiting_list') {
      return (
        <Button 
          variant="primary" 
          size="small" 
          onClick={() => handleCancelBooking(schedule)} 
          loading={bookingLoading[loadingKey]} 
          disabled={bookingLoading[loadingKey]}
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          Cancel Waitlist
        </Button>
      );
    }

    if (isClassFull(schedule) && can_book) {
      return (
        <Button 
          variant="primary" 
          size="small" 
          onClick={() => handleBooking(scheduleId, 'waitlist')} 
          loading={bookingLoading[scheduleId]} 
          disabled={bookingLoading[scheduleId]}
        >
          Join Waitlist
        </Button>
      );
    }

    if (can_book && !is_booked) {
      return (
        <Button 
          variant="primary" 
          size="small" 
          onClick={() => handleBooking(scheduleId, 'book')} 
          loading={bookingLoading[scheduleId]} 
          disabled={bookingLoading[scheduleId]}
        >
          Book Class
        </Button>
      );
    }

    return (
      <Button 
        variant="outline" 
        size="small" 
        disabled 
        className="cursor-not-allowed opacity-50"
      >
        Cannot Book
      </Button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
            <Button 
              variant="primary" 
              size="small"
              onClick={clearError}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Check Classes
          </h1>
          
          {/* Package Info */}
          {data?.package_info && (
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                My Package
              </div>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {data.package_info.remaining_sessions.group + data.package_info.remaining_sessions.semi_private + data.package_info.remaining_sessions.private} Session Left ({data.package_info.package_name})
              </div>
            </div>
          )}
        </div>

        {/* Date Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={prevWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
            >
              {/* SVG panah kiri custom sesuai instruksi */}
              <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0933 1.53564L1.8838 10.7451L11.0933 19.9546" stroke="#525251" strokeWidth="2.51167" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Date Cards */}
            <div className="flex justify-center w-full">
              <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center w-full">
                {dateRange.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => selectDate(date)}
                    className={`
                      flex-shrink-0
                      w-full
                      max-w-[80px]
                      sm:max-w-[60px]
                      md:max-w-[80px]
                      lg:max-w-[80px]
                      xl:max-w-[120px]
                      2xl:max-w-[180px]
                      px-2 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8
                      py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7
                      rounded-lg
                      text-center
                      transition-all
                      ${isSameDay(date, selectedDate)
                        ? 'bg-primary text-white'
                        : 'bg-quaternary text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <div className="text-xs font-medium">
                      {format(date, 'd MMM', { locale: id })}
                    </div>
                    <div className="text-lg font-bold">
                      {format(date, 'EEE', { locale: id })}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={nextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {/* SVG panah kanan custom sesuai instruksi */}
              <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.90625 19.9546L11.1157 10.7451L1.90625 1.53566" stroke="#525251" strokeWidth="2.51167" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-4">
          {data?.schedules && data.schedules.length > 0 ? (
            data.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-quaternary p-4 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  {/* Time */}
                  <div className="flex-1">
                    <div className="text-xs  text-gray-900">
                      {formatTime(schedule.time_start)} - {formatTime(schedule.time_end)}
                    </div>
                  </div>

                  {/* Class Info */}
                  <div className="flex-1 text-center">
                    <div className="text-xs font-bold text-gray-900">
                      {schedule.class.name}
                    </div>
                    
                  </div>

                  {/* Class Info */}
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-600">
                      {schedule.schedule_type
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                      }
                    </div>
                  </div>

                  {/* Trainer */}
                  <div className="flex-1 text-center">
                    <div className="text-xs  text-gray-900">
                      {schedule.trainer.name}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex-1 text-center">
                    <div className={`text-xs  ${
                      isClassFull(schedule) ? 'text-red-600' : ''
                    }`}>
                      {getAvailabilityText(schedule)}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-1 text-right">
                    {getActionButton(schedule)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <img src={icons.calendar} alt="No classes" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Available</h3>
                <p className="text-gray-600">
                  No classes are scheduled for {format(selectedDate, 'EEEE, MMMM d, yyyy', { locale: id })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Batalkan Booking
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Pembatalan *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Masukkan alasan pembatalan..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                size="small"
                onClick={handleCloseCancelModal}
                disabled={bookingLoading[cancelScheduleId]}
              >
                Batal
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={handleConfirmCancel}
                loading={bookingLoading[cancelScheduleId]}
                disabled={bookingLoading[cancelScheduleId] || !cancelReason.trim()}
              >
                Konfirmasi Pembatalan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckClass; 