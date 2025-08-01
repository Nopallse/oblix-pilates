import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@components/ui';
import Loading from '@components/ui/Loading/Loading';
import { useMyOrders } from './api';
import { useApiToast } from '@shared/hooks';

const OrderDetail = () => {
  const { id } = useParams();
  const { getOrderDetail, loading, error } = useMyOrders();
  const { showToast } = useApiToast();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (id) {
        const result = await getOrderDetail(id);
        if (result.success) {
          setOrderData(result.data);
        }
      }
    };

    fetchOrderDetail();
  }, [id, getOrderDetail]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
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
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
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
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handlePayment = () => {
    if (orderData?.midtrans?.redirect_url) {
      window.open(orderData.midtrans.redirect_url, '_blank');
    } else {
      showToast('error', 'Payment URL not available');
    }
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
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
            <Button 
              variant="secondary" 
              onClick={() => window.history.back()}
              className="mt-2"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Order not found</p>
            <Button 
              variant="secondary" 
              onClick={() => window.history.back()}
              className="mt-2"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/my-orders" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                  My Orders
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Order Detail</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Order Detail
          </h1>
          <p className="mt-2 text-gray-600">
            Order #{orderData.order_number}
          </p>
        </div>

        {/* Order Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Order Status</h3>
            <div className="mb-2">
              {getStatusBadge(orderData.status)}
            </div>
            <div className="text-sm text-gray-500">
              {orderData.status === 'pending' && 'Awaiting processing'}
              {orderData.status === 'processing' && 'Being processed'}
              {orderData.status === 'completed' && 'Successfully completed'}
              {orderData.status === 'cancelled' && 'Order cancelled'}
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Payment Status</h3>
            <div className="mb-2">
              {getPaymentStatusBadge(orderData.payment_status)}
            </div>
            <div className="text-sm text-gray-500">
              {orderData.payment_status === 'pending' && 'Payment pending'}
              {orderData.payment_status === 'paid' && 'Payment completed'}
              {orderData.payment_status === 'failed' && 'Payment failed'}
              {orderData.payment_status === 'expired' && 'Payment expired'}
              {orderData.payment_status === 'cancelled' && 'Payment cancelled'}
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Amount</h3>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(orderData.total_amount)}
            </div>
            <div className="text-sm text-gray-500">
              {orderData.quantity} item(s)
            </div>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Order Date</h3>
            <div className="text-lg font-semibold text-gray-900">
              {formatDate(orderData.created_at)}
            </div>
            <div className="text-sm text-gray-500">
              {formatDateTime(orderData.created_at)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {orderData.payment_status === 'pending' && orderData.midtrans?.redirect_url && (
          <div className="mb-8">
            <Button
              variant="primary"
              onClick={handlePayment}
              className="mr-4"
            >
              Continue Payment
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
            >
              Back to Orders
            </Button>
          </div>
        )}

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Package Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Package Name:</span>
                <span className="font-medium text-gray-900">{orderData.package_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Package Type:</span>
                <span className="font-medium text-gray-900 capitalize">{orderData.package_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium text-gray-900">{orderData.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Price:</span>
                <span className="font-medium text-gray-900">{formatPrice(orderData.unit_price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">
                  {orderData.duration_value} {orderData.duration_unit}(s)
                </span>
              </div>
              {orderData.session_count && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Count:</span>
                  <span className="font-medium text-gray-900">{orderData.session_count}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">
                  {orderData.payment_method || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created At:</span>
                <span className="font-medium text-gray-900">{formatDateTime(orderData.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expired At:</span>
                <span className="font-medium text-gray-900">{formatDateTime(orderData.expired_at)}</span>
              </div>
              {orderData.paid_at && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid At:</span>
                  <span className="font-medium text-gray-900">{formatDateTime(orderData.paid_at)}</span>
                </div>
              )}
              {orderData.cancelled_at && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancelled At:</span>
                  <span className="font-medium text-gray-900">{formatDateTime(orderData.cancelled_at)}</span>
                </div>
              )}
              {orderData.cancel_reason && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancel Reason:</span>
                  <span className="font-medium text-gray-900">{orderData.cancel_reason}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Midtrans Information */}
        {orderData.midtrans && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Gateway Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium text-gray-900">{orderData.midtrans.order_id}</span>
                </div>
                {orderData.midtrans.payment_type && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{orderData.midtrans.payment_type}</span>
                  </div>
                )}
                {orderData.midtrans.transaction_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium text-gray-900">{orderData.midtrans.transaction_id}</span>
                  </div>
                )}
                {orderData.midtrans.transaction_status && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction Status:</span>
                    <span className="font-medium text-gray-900 capitalize">{orderData.midtrans.transaction_status}</span>
                  </div>
                )}
                {orderData.midtrans.fraud_status && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fraud Status:</span>
                    <span className="font-medium text-gray-900 capitalize">{orderData.midtrans.fraud_status}</span>
                  </div>
                )}
              </div>
              
              {orderData.midtrans.va_numbers && orderData.midtrans.va_numbers.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Virtual Account Numbers</h3>
                  {orderData.midtrans.va_numbers.map((va, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank:</span>
                        <span className="font-medium text-gray-900 uppercase">{va.bank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VA Number:</span>
                        <span className="font-medium text-gray-900">{va.va_number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Member Package Information */}
        {orderData.member_package && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Member Package Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium text-gray-900">{formatDate(orderData.member_package.start_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium text-gray-900">{formatDate(orderData.member_package.end_date)}</span>
                </div>
              </div>
              
              {orderData.member_package.remaining_sessions && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Remaining Sessions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group:</span>
                      <span className="font-medium text-gray-900">{orderData.member_package.remaining_sessions.group}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Semi-Private:</span>
                      <span className="font-medium text-gray-900">{orderData.member_package.remaining_sessions.semi_private}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Private:</span>
                      <span className="font-medium text-gray-900">{orderData.member_package.remaining_sessions.private}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {orderData.notes && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
            <p className="text-gray-700">{orderData.notes}</p>
          </div>
        )}

        {/* Back Button */}
        
      </div>
    </div>
  );
};

export default OrderDetail; 