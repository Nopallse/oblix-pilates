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
    { 
      key: 'no', 
      header: 'No', 
      span: 1,
      render: (v) => <span className="text-sm text-gray-900">{v}</span>
    },
    { 
      key: 'package_name', 
      header: 'Package Name', 
      span: 2,
      render: (v) => (
        <div className="font-medium text-gray-900">{v}</div>
      )
    },
    { 
      key: 'package_type', 
      header: 'Package Type', 
      span: 2,
      render: (v) => (
        <div className="text-sm text-gray-500 capitalize">{v}</div>
      )
    },
    { 
      key: 'start_date', 
      header: 'Start Date', 
      span: 2,
      render: (v) => <span className="text-sm text-gray-900">{formatDate(v)}</span>
    },
    { 
      key: 'expired_date', 
      header: 'Expired Date', 
      span: 2,
      render: (v) => <span className="text-sm text-gray-900">{formatDate(v)}</span>
    },
    { 
      key: 'group_sessions', 
      header: 'Group', 
      span: 1,
      render: (v, row) => {
        const sessions = row.group_sessions;
        return (
          <div className="text-sm text-gray-900">
            {sessions.used}/{sessions.total} <span className="text-xs text-gray-500"></span>
          </div>
        );
      }
    },
    { 
      key: 'semi_private_sessions', 
      header: 'Semi-Private', 
      span: 1,
      render: (v, row) => {
        const sessions = row.semi_private_sessions;
        return (
          <div className="text-sm text-gray-900">
            {sessions.used}/{sessions.total} <span className="text-xs text-gray-500"></span>
          </div>
        );
      }
    },
    { 
      key: 'private_sessions', 
      header: 'Private', 
      span: 1,
      render: (v, row) => {
        const sessions = row.private_sessions;
        return (
          <div className="text-sm text-gray-900">
            {sessions.used}/{sessions.total} <span className="text-xs text-gray-500"></span>
          </div>
        );
      }
    }
  ];

  // Transform data for table
  const tableData = data?.active_package || [];

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

        {/* Current Package Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Group Sessions</h3>
            <div className="text-2xl font-bold text-gray-900">
              {data?.group_sessions?.total || 0}
            </div>
            <div className="text-sm text-gray-500">
              {data?.group_sessions?.used || 0} used, {data?.group_sessions?.remaining || 0} remaining
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Semi Private</h3>
            <div className="text-2xl font-bold text-gray-900">
              {data?.semi_private_sessions?.total || 0}
            </div>
            <div className="text-sm text-gray-500">
              {data?.semi_private_sessions?.used || 0} used, {data?.semi_private_sessions?.remaining || 0} remaining
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Private Sessions</h3>
            <div className="text-2xl font-bold text-gray-900">
              {data?.private_sessions?.total || 0}
            </div>
            <div className="text-sm text-gray-500">
              {data?.private_sessions?.used || 0} used, {data?.private_sessions?.remaining || 0} remaining
            </div>
          </div>

          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Get More Packages</h2>
              <Link to="/buy-package">
                  <Button variant="primary">
                    Buy New Package
                  </Button>
                </Link>
          </div>

          
        </div>

        

        {/* Package History */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Active</h2>
        </div>
        
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