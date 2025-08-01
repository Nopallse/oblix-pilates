import React, { useState, useEffect } from 'react';
import { Button, Table, Dropdown } from '@components/ui';
import { useReport } from './api';
import { PayrollDetailModal } from './components';
import { useApiToast } from '@shared/hooks';

const Report = () => {
  const { showToast } = useApiToast();
  const {
    revenueData,
    payrollData,
    payrollDetailData,
    loading,
    error,
    fetchRevenueReport,
    fetchPayrollReport,
    fetchPayrollDetail,
  } = useReport();

  const [activeTab, setActiveTab] = useState('revenue');
  const [showPayrollDetail, setShowPayrollDetail] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [filterType, setFilterType] = useState('custom'); // 'custom' or 'monthly'
  const [dateRange, setDateRange] = useState({
    start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate month options
  const monthOptions = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];

  // Generate year options (current year - 5 to current year + 5)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    yearOptions.push({ value: year, label: year.toString() });
  }

  // Fetch data when component mounts or filters change
  useEffect(() => {
    let currentDateRange = dateRange;
    
    if (filterType === 'monthly') {
      const startDate = new Date(selectedYear, selectedMonth, 1);
      const endDate = new Date(selectedYear, selectedMonth + 1, 0);
      
      currentDateRange = {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      };
    }

    if (activeTab === 'revenue') {
      fetchRevenueReport(currentDateRange);
    } else if (activeTab === 'payroll') {
      fetchPayrollReport(currentDateRange);
    }
  }, [activeTab, dateRange, selectedMonth, selectedYear, filterType, fetchRevenueReport, fetchPayrollReport]);

  // Handle payroll detail view
  const handleViewPayrollDetail = async (instructorId) => {
    setSelectedInstructorId(instructorId);
    
    let currentDateRange = dateRange;
    if (filterType === 'monthly') {
      const startDate = new Date(selectedYear, selectedMonth, 1);
      const endDate = new Date(selectedYear, selectedMonth + 1, 0);
      
      currentDateRange = {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      };
    }
    
    await fetchPayrollDetail(instructorId, currentDateRange);
    setShowPayrollDetail(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle date range change
  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get current filter display text
  const getFilterDisplayText = () => {
    if (filterType === 'monthly') {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${monthNames[selectedMonth]} ${selectedYear}`;
    } else {
      return `${dateRange.start_date} to ${dateRange.end_date}`;
    }
  };

  if (error) {
    showToast(error, 'error');
  }

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Report</h1>
          
          {/* Filter Section */}
          <div className="">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Filter Type Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFilterType('custom')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      filterType === 'custom'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Custom Range
                  </button>
                  <button
                    onClick={() => setFilterType('monthly')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      filterType === 'monthly'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Date Filters */}
              {filterType === 'custom' ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 min-w-[80px]">Start:</label>
                    <input
                      type="date"
                      value={dateRange.start_date}
                      onChange={(e) => handleDateRangeChange('start_date', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 min-w-[80px]">End:</label>
                    <input
                      type="date"
                      value={dateRange.end_date}
                      onChange={(e) => handleDateRangeChange('end_date', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Month:</label>
                    <Dropdown
                      value={selectedMonth}
                      onChange={(value) => setSelectedMonth(value)}
                      options={monthOptions}
                      variant="soft"
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Year:</label>
                    <Dropdown
                      value={selectedYear}
                      onChange={(value) => setSelectedYear(value)}
                      options={yearOptions}
                      variant="soft"
                      className="w-24"
                    />
                  </div>
                </div>
              )}

          
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'revenue'
                ? 'text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'payroll'
                ? 'text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Payroll
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Content */}
        {activeTab === 'revenue' && (
          <div>
            {/* Revenue Metrics */}
            {revenueData?.metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary rounded-2xl p-10 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Members</h3>
                  <p className="text-3xl font-bold">{revenueData.metrics.total_members}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-10 text-white">
                <h3 className="text-lg font-semibold mb-2">Total Payments</h3>
                  <p className="text-3xl font-bold">{revenueData.metrics.total_payments}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-10 text-white">
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold">{formatCurrency(revenueData.metrics.total_revenue)}</p>
                </div>
              </div>
            )}

            {/* Revenue Table */}
            {revenueData?.payments && (
              <div className="bg-white rounded-lg w-full">
                <Table
                  columns={[
                    
                    {
                      key: 'payment_date',
                      header: 'Payment Date',
                      span: 2,
                      render: (v, r) => (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{v}</div>
                          <div className="text-xs text-gray-500">{r.payment_time}</div>
                        </div>
                      )
                    },
                    {
                      key: 'package_name',
                      header: 'Package Name',
                      span: 3,
                      render: (v) => <span className="font-medium text-gray-900">{v}</span>
                    },
                    {
                      key: 'member_name',
                      header: 'Member Name',
                      span: 3,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>
                    },
                    {
                      key: 'payment_method',
                      header: 'Payment Method',
                      span: 2,
                      render: (v) => (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {v.replace('_', ' ')}
                        </span>
                      ),
                      className: 'text-center'
                    },
                    {
                      key: 'price',
                      header: 'Price',
                      span: 2,
                      render: (v) => (
                        <span className="font-semibold text-green-600">
                          {formatCurrency(v)}
                        </span>
                      )
                    }
                  ]}
                  data={revenueData.payments}
                  loading={loading}
                  emptyMessage="Tidak ada data payment."
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'payroll' && (
          <div>
            {/* Payroll Metrics */}
            {payrollData?.metrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-secondary rounded-2xl p-10 text-white">
          <h3 className="text-lg font-semibold mb-2">Instructor</h3>
                  <p className="text-3xl font-bold">{payrollData.metrics.total_instructors}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-10 text-white">
                <h3 className="text-lg font-semibold mb-2">Classes</h3>
                  <p className="text-3xl font-bold">{payrollData.metrics.total_classes}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-10 text-white">
                <h3 className="text-lg font-semibold mb-2">Total Pay</h3>
                  <p className="text-3xl font-bold">{formatCurrency(payrollData.metrics.total_pay)}</p>
                </div>
              </div>
            )}

            {/* Payroll Table */}
            {payrollData?.payroll && (
              <div className="bg-white rounded-lg w-full">
                <Table
                  columns={[
                    {
                      key: 'instructor_name',
                      header: 'Instructor Name',
                      span: 3,
                      render: (v) => <span className="font-medium text-gray-900">{v}</span>
                    },
                    {
                      key: 'total_class',
                      header: 'Total Class',
                      span: 2,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>,
                      className: 'text-center'
                    },
                    {
                      key: 'total_member',
                      header: 'Total Member',
                      span: 2,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>,
                      className: 'text-center'
                    },
                    {
                      key: 'payroll_date',
                      header: 'Payroll Date',
                      span: 2,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>
                    },
                    {
                      key: 'total_salary',
                      header: 'Total Salary',
                      span: 2,
                      render: (v) => (
                        <span className="font-semibold text-green-600">
                          {formatCurrency(v)}
                        </span>
                      )
                    },
                    {
                      key: 'actions',
                      header: '',
                      span: 1,
                      render: (v, r) => (
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => handleViewPayrollDetail(r.instructor_id)}
                            disabled={loading}
                          >
                            View Details
                          </Button>
                        </div>
                      )
                    }
                  ]}
                  data={payrollData.payroll.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    actions: ''
                  }))}
                  loading={loading}
                  emptyMessage="Tidak ada data payroll."
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payroll Detail Modal */}
      <PayrollDetailModal
        isOpen={showPayrollDetail}
        onClose={() => setShowPayrollDetail(false)}
        payrollDetail={payrollDetailData}
      />
    </div>
  );
};

export default Report; 