import React from 'react';
import { Link } from 'react-router-dom';
import { useMyPackage } from './api';
import { Button } from '@components/ui';
import Table from '@components/ui/Table/Table';
import Loading from '@components/ui/Loading/Loading';

const MyPackage = () => {
  const {
    data,
    loading,
    error,
    loadMyPackages,
    getInvoiceDetail,
    clearError
  } = useMyPackage();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Table columns configuration
  const tableColumns = [
    { key: 'no', header: 'No', span: 1 },
    { key: 'invoice_number', header: 'No Invoice', span: 2 },
    { key: 'payment_date', header: 'Payment Date', span: 2 },
    { key: 'expired_date', header: 'Expired Date', span: 2 },
    { key: 'package_name', header: 'Package', span: 2 },
    { key: 'session_count', header: 'Session', span: 1 },
    { key: 'price', header: 'Price', span: 1 },
    { 
      key: 'action', 
      header: 'Action', 
      span: 1,
      render: (value, row) => (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={async () => {
            try {
              const response = await getInvoiceDetail(row.invoice_number);
              if (response.success) {
                // Handle view invoice - bisa redirect ke halaman invoice detail
                console.log('Invoice detail:', response.data);
                // TODO: Implement invoice detail view
              }
            } catch (err) {
              console.error('Error fetching invoice detail:', err);
            }
          }}
        >
          View Invoice
        </Button>
      )
    }
  ];

  // Transform data for table
  const tableData = data?.package_history?.map(item => ({
    ...item,
    payment_date: formatDateTime(item.payment_date),
    expired_date: formatDate(item.expired_date),
    price: formatPrice(item.price)
  })) || [];

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
          variant="secondary" 
          onClick={loadMyPackages}
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Package
          </h1>
          <p className="mt-2 text-gray-600">
            Track your current package and view your purchase history.
          </p>
        </div>

        {/* Current Package and Buy New Package */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Current Active Package */}
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Package</h2>
            {data?.current_active_package ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {data.current_active_package.package_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      valid until {formatDate(data.current_active_package.validity_until)}
                    </p>
                  </div>
                </div>

                {/* Group Classes Progress */}
                {data.current_active_package.session_group_classes.total > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Session Private Classes</span>
                      <span className="font-medium">
                        {data.current_active_package.session_group_classes.used} of {data.current_active_package.session_group_classes.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${data.current_active_package.session_group_classes.progress_percentage}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Private Classes Progress */}
                {data.current_active_package.session_semi_private_classes.total > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Session Private Classes</span>
                      <span className="font-medium">
                        {data.current_active_package.session_semi_private_classes.used} of {data.current_active_package.session_semi_private_classes.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${data.current_active_package.session_semi_private_classes.progress_percentage}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                {/* Private Classes Progress */}
                {data.current_active_package.session_private_classes.total > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Session Private Classes</span>
                      <span className="font-medium">
                        {data.current_active_package.session_private_classes.used} of {data.current_active_package.session_private_classes.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${data.current_active_package.session_private_classes.progress_percentage}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Kamu belum memiliki paket aktif yang pernah digunakan.</p>
                <Link to="/schedule">
                  <Button variant="primary">
                    Jadwalkan Sesi Pertamamu
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Buy New Package */}
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Get More Packages</h2>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Explore our packages and find the perfect fit for your Pilates journey
              </p>
              <Link to="/buy-package">
                <Button variant="primary">
                  Buy New Package
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Package History */}
        <Table 
          columns={tableColumns}
          data={tableData}
          emptyMessage="No package history found"
        />
      </div>
    </div>
  );
};

export default MyPackage; 