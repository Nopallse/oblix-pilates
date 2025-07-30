import React, { useEffect, useState } from 'react';
import { icons } from '../../../shared/utils/assets';
import Button from '../../../components/ui/Button/Button';
import Table from '../../../components/ui/Table/Table';
import Modal from '../../../components/ui/Modal/Modal';
import { useMyClasses } from './api';
import { useApiToast } from '../../../shared/hooks/useApiToast';

const MyClasses = () => {
  const {
    classes,
    loading,
    error,
    currentType,
    loadClasses,
    cancelBooking,
    changeType,
  } = useMyClasses();

  const { showToast } = useApiToast();

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    loadClasses(currentType);
    // eslint-disable-next-line
  }, [currentType]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      signup: { label: 'Terdaftar', className: 'bg-green-100 text-green-800' },
      waitlist: { label: 'Waitlist', className: 'bg-yellow-100 text-yellow-800' },
      cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-800' },
      completed: { label: 'Selesai', className: 'bg-blue-100 text-blue-800' }
    };

    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelReason('');
    setShowCancelModal(true);
  };

  // Handle confirm cancel booking
  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    try {
      const result = await cancelBooking(selectedBooking.booking_id, cancelReason || 'User cancelled');
      if (result.success) {
        showToast('Booking berhasil dibatalkan', 'success');
        setShowCancelModal(false);
        setSelectedBooking(null);
        setCancelReason('');
      } else {
        showToast('Gagal membatalkan booking: ' + result.message, 'error');
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
      showToast('Terjadi kesalahan saat membatalkan booking', 'error');
    }
  };

  // Handle see details
  const handleSeeDetails = (booking) => {
    setSelectedDetails(booking);
    setShowDetailsModal(true);
  };

  // Kolom dinamis sesuai tipe
  const getColumnsByType = (type) => {
    const baseColumns = [
      { 
        key: 'no', 
        header: 'No', 
        span: 1, 
        render: (v, r, i) => <span>{i + 1}</span>, 
        className: 'text-center w-12' 
      },
      { 
        key: 'class_date', 
        header: 'Tanggal', 
        span: 2, 
        render: v => <span className="font-medium">{formatDate(v)}</span> 
      },
      { 
        key: 'time', 
        header: 'Waktu', 
        span: 2, 
        render: v => <span>{formatTime(v)}</span> 
      },
      { 
        key: 'course', 
        header: 'Kelas', 
        span: 2, 
        render: v => <span className="font-medium text-gray-900">{v}</span> 
      },
      { 
        key: 'coach', 
        header: 'Coach', 
        span: 2, 
        render: v => <span>{v}</span> 
      },
      { 
        key: 'spot', 
        header: 'Spot', 
        span: 1, 
        render: v => <span className="text-center">{v}</span>, 
        className: 'text-center' 
      },
    ];

    // Tambahkan action column sesuai tipe
    if (type === 'upcoming' || type === 'waitlist') {
      baseColumns.push({
        key: 'actions',
        header: '',
        span: 2,
        render: (v, r) => (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="primary"
              size="small"
              onClick={() => handleCancelBooking(r)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        )
      });
    } else if (type === 'post' || type === 'cancelled') {
      baseColumns.push({
        key: 'actions',
        header: '',
        span: 2,
        render: (v, r) => (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="primary"
              size="small"
              onClick={() => handleSeeDetails(r)}
            >
              See Details
            </Button>
          </div>
        )
      });
    }

    return baseColumns;
  };

  // Tipe kelas
  const classTypes = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'waitlist', label: 'Waitlist' },
    { value: 'post', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const columns = getColumnsByType(currentType);

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">My Classes</h1>
        </div>
        
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          {classTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => changeType(type.value)}
              className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
                currentType === type.value
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg w-full">
          <Table
            columns={columns}
            data={classes}
            loading={loading}
            emptyMessage="Tidak ada kelas yang ditemukan."
          />
        </div>

        {/* Additional Info */}
        {currentType === 'waitlist' && classes.length > 0 && (
          <div className="mt-12 ">
            <p className="text-sm text-secondary italic">
                  *If you're waitlisted, you'll be automatically added up to 120 mins before class if there's space—we’ll notify you either way.
                </p>
          </div>
        )}
      </div>

      {/* Cancel Booking Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedBooking(null);
          setCancelReason('');
        }}
        title="Batalkan Booking"
      >
        <div className="space-y-4">
          {selectedBooking && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Detail Kelas:</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Kelas:</span> {selectedBooking.course}</p>
                <p><span className="font-medium">Tanggal:</span> {formatDate(selectedBooking.class_date)}</p>
                <p><span className="font-medium">Waktu:</span> {formatTime(selectedBooking.time)}</p>
                <p><span className="font-medium">Coach:</span> {selectedBooking.coach}</p>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 mb-2">
              Alasan Pembatalan (Opsional)
            </label>
            <textarea
              id="cancelReason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Masukkan alasan pembatalan (opsional)..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCancelModal(false);
                setSelectedBooking(null);
                setCancelReason('');
              }}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmCancel}
              loading={loading}
            >
              Batalkan Booking
            </Button>
          </div>
        </div>
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedDetails(null);
        }}
        title="Detail Kelas"
      >
        <div className="space-y-4">
          {selectedDetails && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Informasi Kelas</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Kelas:</span>
                    <span className="text-gray-900">{selectedDetails.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Tanggal:</span>
                    <span className="text-gray-900">{formatDate(selectedDetails.class_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Waktu:</span>
                    <span className="text-gray-900">{formatTime(selectedDetails.time)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Coach:</span>
                    <span className="text-gray-900">{selectedDetails.coach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Spot:</span>
                    <span className="text-gray-900">{selectedDetails.spot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span>{getStatusBadge(selectedDetails.status)}</span>
                  </div>
                  {selectedDetails.notes && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Catatan:</span>
                      <span className="text-gray-900">{selectedDetails.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Informasi Booking</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-blue-600">Booking ID:</span>
                    <span className="text-blue-900 font-mono text-xs">{selectedDetails.booking_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-blue-600">Dibuat pada:</span>
                    <span className="text-blue-900">{formatDate(selectedDetails.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-blue-600">Terakhir diupdate:</span>
                    <span className="text-blue-900">{formatDate(selectedDetails.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedDetails(null);
              }}
            >
              Tutup
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyClasses; 