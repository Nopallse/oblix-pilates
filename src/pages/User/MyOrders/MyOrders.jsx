import React, { useState } from 'react';
import { useMyOrders } from './api';
import { Button } from '@components/ui';
import Table from '@components/ui/Table/Table';
import Loading from '@components/ui/Loading/Loading';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const {
    data,
    loading,
    error,
    loadMyOrders,
    getOrderDetail,
    clearError
  } = useMyOrders();

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');

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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'Processing' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' },
      expired: { color: 'bg-orange-100 text-orange-800', label: 'Expired' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Table columns configuration
  const tableColumns = [
    { 
      key: 'order_number', 
      header: 'Order Number', 
      span: 2,
      render: (v) => (
        <div className="font-medium text-gray-900">{v}</div>
      )
    },
    { 
      key: 'package_name', 
      header: 'Package Name', 
      span: 2,
      render: (v, row) => (
        <div>
          <div className="font-medium text-gray-900">{v}</div>
          <div className="text-sm text-gray-500 capitalize">{row.package_type}</div>
        </div>
      )
    },
    { 
      key: 'total_amount', 
      header: 'Total Amount', 
      span: 2,
      render: (v) => (
        <div className="font-medium text-gray-900">{formatPrice(v)}</div>
      )
    },
    { 
      key: 'status', 
      header: 'Order Status', 
      span: 1,
      render: (v) => getStatusBadge(v)
    },
    { 
      key: 'payment_status', 
      header: 'Payment Status', 
      span: 1,
      render: (v) => getPaymentStatusBadge(v)
    },
    { 
      key: 'created_at', 
      header: 'Order Date', 
      span: 1,
      render: (v) => <span className="text-sm text-gray-900">{formatDate(v)}</span>
    },
    { 
      key: 'expired_at', 
      header: 'Expired Date', 
      span: 1,
      render: (v) => <span className="text-sm text-gray-900">{formatDate(v)}</span>
    },
    { 
      key: 'actions', 
      header: '', 
      span: 1,
      render: (v, row) => (
        <div className="flex justify-end">
          <Link
            to={`/my-orders/${row.id}`}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View Detail
          </Link>
        </div>
      )
    }
  ];

  // Transform data for table
  const tableData = data?.orders || [];

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    loadMyOrders({ status });
  };

  const handlePaymentStatusFilter = (paymentStatus) => {
    setSelectedPaymentStatus(paymentStatus);
    loadMyOrders({ payment_status: paymentStatus });
  };

  const handleClearFilters = () => {
    setSelectedStatus('');
    setSelectedPaymentStatus('');
    loadMyOrders();
  };

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
              onClick={loadMyOrders}
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
            My Orders
          </h1>
          <p className="mt-2 text-gray-600">
            Track your order history and payment status.
          </p>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h3>
            <div className="text-2xl font-bold text-gray-900">
              {data?.pagination?.totalItems || 0}
            </div>
            <div className="text-sm text-gray-500">
              All time orders
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Orders</h3>
            <div className="text-2xl font-bold text-gray-900">
              {tableData.filter(order => order.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">
              Awaiting processing
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Completed Orders</h3>
            <div className="text-2xl font-bold text-gray-900">
              {tableData.filter(order => order.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">
              Successfully processed
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Paid Orders</h3>
            <div className="text-2xl font-bold text-gray-900">
              {tableData.filter(order => order.payment_status === 'paid').length}
            </div>
            <div className="text-sm text-gray-500">
              Payment completed
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Order Status:</span>
            <button
              onClick={() => handleStatusFilter('')}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === '' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilter('pending')}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === 'pending' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => handleStatusFilter('completed')}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === 'completed' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleStatusFilter('cancelled')}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === 'cancelled' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelled
            </button>
          </div>

        </div>

        {/* Orders Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
        </div>
        
        <Table 
          columns={tableColumns}
          data={tableData}
          emptyMessage="No orders found"
        />
      </div>
    </div>
  );
};

export default MyOrders; 