import React, { useState } from 'react';
import { Button, Input, Table, ColorPicker } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';
import { icons } from '@shared/utils/assets';

const ManageClassModal = ({ 
  isOpen, 
  onClose, 
  classes, 
  onClassCreated 
}) => {
  const { showToast } = useApiToast();
  const [newClassData, setNewClassData] = useState({
    class_name: '',
    color_sign: '#FF6B6B'
  });
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);

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
        onClose();
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

  const handleClose = () => {
    setNewClassData({ class_name: '', color_sign: '#FF6B6B' });
    setIsEditingClass(false);
    setEditingClassId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-primary bg-opacity-20 -m-6 p-6 rounded mb-4">
          <h3 className="text-lg text-primary font-semibold">
            Manage Class
          </h3>
        </div>

        {/* Class List */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3">Daftar Class</h4>
          <div className="max-h-60 overflow-y-auto">
            <Table
              columns={[
                { 
                  key: 'class_name', 
                  header: 'Nama Class', 
                  span: 4, 
                  render: (v, r) => (
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{v}</span>
                    </div>
                  )
                },
                { 
                  key: 'color_sign', 
                  header: 'Color Sign', 
                  span: 4, 
                  render: (v) => (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: v || '#FF6B6B' }}
                      />
                    </div>
                  )
                },
                { 
                  key: 'actions', 
                  header: '', 
                  span: 4, 
                  render: (v, r) => (
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded transition-colors duration-200" 
                        title={`Edit ${r.class_name}`}
                        aria-label="Edit"
                        onClick={() => {
                          setNewClassData({
                            class_name: r.class_name,
                            color_sign: r.color_sign || '#FF6B6B'
                          });
                          setIsEditingClass(true);
                          setEditingClassId(r.id);
                        }}
                      >
                        <img src={icons.edit} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 hover:bg-red-50 hover:text-red-600 rounded transition-colors duration-200" 
                        title={`Hapus ${r.class_name}`}
                        aria-label="Delete"
                        onClick={async () => {
                          if (window.confirm(`Yakin ingin menghapus class "${r.class_name}"?`)) {
                            try {
                              const response = await apiClient.delete(`/api/class/${r.id}`);
                              if (response.success) {
                                showToast('Class berhasil dihapus', 'success');
                                if (onClassCreated) {
                                  onClassCreated();
                                }
                              } else {
                                showToast('Gagal menghapus class', 'error');
                              }
                            } catch (error) {
                              showToast('Gagal menghapus class', 'error');
                            }
                          }
                        }}
                      >
                        <img src={icons.delete} alt="Delete" className="w-5 h-5" />
                      </button>
                    </div>
                  )
                }
              ]}
              data={classes.map((cls) => ({
                ...cls,
                actions: ''
              }))}
              loading={false}
              emptyMessage="Belum ada class yang dibuat."
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="border-t pt-4">
          <h4 className="text-md font-semibold mb-3">
            {isEditingClass ? 'Edit Class' : 'Tambah Class Baru'}
          </h4>
          
          <div className="space-y-4">
            <Input
              label="Class Name"
              type="text"
              variant="soft"
              value={newClassData.class_name}
              onChange={(e) => setNewClassData({...newClassData, class_name: e.target.value})}
              placeholder="Pilates Mat"
              required
            />
            
            <ColorPicker
              label="Color Sign"
              value={newClassData.color_sign}
              onChange={(color) => setNewClassData({ ...newClassData, color_sign: color })}
              variant="soft"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            {isEditingClass && (
              <Button
                variant="outline"
                onClick={() => {
                  setNewClassData({ class_name: '', color_sign: '#FF6B6B' });
                  setIsEditingClass(false);
                  setEditingClassId(null);
                }}
              >
                Cancel Edit
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Close
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
    </div>
  );
};

export default ManageClassModal; 