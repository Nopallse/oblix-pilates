import React, { useEffect, useState } from 'react';
import { Button, Table } from '@components/ui';
import { icons } from '@shared/utils/assets';
import { useDashboard } from './api';
import { useNavigate } from 'react-router-dom';
import { useApiToast } from '@shared/hooks';

const Dashboard = () => {
  const { dashboardData, loading, error, fetchDashboard } = useDashboard();
  const navigate = useNavigate();
  const { showToast } = useApiToast();
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [actionType, setActionType] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format status
  const formatStatus = (status) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Aktif
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Tidak Aktif
      </span>
    );
  };

  // Handle action button click
  const handleActionClick = (classData, action) => {
    setSelectedClass(classData);
    setActionType(action);
    setShowActionModal(true);
  };

  // Handle action confirmation
  const handleActionConfirm = async () => {
    if (!selectedClass) return;

    try {
      switch (actionType) {
        case 'view':
          // Navigate to schedule page with class ID
          navigate(`/admin/schedule?classId=${selectedClass.id}`);
          showToast('Mengalihkan ke halaman detail', 'info');
          break;
        case 'edit':
          // Navigate to schedule page with edit parameters
          navigate(`/admin/schedule?editId=${selectedClass.id}&type=${selectedClass.schedule_type || 'group'}`);
          showToast('Mengalihkan ke halaman edit', 'info');
          break;
        case 'cancel':
          // Handle cancel logic
          console.log('Cancelling class:', selectedClass.id);
          // TODO: Implement cancel API call
          // await cancelClassAPI(selectedClass.id);
          showToast('Kelas berhasil dibatalkan', 'success');
          // fetchDashboard(); // Refresh data
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error handling action:', error);
      showToast('Terjadi kesalahan saat memproses aksi', 'error');
    } finally {
      setShowActionModal(false);
      setSelectedClass(null);
      setActionType('');
    }
  };

  // Handle action cancel
  const handleActionCancel = () => {
    setShowActionModal(false);
    setSelectedClass(null);
    setActionType('');
  };

  // Get action button
  const getActionButton = (classData) => {
    const isOpen = openDropdownId === classData.id;
    
    return (
      <div className="relative dropdown-container">
        <button 
          className="p-1 hover:bg-gray-100 rounded-full"
          onClick={() => setOpenDropdownId(isOpen ? null : classData.id)}
        >
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
            <div className="py-1">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleActionClick(classData, 'view');
                  setOpenDropdownId(null);
                }}
              >
                View Bookings
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleActionClick(classData, 'edit');
                  setOpenDropdownId(null);
                }}
              >
                Edit Class
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => {
                  handleActionClick(classData, 'cancel');
                  setOpenDropdownId(null);
                }}
              >
                Cancel Class
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Columns configuration for today classes table
  const columns = [
    { 
      key: 'no', 
      header: 'No', 
      span: 1, 
      render: (v, r, i) => <span>{v}</span>, 
      className: 'text-center w-12' 
    },
    { 
      key: 'class_date', 
      header: 'Class Date', 
      span: 2, 
      render: v => <span className="font-medium text-gray-900">{v}</span> 
    },
    { 
      key: 'time', 
      header: 'Time', 
      span: 2, 
      render: v => <span>{v}</span> 
    },
    { 
      key: 'course', 
      header: 'Course', 
      span: 2, 
      render: v => <span>{v}</span> 
    },
    { 
      key: 'coach', 
      header: 'Coach', 
      span: 2, 
      render: v => <span>{v}</span> 
    },
    { 
      key: 'pax', 
      header: 'Pax', 
      span: 1, 
      render: v => <span className="text-center">{v}</span>,
      className: 'text-center'
    },
    {
      key: 'actions',
      header: '',
      span: 2,
      render: (v, r) => getActionButton(r)
    }
  ];

  // Transform data for table
  const tableData = dashboardData?.today_classes?.map((item) => ({
    ...item,
    actions: '',
  })) || [];

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary rounded-2xl p-10 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Member</p>
                <p className="text-3xl font-bold">{dashboardData?.metrics?.total_members || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-10 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Class</p>
                <p className="text-3xl font-bold">{dashboardData?.metrics?.total_classes || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-10 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Revenue</p>
                <p className="text-3xl font-bold">{formatCurrency(dashboardData?.metrics?.total_revenue || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today Classes Table */}
        <div className="bg-white rounded-lg w-full">
          <div className=" py-4 ">
            <h2 className="text-lg font-semibold text-gray-900">Today Classes</h2>
          </div>
          <Table
            columns={columns}
            data={tableData}
            loading={loading}
            emptyMessage="Tidak ada kelas hari ini."
          />
        </div>

        {/* Action Modal */}
        {showActionModal && selectedClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {actionType === 'view' && 'View Class Details'}
                    {actionType === 'edit' && 'Edit Class'}
                    {actionType === 'cancel' && 'Cancel Class'}
                  </h3>
                  <button
                    onClick={handleActionCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {selectedClass.course}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Date:</span>
                        <p className="text-gray-900">{selectedClass.class_date}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Time:</span>
                        <p className="text-gray-900">{selectedClass.time}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Coach:</span>
                        <p className="text-gray-900">{selectedClass.coach}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Pax:</span>
                        <p className="text-gray-900">{selectedClass.pax}</p>
                      </div>
                    </div>
                  </div>

                  {actionType === 'cancel' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Konfirmasi Pembatalan
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              Apakah Anda yakin ingin membatalkan kelas ini? Tindakan ini tidak dapat dibatalkan.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  size="medium"
                  onClick={handleActionCancel}
                >
                  Batal
                </Button>
                <Button
                  variant={actionType === 'cancel' ? 'danger' : 'primary'}
                  size="medium"
                  onClick={handleActionConfirm}
                >
                  {actionType === 'view' && 'Lihat Detail'}
                  {actionType === 'edit' && 'Edit Kelas'}
                  {actionType === 'cancel' && 'Ya, Batalkan'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 