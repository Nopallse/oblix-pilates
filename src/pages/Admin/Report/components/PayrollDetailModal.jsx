import React from 'react';
import { Button, Table } from '@components/ui';

const PayrollDetailModal = ({ 
  isOpen, 
  onClose, 
  payrollDetail 
}) => {
  if (!isOpen || !payrollDetail) return null;

  const { instructor, summary, class_details } = payrollDetail;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-primary bg-opacity-20 -m-6 p-6 rounded mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-primary font-semibold">
              Payroll Detail
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Summary Information */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-4">Summary Information</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Instructor Name
              </label>
              <div className="flex-1 px-3 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
                {instructor?.name || 'N/A'}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Total Class
              </label>
              <div className="flex-1 px-3 py-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                {summary?.total_class || '0'}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Total Member
              </label>
              <div className="flex-1 px-3 py-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                {summary?.total_member || '0'}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Payroll Date
              </label>
              <div className="flex-1 px-3 py-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                {summary?.payroll_date || 'N/A'}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 min-w-[120px]">
                Total Salary
              </label>
              <div className="flex-1 px-3 py-3 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700">
                Rp{summary?.total_salary?.toLocaleString() || '0'}
              </div>
            </div>
          </div>
        </div>

        {/* Class Breakdown */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-4">Class Breakdown</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl ">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {summary?.class_breakdown?.group || 0}
                </div>
                <div className="text-sm text-secondary font-medium">Group Class</div>
                <div className="text-xs text-secondary mt-1">
                  Rp{(summary?.rates?.group_class || 0).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-2xl ">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {summary?.class_breakdown?.semi_private || 0}
                </div>
                <div className="text-sm text-secondary font-medium">Semi Private</div>
                <div className="text-xs text-secondary mt-1">
                  Rp{(summary?.rates?.semi_private_class || 0).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-2xl ">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {summary?.class_breakdown?.private || 0}
                </div>
                <div className="text-sm text-secondary font-medium">Private Class</div>
                <div className="text-xs text-secondary mt-1">
                  Rp{(summary?.rates?.private_class || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Class Table */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3">Detail Class</h4>
          <div className="max-h-60 overflow-y-auto">
            <Table
              columns={[
                {
                  key: 'no',
                  header: 'No',
                  span: 1,
                  render: (v) => (
                    <div className="text-sm text-gray-900">{v}</div>
                  )
                },
                {
                  key: 'class_date',
                  header: 'Class Date',
                  span: 2,
                  render: (v) => (
                    <div className="text-sm text-gray-900">{v}</div>
                  )
                },
                {
                  key: 'time',
                  header: 'Time',
                  span: 3,
                  render: (v) => (
                    <div className="text-sm text-gray-900">{v}</div>
                  )
                },
                {
                  key: 'course',
                  header: 'Course',
                  span: 3,
                  render: (v) => (
                    <div className="text-sm text-gray-900">{v}</div>
                  )
                },
                {
                  key: 'spot',
                  header: 'Spot',
                  span: 2,
                  render: (v) => (
                    <div className="text-sm text-gray-900">{v}</div>
                  )
                }
              ]}
              data={class_details?.map((item, index) => ({
                ...item,
                no: index + 1
              })) || []}
              loading={false}
              emptyMessage="Tidak ada data class detail."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetailModal; 