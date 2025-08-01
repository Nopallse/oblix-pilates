import React, { useState, useEffect } from 'react';
import { Button, Input, Dropdown, FileInput, Table } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';
import ManageClassModal from './ManageClassModal';
import { icons } from '@shared/utils/assets';

const PrivateScheduleForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedSchedule, 
  trainers, 
  classes, 
  loading = false,
  onClassCreated
}) => {
  const { showToast } = useApiToast();
  const [isManageClassOpen, setIsManageClassOpen] = useState(false);
  const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [repeatType, setRepeatType] = useState(selectedSchedule?.repeat_type || 'none');
  const [selectedClassId, setSelectedClassId] = useState(selectedSchedule?.class_id || '');
  
  // Member search state
  const [memberOptions, setMemberOptions] = useState([]);
  const [memberSearch, setMemberSearch] = useState('');
  const [memberLoading, setMemberLoading] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [timeStart, setTimeStart] = useState('07:30');
  const [timeEnd, setTimeEnd] = useState('08:30');
  const [minSignup, setMinSignup] = useState(1);
  const [bookingDeadlineHour, setBookingDeadlineHour] = useState(24);
  const [waitlistLockMinutes, setWaitlistLockMinutes] = useState(30);
  const [cancelBufferMinutes, setCancelBufferMinutes] = useState(60);
  const [scheduleUntil, setScheduleUntil] = useState('');

  // Initialize selectedRepeatDays and repeatType from selectedSchedule
  useEffect(() => {
    if (selectedSchedule?.repeat_days) {
      setSelectedRepeatDays(selectedSchedule.repeat_days);
    } else {
      setSelectedRepeatDays([]);
    }
    
    if (selectedSchedule?.repeat_type) {
      setRepeatType(selectedSchedule.repeat_type);
    } else {
      setRepeatType('none');
    }
    
    if (selectedSchedule?.class_id) {
      setSelectedClassId(selectedSchedule.class_id);
    } else {
      setSelectedClassId('');
    }
    
    if (selectedSchedule?.date_start) {
      setDateStart(selectedSchedule.date_start);
    } else {
      setDateStart('');
    }
    
    if (selectedSchedule?.time_start) {
      setTimeStart(selectedSchedule.time_start.slice(0, 5));
    } else {
      setTimeStart('07:30');
    }
    
    if (selectedSchedule?.time_end) {
      setTimeEnd(selectedSchedule.time_end.slice(0, 5));
    } else {
      setTimeEnd('08:30');
    }
    
    if (selectedSchedule?.min_signup) {
      setMinSignup(selectedSchedule.min_signup);
    } else {
      setMinSignup(1);
    }
    
    if (selectedSchedule?.booking_deadline_hour) {
      setBookingDeadlineHour(selectedSchedule.booking_deadline_hour);
    } else {
      setBookingDeadlineHour(24);
    }
    
    if (selectedSchedule?.waitlist_lock_minutes) {
      setWaitlistLockMinutes(selectedSchedule.waitlist_lock_minutes);
    } else {
      setWaitlistLockMinutes(30);
    }
    
    if (selectedSchedule?.cancel_buffer_minutes) {
      setCancelBufferMinutes(selectedSchedule.cancel_buffer_minutes);
    } else {
      setCancelBufferMinutes(60);
    }
    
    if (selectedSchedule?.schedule_until) {
      setScheduleUntil(selectedSchedule.schedule_until);
    } else {
      setScheduleUntil('');
    }
  }, [selectedSchedule]);

  // Initialize selected member and trainer when form opens or selectedSchedule changes
  useEffect(() => {
    if (isOpen) {
      if (selectedSchedule?.member_id) {
        setSelectedMemberId(selectedSchedule.member_id);
        // Set member search to the member's name if available
        if (selectedSchedule.member_name) {
          setMemberSearch(selectedSchedule.member_name);
        }
      } else {
        setSelectedMemberId('');
        setMemberSearch('');
      }

      if (selectedSchedule?.trainer_id) {
        setSelectedTrainerId(selectedSchedule.trainer_id);
      } else {
        setSelectedTrainerId('');
      }

      // Load initial member data when form opens
      if (!memberSearch) {
        setMemberSearch('');
      }
    }
  }, [isOpen, selectedSchedule]);

  // Fetch members when user types or when form opens
  useEffect(() => {
    let ignore = false;
    const fetchMembers = async () => {
      setMemberLoading(true);
      try {
        const res = await apiClient.get('/api/member', { 
          params: { search: memberSearch },
          silent: true 
        });
        if (!ignore) {
          const membersData = res.data?.data?.members || res.data?.members || [];
          setMemberOptions(membersData);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to load members:', err);
          setMemberOptions([]);
        }
      } finally {
        if (!ignore) setMemberLoading(false);
      }
    };
    fetchMembers();
    return () => { ignore = true; };
  }, [memberSearch]);



  if (!isOpen) return null;





  const handleFormSubmit = () => {
    // Get form data
    const form = document.querySelector('#private-schedule-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const class_id = selectedClassId;
    const date_start = dateStart;
    const time_start = timeStart;
    const time_end = timeEnd;
    const min_signup = minSignup;
    const booking_deadline_hour = bookingDeadlineHour;
    const waitlist_lock_minutes = waitlistLockMinutes;
    const cancel_buffer_minutes = cancelBufferMinutes;
    
    if (!class_id || !selectedTrainerId || !selectedMemberId || !date_start || !time_start || !time_end || 
        !min_signup || !booking_deadline_hour || !waitlist_lock_minutes || !cancel_buffer_minutes) {
      showToast('Mohon lengkapi field yang wajib diisi', 'error');
      return;
    }

    // Validate min_signup for private (max 2)
    if (parseInt(min_signup) > 2) {
      showToast('Maksimal min signup untuk private adalah 2', 'error');
      return;
    }

    // Validate repeat_days for weekly repeat (only for new schedules)
    if (!selectedSchedule && repeatType === 'weekly' && selectedRepeatDays.length === 0) {
      showToast('Mohon pilih hari untuk repeat weekly', 'error');
      return;
    }

    // Validate schedule_until for weekly repeat (only for new schedules)
    if (!selectedSchedule && repeatType === 'weekly' && !formData.get('schedule_until')) {
      showToast('Schedule until wajib diisi untuk repeat weekly', 'error');
      return;
    }
    
    // Handle file upload
    let pictureData = null;
    
    if (selectedImage) {
      // New file is selected
      pictureData = selectedImage;
    } else if (selectedSchedule?.picture) {
      // Keep existing picture if no new file is selected
      pictureData = selectedSchedule.picture;
    }
    
    const data = {
      class_id: selectedClassId,
      trainer_id: selectedTrainerId,
      member_id: selectedMemberId,
      date_start: date_start,
      time_start: time_start,
      time_end: time_end,
      ...(selectedSchedule ? {} : {
      repeat_type: repeatType,
      repeat_days: repeatType === 'weekly' ? selectedRepeatDays : [],
      schedule_until: scheduleUntil || null,
      }),
      booking_deadline_hour: booking_deadline_hour,
      waitlist_lock_minutes: waitlist_lock_minutes,
      min_signup: min_signup,
      cancel_buffer_minutes: cancel_buffer_minutes,
      picture: pictureData
    };
    
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-primary bg-opacity-20 -m-6 p-6 rounded mb-4">
          <h3 className="text-lg text-primary font-semibold">
          {selectedSchedule ? 'Edit Private Schedule' : 'Add Private Schedule'}
          </h3>
        </div>

        <h3 className="text-md font-semibold mb-4 mt-4">
          Class Information
        </h3>
        
        <form id="private-schedule-form">
          <input type="hidden" name="class_id" value={selectedClassId} />
          <input type="hidden" name="trainer_id" value={selectedTrainerId} />
          <input type="hidden" name="member_id" value={selectedMemberId} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Class Name *
              </label>
              <div className="flex gap-2 flex-1">
                <Dropdown
                  name="class_id"
                  value={selectedClassId}
                  onChange={(value) => {
                    setSelectedClassId(value);
                    // Update the form field value
                    const form = document.querySelector('#private-schedule-form');
                    const classField = form.querySelector('input[name="class_id"]');
                    if (classField) {
                      classField.value = value;
                    }
                  }}
                  options={[
                    { value: '', label: classes.length === 0 ? 'Loading classes...' : 'Pilih Class' },
                    ...classes.map((cls) => ({
                      value: cls.id,
                      label: cls.class_name
                    }))
                  ]}
                  searchable={true}
                  variant="soft"
                  className="flex-1"
                  required
                  disabled={classes.length === 0}
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsManageClassOpen(true);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-colors text-sm font-medium"
                  title="Kelola Class"
                >
                  <img src={icons.setting} alt="Setting" className="w-7 h-7" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Trainer *
              </label>
              <Dropdown
                  name="trainer_id" 
                  value={selectedTrainerId} 
                onChange={(value) => {
                  setSelectedTrainerId(value);
                  // Update the form field value
                  const form = document.querySelector('#private-schedule-form');
                  const trainerField = form.querySelector('input[name="trainer_id"]');
                  if (trainerField) {
                    trainerField.value = value;
                  }
                }}
                options={[
                  { value: '', label: trainers.length === 0 ? 'Loading trainers...' : 'Pilih Trainer' },
                  ...trainers.map((trainer) => ({
                    value: trainer.id,
                    label: trainer.title
                  }))
                ]}
                searchable={true}
                variant="soft"
                className="flex-1"
                  required
                disabled={trainers.length === 0}
              />
            </div>



            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Date *
              </label>
              <Input
                name="date_start"
                type="date"
                variant="soft"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Time *
              </label>
              <div className="flex gap-2 flex-1">
                <Input
                name="time_start"
                type="time"
                  variant="soft"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                required
                  className="flex-1"
                />
                <Input
                name="time_end"
                type="time"
                  variant="soft"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                required
                  className="flex-1"
              />
              </div>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Min Signup (Max 2) *
              </label>
              <Input
                name="min_signup"
                type="number"
                min="1"
                max="2"
                variant="soft"
                value={minSignup}
                onChange={(e) => setMinSignup(parseInt(e.target.value) || 1)}
                required
                className="flex-1"
              />
            </div>

            {/* Repeat Settings - Only show when creating new schedule */}
            {!selectedSchedule && (
              <>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Does it repeat?
              </label>
              <Dropdown
                name="repeat_type"
                value={repeatType}
                onChange={(value) => {
                  setRepeatType(value);
                  if (value !== 'weekly') {
                    setSelectedRepeatDays([]);
                  }
                }}
                options={[
                  { value: 'none', label: 'No Repeat' },
                  { value: 'weekly', label: 'Weekly' },
                ]}
                variant="soft"
                className="flex-1"
              />
            </div>

            {/* Repeat Days for Weekly - Only show if weekly is selected */}
            {repeatType === 'weekly' && (
              <div className="flex items-start gap-3">
                <div className="flex-1">
              <div className="grid grid-cols-7 gap-1">
                {[
                  { value: 0, label: 'Sun' },
                  { value: 1, label: 'Mon' },
                  { value: 2, label: 'Tue' },
                  { value: 3, label: 'Wed' },
                  { value: 4, label: 'Thu' },
                  { value: 5, label: 'Fri' },
                  { value: 6, label: 'Sat' }
                ].map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => {
                      if (selectedRepeatDays.includes(day.value)) {
                        setSelectedRepeatDays(selectedRepeatDays.filter(d => d !== day.value));
                      } else {
                        setSelectedRepeatDays([...selectedRepeatDays, day.value]);
                      }
                    }}
                    className={`p-2 text-xs font-medium rounded border transition-colors ${
                      selectedRepeatDays.includes(day.value)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
                </div>
            </div>
            )}

            {/* Schedule Until - Only show if weekly is selected */}
            {repeatType === 'weekly' && (
              <div className="flex items-center gap-3 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                  Schedule Until
                </label>
                <Input
                  name="schedule_until"
                  type="date"
                  variant="soft"
                  value={scheduleUntil}
                  onChange={(e) => setScheduleUntil(e.target.value)}
                  className="flex-1"
                />
                  </div>
                )}
              </>
            )}

            {/* Show repeat info when editing */}
            {selectedSchedule && (
              <div className="flex items-center gap-3 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                  Repeat Settings
                </label>
                <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900">
                  {selectedSchedule.repeat_type === 'none' ? 'No Repeat' : 
                   selectedSchedule.repeat_type === 'weekly' ? 
                   `Weekly on ${selectedSchedule.repeat_days?.map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ')}` : 
                   selectedSchedule.repeat_type}
                </div>
              </div>
            )}

            <h3 className="text-md font-semibold mb-4 mt-4 flex items-center gap-3 md:col-span-2">
              Other Information
            </h3>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Booking Deadline (H)*
              </label>
              <Input
                name="booking_deadline_hour"
                type="number"
                min="0"
                variant="soft"
                value={bookingDeadlineHour}
                onChange={(e) => setBookingDeadlineHour(parseInt(e.target.value) || 0)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Waitlist Lock Period (M)*
              </label>
              <Input
                name="waitlist_lock_minutes"
                type="number"
                min="0"
                variant="soft"
                value={waitlistLockMinutes}
                onChange={(e) => setWaitlistLockMinutes(parseInt(e.target.value) || 0)}
                className="flex-1"
              />
            </div>

            <h3 className="text-md font-semibold mb-4 mt-4">
              Cancel Rule
            </h3>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Cancel Buffer *
              </label>
              <Input
                name="cancel_buffer_minutes"
                type="number"
                min="0"
                variant="soft"
                value={cancelBufferMinutes}
                onChange={(e) => setCancelBufferMinutes(parseInt(e.target.value) || 0)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Picture
              </label>
              <div className="flex-1">
                <FileInput
                  name="picture"
                  accept="image/*"
                  value={selectedImage}
                  onChange={(file) => {
                    if (file) {
                      // Validate file size (max 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        showToast('File terlalu besar. Maksimal 5MB', 'error');
                        setSelectedImage(null);
                        setImagePreview(null);
                        return;
                      }
                      // Validate file type
                      if (!file.type.startsWith('image/')) {
                        showToast('File harus berupa gambar', 'error');
                        setSelectedImage(null);
                        setImagePreview(null);
                        return;
                      }
                      
                      // Set selected image and create preview
                      setSelectedImage(file);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setImagePreview(e.target.result);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }
                  }}
                  variant="soft"
                  placeholder="Choose image file"
                  maxSize={5 * 1024 * 1024} // 5MB
                  allowedTypes={['image/']}
                  showPreview={true}
                  className="flex-1"
                />
                
                {/* Image Preview for existing image */}
                {!imagePreview && selectedSchedule?.picture && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img
                        src={selectedSchedule.picture}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Member List Table */}
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-4">
            Member List
          </h3>
          
          {/* Search Input */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={selectedMemberId ? memberOptions.find(m => m.id === selectedMemberId)?.full_name || '' : memberSearch}
                onChange={(e) => {
                  setMemberSearch(e.target.value);
                  setSelectedMemberId(''); // Clear selection when user types
                }}
                placeholder={selectedMemberId ? "Member selected" : "Search your member username"}
                className={`block w-full pl-10 pr-10 py-2 border rounded-lg leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm ${
                  selectedMemberId 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-gray-300 bg-white'
                }`}
                readOnly={selectedMemberId ? true : false}
              />
              {selectedMemberId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMemberId('');
                    setMemberSearch('');
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            <Table
              columns={[
                { 
                  key: 'member_info', 
                  header: 'Member Info', 
                  span: 6,
                  render: (v, r) => (
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium text-gray-900">{r.full_name}</div>
                        <div className="text-xs text-gray-500">
                          {r.phone_number}
                        </div>
                      </div>
                    </div>
                  )
                },
                { 
                  key: 'session_left', 
                  header: 'Session Left', 
                  span: 4,
                                      render: (v, r) => (
                      <div className="text-sm">
                        {r.session_details?.private_sessions?.remaining ? (
                          <>
                            <span className="font-medium text-green-600">
                              {r.session_details.private_sessions.remaining}
                            </span>
                            <span className="text-gray-500 ml-1">sesi</span>
                          </>
                        ) : (
                          <span className="text-red-500 font-medium">Tidak ada sesi</span>
                        )}
                      </div>
                    )
                },
                { 
                  key: 'select', 
                  span: 2, 
                  render: (v, r) => (
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          // Only allow selection if member has private sessions
                          if (!r.session_details?.private_sessions?.remaining) {
                            return;
                          }
                          
                          if (selectedMemberId === r.id) {
                            // Unselect if already selected
                            setSelectedMemberId('');
                            setMemberSearch('');
                          } else {
                            // Select new member
                            setSelectedMemberId(r.id);
                            setMemberSearch(r.full_name);
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedMemberId === r.id
                            ? 'bg-primary text-white hover:bg-primary/80 border-primary border-2'
                            : r.session_details?.private_sessions?.remaining
                              ? 'bg-gray-100 border border-primary border-2 text-primary hover:bg-primary hover:text-white'
                              : 'bg-gray-300 border border-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!r.session_details?.private_sessions?.remaining}
                      >
                        {selectedMemberId === r.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  )
                }
              ]}
              data={memberOptions.map((member) => ({
                ...member,
                member_info: '',
                email: '',
                session_left: '',
                select: ''
              }))}
              loading={memberLoading}
              emptyMessage="Tidak ada member ditemukan"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => {
              setSelectedImage(null);
              setImagePreview(null);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            loading={loading}
            disabled={loading}
            onClick={handleFormSubmit}
          >
            {selectedSchedule ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>

      {/* Manage Class Modal */}
      <ManageClassModal
        isOpen={isManageClassOpen}
        onClose={() => setIsManageClassOpen(false)}
        classes={classes}
        onClassCreated={onClassCreated}
      />

    </div>
  );
};

export default PrivateScheduleForm; 