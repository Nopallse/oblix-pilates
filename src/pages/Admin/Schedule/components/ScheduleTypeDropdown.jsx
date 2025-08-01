import React from 'react';
import { Button } from '@components/ui';

const ScheduleTypeDropdown = ({ isOpen, onClose, onSelectType }) => {
  const scheduleTypes = [
    { value: 'group', label: 'Group', description: 'Kelas group dengan banyak participants' },
    { value: 'semi_private', label: 'Semi Private', description: 'Kelas semi private dengan 2-3 participants' },
    { value: 'private', label: 'Private', description: 'Kelas private dengan 1 participant' }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="bg-white rounded-lg w-full max-w-md"
      style={{
        animation: 'slideIn 0.3s ease-out'
      }}
      onClick={(e) => e.stopPropagation()}
    >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pilih Tipe Schedule</h3>
          <p className="text-sm text-gray-600 mt-1">Pilih kategori schedule yang ingin dibuat</p>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-3">
            {scheduleTypes.map((type) => (
              <div
                key={type.value}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  onSelectType(type.value);
                  onClose();
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{type.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
  );
};

export default ScheduleTypeDropdown; 