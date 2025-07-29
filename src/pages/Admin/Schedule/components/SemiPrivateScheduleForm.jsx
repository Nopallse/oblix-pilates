import React, { useState, useEffect } from 'react';
import { Button } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';

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
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [newClassData, setNewClassData] = useState({
    class_name: '',
    color_sign: '#FF6B6B'
  });
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);
  const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  // Initialize selectedRepeatDays from selectedSchedule
  useEffect(() => {
    if (selectedSchedule?.repeat_days) {
      setSelectedRepeatDays(selectedSchedule.repeat_days);
    } else {
      setSelectedRepeatDays([]);
    }
  }, [selectedSchedule]);

  if (!isOpen) return null;

  const handleCreateClass = async () => {
    try {
      let response;
      
      if (isEditingClass && editingClassId) {
        // Update existing class
        response = await apiClient.put(`/api/class/${editingClassId}`, newClassData);
      } else {
        // Create new class
        response = await apiClient.post('/api/class', newClassData);
      }
      
      if (response.success) {
        // Don't show toast here as API might already show one
        setIsCreateClassOpen(false);
        setNewClassData({ class_name: '', color_sign: '#FF6B6B' });
        setIsEditingClass(false);
        setEditingClassId(null);
        // Refresh classes list
        if (onClassCreated) {
          onClassCreated();
        }
      } else {
        showToast(
          isEditingClass ? 'Gagal mengupdate class' : 'Gagal membuat class', 
          'error'
        );
      }
    } catch (error) {
      showToast(
        isEditingClass ? 'Gagal mengupdate class' : 'Gagal membuat class', 
        'error'
      );
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran file terlalu besar. Maksimal 5MB', 'error');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showToast('Tipe file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP', 'error');
        return;
      }
      
      setSelectedPicture(file);
    }
  };

  const handleFormSubmit = async () => {
    // Get form data
    const form = document.querySelector('#semi-private-schedule-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const class_id = formData.get('class_id');
    const trainer_id = formData.get('trainer_id');
    const date_start = formData.get('date_start');
    const time_start = formData.get('time_start');
    const time_end = formData.get('time_end');
    const pax = formData.get('pax');
    const booking_deadline_hour = formData.get('booking_deadline_hour');
    const waitlist_lock_minutes = formData.get('waitlist_lock_minutes');
    const min_signup = formData.get('min_signup');
    const cancel_buffer_minutes = formData.get('cancel_buffer_minutes');
    
    if (!class_id || !trainer_id || !date_start || !time_start || !time_end || !pax || 
        !booking_deadline_hour || !waitlist_lock_minutes || !min_signup || !cancel_buffer_minutes) {
      showToast('Mohon lengkapi field yang wajib diisi', 'error');
      return;
    }

    // Validate pax for semi-private (max 20)
    if (parseInt(pax) > 20) {
      showToast('Maksimal peserta untuk semi-private adalah 20', 'error');
      return;
    }

    // Validate repeat_days for weekly repeat
    const repeatType = formData.get('repeat_type');
    if (repeatType === 'weekly' && selectedRepeatDays.length === 0) {
      showToast('Mohon pilih hari untuk repeat weekly', 'error');
      return;
    }

    // Validate schedule_until for weekly repeat
    if (repeatType === 'weekly' && !formData.get('schedule_until')) {
      showToast('Schedule until wajib diisi untuk repeat weekly', 'error');
      return;
    }
    
    const data = {
      class_id: class_id,
      trainer_id: trainer_id,
      pax: parseInt(pax),
      date_start: date_start,
      time_start: time_start,
      time_end: time_end,
      repeat_type: formData.get('repeat_type'),
      repeat_days: formData.get('repeat_type') === 'weekly' ? selectedRepeatDays : [],
      schedule_until: formData.get('schedule_until') || null,
      booking_deadline_hour: parseInt(booking_deadline_hour),
      waitlist_lock_minutes: parseInt(waitlist_lock_minutes),
      min_signup: parseInt(min_signup),
      cancel_buffer_minutes: parseInt(cancel_buffer_minutes)
    };

    // Add picture if selected
    if (selectedPicture) {
      data.picture = selectedPicture;
    }
    
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {selectedSchedule ? 'Edit Semi-Private Schedule' : 'Add Semi-Private Schedule'}
        </h3>
        
        <form id="semi-private-schedule-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class *
              </label>
              <div className="flex gap-2">
                <select
                  name="class_id"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={selectedSchedule?.class_id || ''}
                  required
                  disabled={classes.length === 0}
                >
                  <option value="">{classes.length === 0 ? 'Loading classes...' : 'Pilih Class'}</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id} selected={cls.class_name === selectedSchedule?.class_name}>
                      {cls.class_name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setNewClassData({ class_name: '', color_sign: '#FF6B6B' });
                    setIsEditingClass(false);
                    setEditingClassId(null);
                    setIsCreateClassOpen(true);
                  }}
                  className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm font-medium"
                  title="Tambah Class Baru"
                >
                  + Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const selectedClassId = document.querySelector('select[name="class_id"]').value;
                    if (selectedClassId) {
                      const selectedClass = classes.find(cls => cls.id === selectedClassId);
                      if (selectedClass) {
                        setNewClassData({
                          class_name: selectedClass.class_name,
                          color_sign: selectedClass.color_sign || '#FF6B6B'
                        });
                        setIsEditingClass(true);
                        setEditingClassId(selectedClassId);
                        setIsCreateClassOpen(true);
                      }
                    } else {
                      showToast('Pilih class terlebih dahulu untuk edit', 'error');
                    }
                  }}
                  className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
                  title="Edit Class Terpilih"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trainer *
              </label>
              <select
                name="trainer_id"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.trainer_id || ''}
                required
                disabled={trainers.length === 0}
              >
                <option value="">{trainers.length === 0 ? 'Loading trainers...' : 'Pilih Trainer'}</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id} selected={trainer.title === selectedSchedule?.trainer_name}>
                    {trainer.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Start *
              </label>
              <input
                name="date_start"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.date_start || ''}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Start *
              </label>
              <input
                name="time_start"
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.time_start?.slice(0, 5) || '07:30'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time End *
              </label>
              <input
                name="time_end"
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.time_end?.slice(0, 5) || '08:30'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pax (Max Participants) * <span className="text-xs text-gray-500">(Max 20)</span>
              </label>
              <input
                name="pax"
                type="number"
                min="1"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.max_capacity || selectedSchedule?.pax || 10}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeat Type
              </label>
              <select
                name="repeat_type"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.repeat_type || 'none'}
                onChange={(e) => {
                  if (e.target.value !== 'weekly') {
                    setSelectedRepeatDays([]);
                  }
                }}
              >
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Repeat Days for Weekly */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeat Days (Weekly Only)
              </label>
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
              <p className="text-xs text-gray-500 mt-1">
                Pilih hari untuk repeat weekly (0=Sunday, 1=Monday, dst)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Until
              </label>
              <input
                name="schedule_until"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.schedule_until || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Deadline (Hours) *
              </label>
              <input
                name="booking_deadline_hour"
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.booking_deadline_hour || 24}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waitlist Lock (Minutes) *
              </label>
              <input
                name="waitlist_lock_minutes"
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.waitlist_lock_minutes || 30}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Signup *
              </label>
              <input
                name="min_signup"
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.min_signup || 1}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancel Buffer (Minutes) *
              </label>
              <input
                name="cancel_buffer_minutes"
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedSchedule?.cancel_buffer_minutes || 60}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Picture (Optional)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handlePictureChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, GIF, WebP. Maksimal 5MB
              </p>
              {selectedPicture && (
                <p className="text-xs text-green-600 mt-1">
                  File dipilih: {selectedPicture.name}
                </p>
              )}
            </div>
          </div>
        </form>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            disabled={loading}
            onClick={onClose}
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

      {/* Create/Edit Class Modal */}
      {isCreateClassOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {isEditingClass ? 'Edit Class' : 'Create New Class'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newClassData.class_name}
                  onChange={(e) => setNewClassData({...newClassData, class_name: e.target.value})}
                  placeholder="Pilates Mat"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Sign *
                </label>
                <input
                  type="color"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newClassData.color_sign}
                  onChange={(e) => setNewClassData({...newClassData, color_sign: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateClassOpen(false);
                  setNewClassData({ class_name: '', color_sign: '#FF6B6B' });
                  setIsEditingClass(false);
                  setEditingClassId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateClass}
                disabled={!newClassData.class_name}
              >
                {isEditingClass ? 'Update Class' : 'Create Class'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemiPrivateScheduleForm; 