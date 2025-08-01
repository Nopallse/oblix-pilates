import React, { useState, useEffect } from 'react';
import { Button, Input, Dropdown, FileInput } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';
import ManageClassModal from './ManageClassModal';
import { icons } from '@shared/utils/assets';

const SemiPrivateScheduleForm = ({ 
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
  const [selectedTrainerId, setSelectedTrainerId] = useState(selectedSchedule?.trainer_id || '');
  
  // Form state for controlled inputs
  const [formData, setFormData] = useState({
    pax: selectedSchedule?.max_capacity || selectedSchedule?.pax || 10,
    date_start: selectedSchedule?.date_start || '',
    time_start: selectedSchedule?.time_start?.slice(0, 5) || '07:30',
    time_end: selectedSchedule?.time_end?.slice(0, 5) || '08:30',
    schedule_until: selectedSchedule?.schedule_until || '',
    booking_deadline_hour: selectedSchedule?.booking_deadline_hour || 24,
    waitlist_lock_minutes: selectedSchedule?.waitlist_lock_minutes || 30,
    min_signup: selectedSchedule?.min_signup || 1,
    cancel_buffer_minutes: selectedSchedule?.cancel_buffer_minutes || 60
  });

  console.log('SemiPrivateScheduleForm props:', { isOpen, selectedSchedule: selectedSchedule?.id });

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
    
    if (selectedSchedule?.trainer_id) {
      setSelectedTrainerId(selectedSchedule.trainer_id);
    } else {
      setSelectedTrainerId('');
    }
    
    // Update form data when selectedSchedule changes
    if (selectedSchedule) {
      setFormData({
        pax: selectedSchedule.max_capacity || selectedSchedule.pax || 10,
        date_start: selectedSchedule.date_start || '',
        time_start: selectedSchedule.time_start?.slice(0, 5) || '07:30',
        time_end: selectedSchedule.time_end?.slice(0, 5) || '08:30',
        schedule_until: selectedSchedule.schedule_until || '',
        booking_deadline_hour: selectedSchedule.booking_deadline_hour || 24,
        waitlist_lock_minutes: selectedSchedule.waitlist_lock_minutes || 30,
        min_signup: selectedSchedule.min_signup || 1,
        cancel_buffer_minutes: selectedSchedule.cancel_buffer_minutes || 60
      });
    }
  }, [selectedSchedule]);

  if (!isOpen) return null;





  const handleFormSubmit = () => {
    // Validate required fields
    const class_id = selectedClassId;
    const trainer_id = selectedTrainerId;
    const date_start = formData.date_start;
    const time_start = formData.time_start;
    const time_end = formData.time_end;
    const pax = formData.pax;
    
    if (!class_id || !trainer_id || !date_start || !time_start || !time_end || !pax) {
      showToast('Mohon lengkapi field yang wajib diisi', 'error');
      return;
    }

    // Validate pax for semi-private (max 20)
    if (parseInt(pax) > 20) {
      showToast('Maksimal peserta untuk semi-private adalah 20', 'error');
      return;
    }

    // Validate repeat_days for weekly repeat (only for new schedules)
    if (!selectedSchedule && repeatType === 'weekly' && selectedRepeatDays.length === 0) {
      showToast('Mohon pilih hari untuk repeat weekly', 'error');
      return;
    }

    // Validate schedule_until for weekly repeat
    if (repeatType === 'weekly' && !formData.schedule_until) {
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
      pax: parseInt(pax),
      date_start: date_start,
      time_start: time_start,
      time_end: time_end,
      ...(selectedSchedule ? {} : {
        repeat_type: repeatType,
        repeat_days: repeatType === 'weekly' ? selectedRepeatDays : [],
        schedule_until: formData.schedule_until || null,
      }),
      booking_deadline_hour: parseInt(formData.booking_deadline_hour),
      waitlist_lock_minutes: parseInt(formData.waitlist_lock_minutes),
      min_signup: parseInt(formData.min_signup),
      cancel_buffer_minutes: parseInt(formData.cancel_buffer_minutes),
      picture: pictureData
    };
    
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-primary bg-opacity-20 -m-6 p-6 rounded mb-4">
          <h3 className="text-lg text-primary font-semibold">
            {selectedSchedule ? 'Edit Semi-Private Schedule' : 'Add Semi-Private Schedule'}
          </h3>
        </div>

        <h3 className="text-md font-semibold mb-4 mt-4">
          Class Information
        </h3>
        
        <form id="semi-private-schedule-form">
          <input type="hidden" name="class_id" value={selectedClassId} />
          <input type="hidden" name="trainer_id" value={selectedTrainerId} />
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
                    const form = document.querySelector('#semi-private-schedule-form');
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
                  const form = document.querySelector('#semi-private-schedule-form');
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
                value={formData.date_start}
                onChange={(e) => setFormData({...formData, date_start: e.target.value})}
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
                  value={formData.time_start}
                  onChange={(e) => setFormData({...formData, time_start: e.target.value})}
                  required
                  className="flex-1"
                />
                <Input
                  name="time_end"
                  type="time"
                  variant="soft"
                  value={formData.time_end}
                  onChange={(e) => setFormData({...formData, time_end: e.target.value})}
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Pax (Max 20) *
              </label>
              <Input
                name="pax"
                type="number"
                min="1"
                max="20"
                variant="soft"
                value={formData.pax}
                onChange={(e) => setFormData({...formData, pax: e.target.value})}
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
                      { value: 'weekly', label: 'Weekly' }
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
                      value={formData.schedule_until}
                      onChange={(e) => setFormData({...formData, schedule_until: e.target.value})}
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
                value={formData.booking_deadline_hour}
                onChange={(e) => setFormData({...formData, booking_deadline_hour: e.target.value})}
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
                value={formData.waitlist_lock_minutes}
                onChange={(e) => setFormData({...formData, waitlist_lock_minutes: e.target.value})}
                className="flex-1"
              />
            </div>

            <h3 className="text-md font-semibold mb-4 mt-4">
              Cancel Rule
            </h3>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Minimum Signup *
              </label>
              <Input
                name="min_signup"
                type="number"
                min="1"
                variant="soft"
                value={formData.min_signup}
                onChange={(e) => setFormData({...formData, min_signup: e.target.value})}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Cancel Buffer *
              </label>
              <Input
                name="cancel_buffer_minutes"
                type="number"
                min="0"
                variant="soft"
                value={formData.cancel_buffer_minutes}
                onChange={(e) => setFormData({...formData, cancel_buffer_minutes: e.target.value})}
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

export default SemiPrivateScheduleForm; 