import React, { useState, useEffect } from 'react';
import { Button, Table } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { useSchedule } from './api';
import { ScheduleTypeDropdown, GroupScheduleForm, SemiPrivateScheduleForm, PrivateScheduleForm, ScheduleDetailModal } from './components';
import { icons } from '@shared/utils/assets';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  getDate,
  getMonth,
  getYear
} from 'date-fns';
import { id } from 'date-fns/locale';

const Schedule = () => {
  // Add CSS keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { 
          opacity: 0; 
          transform: translateY(-20px) scale(0.95);
        }
        to { 
          opacity: 1; 
          transform: translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const {
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
  } = useSchedule();
  
  const { showToast } = useApiToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState('month');
  const [formLoading, setFormLoading] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailScheduleData, setDetailScheduleData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Debug state changes
  useEffect(() => {
    console.log('Detail modal state changed:', { isDetailModalOpen, detailScheduleData, detailLoading });
  }, [isDetailModalOpen, detailScheduleData, detailLoading]);

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    
    // Get the first day of the week that contains the first day of the month
    const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
    const lastDayOfCalendar = endOfWeek(lastDayOfMonth);
    
    // Generate all days in the calendar interval
    const calendarDays = eachDayOfInterval({
      start: firstDayOfCalendar,
      end: lastDayOfCalendar
    });
    
    // Get all dates that have schedules from the API data
    const allScheduleDates = new Set();
    if (calendarData.schedules_by_date) {
      Object.keys(calendarData.schedules_by_date).forEach(dateStr => {
        allScheduleDates.add(dateStr);
      });
    }
    
    // Convert to our format
    const days = calendarDays.map(date => {
      const day = getDate(date);
      const isCurrentMonth = isSameMonth(date, currentDate);
      const isPrevMonth = !isCurrentMonth && date < firstDayOfMonth;
      
      // Create date string for API lookup
      const dateStr = format(date, 'yyyy-MM-dd');
      const hasSchedule = allScheduleDates.has(dateStr);
      
      return {
        day: day,
        isCurrentMonth: isCurrentMonth,
        isPrevMonth: isPrevMonth,
        date: date,
        hasSchedule: hasSchedule
      };
    });
    
    return days;
  };

  // Get day name from date
  const getDayName = (date) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()];
  };

  // Get class colors based on class type (fallback)
  const getClassColor = (className) => {
    if (className.includes('Chair')) {
      if (className.includes('Basic')) return 'bg-blue-100 text-blue-800 border-blue-200';
      if (className.includes('Flow')) return 'bg-purple-100 text-purple-800 border-purple-200';
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
    if (className.includes('Tower')) {
      if (className.includes('Basic')) return 'bg-green-100 text-green-800 border-green-200';
      if (className.includes('Flow')) return 'bg-teal-100 text-teal-800 border-teal-200';
      if (className.includes('Chair')) return 'bg-orange-100 text-orange-800 border-orange-200';
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Format month year
  const formatMonthYear = (date) => {
    return format(date, 'MMMM yyyy', { locale: id });
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  // Load calendar data on component mount
  useEffect(() => {
    loadCalendarData();
    loadTrainers();
    loadClasses();
  }, [loadCalendarData, loadTrainers, loadClasses]);

  // Update currentDate when calendarData changes
  useEffect(() => {
    if (calendarData.month && calendarData.year) {
      setCurrentDate(new Date(calendarData.year, calendarData.month - 1));
    }
  }, [calendarData.month, calendarData.year]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedDate) {
        setSelectedDate(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedDate]);

  // Handle view schedule details
  const handleViewScheduleDetails = async (schedule) => {
    console.log('handleViewScheduleDetails called with:', schedule);
    try {
      // Get schedule type from the schedule data
      const scheduleType = schedule.type || 'group';
      console.log('Schedule type:', scheduleType);
      
      // Get detailed schedule data
      setDetailLoading(true);
      const detailedSchedule = await getScheduleDetail(schedule.id, scheduleType);
      console.log('Detailed schedule data:', detailedSchedule);
      
      setDetailScheduleData(detailedSchedule);
      setIsDetailModalOpen(true);
      console.log('Detail modal should be open now');
    } catch (error) {
      console.error('Error in handleViewScheduleDetails:', error);
      showToast('Gagal memuat detail schedule', 'error');
    } finally {
      setDetailLoading(false);
    }
  };

  // Handle edit schedule directly
  const handleEditSchedule = async (schedule) => {
    try {
      // Get schedule type from the schedule data
      const scheduleType = schedule.type || 'group';
      
      // Get detailed schedule data for editing
      const detailedSchedule = await getScheduleDetail(schedule.id, scheduleType);
      
      setSelectedSchedule(detailedSchedule);
      setCurrentScheduleType(scheduleType);
      setIsFormOpen(true);
    } catch (error) {
      showToast('Gagal memuat data schedule untuk edit', 'error');
    }
  };

  // Handle edit from detail modal
  const handleEditFromDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedSchedule(detailScheduleData);
    setCurrentScheduleType(detailScheduleData?.type || 'group');
    setIsFormOpen(true);
  };

  // Handle delete from detail modal
  const handleDeleteFromDetail = async () => {
    try {
      const scheduleType = detailScheduleData?.type || 'group';
      await deleteSchedule(detailScheduleData.id, scheduleType);
      showToast('Schedule berhasil dihapus', 'success');
      setIsDetailModalOpen(false);
      setDetailScheduleData(null);
    } catch (error) {
      showToast('Gagal menghapus schedule', 'error');
    }
  };

  // Handle add schedule
  const handleAddSchedule = () => {
    setSelectedDate(null); // Close detail modal first
    setIsTypeDropdownOpen(true);
  };

  // Handle schedule type selection
  const handleScheduleTypeSelect = (type) => {
    setCurrentScheduleType(type);
    setSelectedSchedule(null);
    setIsFormOpen(true);
  };

  // Handle delete schedule
  const handleDeleteSchedule = async (scheduleId, scheduleType = 'group') => {
    try {
      await deleteSchedule(scheduleId, scheduleType);
      showToast('Schedule berhasil dihapus', 'success');
    } catch (error) {
      showToast('Gagal menghapus schedule', 'error');
    }
  };

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedSchedule) {
        await updateSchedule(selectedSchedule.id, formData, currentScheduleType);
        showToast('Schedule berhasil diupdate', 'success');
      } else {
        // Create schedule based on type
        if (currentScheduleType === 'group') {
          await createGroupSchedule(formData);
        } else if (currentScheduleType === 'semi-private') {
          await createSemiPrivateSchedule(formData);
        } else if (currentScheduleType === 'private') {
          await createPrivateSchedule(formData);
        } else {
          showToast('Tipe schedule tidak valid', 'error');
          return;
        }
        showToast('Schedule berhasil dibuat', 'success');
      }
      setIsFormOpen(false);
      setSelectedSchedule(null);
    } catch (error) {
      showToast('Gagal menyimpan schedule', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data kalender...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button variant="primary" onClick={() => loadCalendarData()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();
  const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Schedule</h1>
          </div>
          <Button
            variant="primary"
            size="medium"
            onClick={handleAddSchedule}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
            Add Schedule
          </Button>
        </div>

        {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            {/* Left side - Month and Navigation */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-700 min-w-[140px] text-left">
                  {formatMonthYear(currentDate)}
                </h2>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="w-8 h-8 bg-primary hover:bg-primary/80 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="w-8 h-8 bg-primary hover:bg-primary/80 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right side - Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Today
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="py-6">
            {/* Week Headers */}
            <div className="bg-secondary rounded-lg mb-2 border border-blue-300">
              <div className="grid grid-cols-7">
                {weekDays.map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-semibold text-white">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayData, index) => {
                if (!dayData) {
                  return <div key={index} className="min-h-[120px] p-2"></div>;
                }

                const { day, isCurrentMonth, isPrevMonth, date, hasSchedule } = dayData;
                
                // Create date string for API data lookup
                const dateString = format(date, 'yyyy-MM-dd');
                const schedules = getSchedulesForDate(dateString);
                const hasSchedules = schedules.length > 0;
                const today = isToday(date);
                
                return (
                  <div
                    key={index}
                    className={`min-h-[120px] rounded-xl transition-all duration-200 ${
                      isCurrentMonth 
                        ? 'border-gray-200 bg-[#f8f8f8] hover:bg-gray-200 hover:shadow-md cursor-pointer' 
                        : hasSchedule
                        ? 'border-gray-200 bg-[#f8f8f8] hover:bg-gray-200 hover:shadow-md cursor-pointer'
                        : 'border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer'
                    } ${selectedDate && isSameDay(date, selectedDate) && (isCurrentMonth || hasSchedule) ? 'ring-2 ring-primary bg-primary/10 border-primary' : ''} ${
                      today ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => (isCurrentMonth || hasSchedule) && setSelectedDate(date)}
                  >
                    {/* Date Number */}
                    <div className={`text-sm font-medium mb-2 text-center ${
                      today ? 'text-blue-600 font-semibold' :
                      isCurrentMonth 
                        ? (hasSchedules ? 'text-gray-800' : 'text-gray-600')
                        : hasSchedule
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}>
                      {day}
                      {today && (
                        <span className="ml-1 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                    
                    {/* Schedules Preview - Show for current month and any month dates with schedules */}
                    {(isCurrentMonth || hasSchedule) && (
                      <div className="">
                        {schedules.slice(0, 3).map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`text-xs p-1 rounded `}
                            style={{
                              backgroundColor: `${schedule.class_color}20`,
                              borderColor: schedule.class_color,
                            }}
                          >
                            <div>
                              {/* Desktop/tablet: show all info, Mobile: show only time_start */}
                              <div className="hidden sm:grid grid-cols-4 items-center truncate">
                                <span className="col-span-1 font-bold">{schedule.time_start.slice(0, 5)}</span>
                                <span className="col-span-2 truncate px-3">{schedule.class_name}</span>
                                <span className="col-span-1 font-bold truncate text-right">
                                  {schedule.trainer_name
                                    .split(' ')
                                    .map((n) => n[0]?.toUpperCase())
                                    .join('')}
                                </span>
                              </div>
                              <div className="sm:hidden flex items-center justify-center">
                                <span className="font-bold">{schedule.time_start.slice(0, 5)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {schedules.length > 3 && (
                          <div className="text-xs text-gray-500 text-center py-1">
                            dan {schedules.length - 3} lainnya
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        {/* Schedule Detail Modal */}
        {selectedDate && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            style={{
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setSelectedDate(null)}
          >
            <div 
              className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden"
              style={{
                animation: 'slideIn 0.3s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Classes on {format(selectedDate, 'dd MMMM yyyy', { locale: id })}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {(() => {
                      const dateString = format(selectedDate, 'yyyy-MM-dd');
                      const schedules = getSchedulesForDate(dateString);
                      return `${schedules.length} classes scheduled`;
                    })()}
                  </p>
                </div>
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                {(() => {
                  const dateString = format(selectedDate, 'yyyy-MM-dd');
                  const schedules = getSchedulesForDate(dateString);
                  
                  const columns = [
                    { 
                      key: 'time', 
                      header: 'Time', 
                      span: 2, 
                      render: (v, row) => (
                        <span className="font-medium">
                          {row.time_start.slice(0, 5)} - {row.time_end.slice(0, 5)}
                        </span>
                      )
                    },
                    { 
                      key: 'class_name', 
                      header: 'Class Name', 
                      span: 4, 
                      render: v => <span className="font-medium">{v}</span>
                    },
                    { 
                      key: 'trainer_name', 
                      header: 'Coach', 
                      span: 2, 
                      render: v => <span>{v}</span>
                    },
                    { 
                      key: 'pax', 
                      header: 'Pax', 
                      span: 2, 
                      render: (v, row) => (
                        <span className="text-center">
                          {row.participants || 0}/{row.capacity || 10}
                        </span>
                      ),
                      className: 'text-center'
                    },
                    { 
                      key: 'actions', 
                      header: '', 
                      span: 2, 
                      render: (v, row) => (
                        <div className="flex space-x-2 justify-end">
                          <button 
                            className="p-2 hover:bg-gray-100 rounded transition-colors" 
                            title="View Details"
                            onClick={() => handleViewScheduleDetails(row)}
                          >
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            className="p-2 hover:bg-gray-100 rounded transition-colors" 
                            title="Edit"
                            onClick={() => handleEditSchedule(row)}
                          >
                            <img src={icons.edit} alt="Edit" className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 hover:bg-red-100 rounded transition-colors" 
                            title="Delete"
                            onClick={() => {
                              if (window.confirm('Hapus schedule ini?')) {
                                const scheduleType = row.type || 'group';
                                handleDeleteSchedule(row.id, scheduleType);
                              }
                            }}
                          >
                            <img src={icons.delete} alt="Delete" className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    }
                  ];

                  return (
                    <div>
                      {loading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-2 text-sm text-gray-600">Memuat data...</p>
                          </div>
                        </div>
                      ) : (
                        <Table
                          columns={columns}
                          data={schedules}
                          emptyMessage="Tidak ada schedule untuk tanggal ini"
                        />
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Group Schedule Form */}
      <GroupScheduleForm
        isOpen={isFormOpen && currentScheduleType === 'group'}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleFormSubmit}
        selectedSchedule={selectedSchedule}
        trainers={trainers}
        classes={classes}
        loading={formLoading}
        onClassCreated={loadClasses}
      />

      {/* Semi-Private Schedule Form */}
      <SemiPrivateScheduleForm
        isOpen={isFormOpen && currentScheduleType === 'semi-private'}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleFormSubmit}
        selectedSchedule={selectedSchedule}
        trainers={trainers}
        classes={classes}
        loading={formLoading}
        onClassCreated={loadClasses}
      />

      {/* Private Schedule Form */}
      <PrivateScheduleForm
        isOpen={isFormOpen && currentScheduleType === 'private'}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleFormSubmit}
        selectedSchedule={selectedSchedule}
        trainers={trainers}
        classes={classes}
        loading={formLoading}
        onClassCreated={loadClasses}
      />

      {/* Schedule Type Dropdown */}
      {isTypeDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsTypeDropdownOpen(false)}
        >
          <ScheduleTypeDropdown
            isOpen={isTypeDropdownOpen}
            onClose={() => setIsTypeDropdownOpen(false)}
            onSelectType={handleScheduleTypeSelect}
          />
        </div>
      )}

      {/* Schedule Detail Modal */}
      <ScheduleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          console.log('Closing detail modal');
          setIsDetailModalOpen(false);
          setDetailScheduleData(null);
        }}
        scheduleData={detailScheduleData}
        onEdit={handleEditFromDetail}
        onDelete={handleDeleteFromDetail}
        loading={detailLoading}
      />
    </div>
  );
};

export default Schedule; 