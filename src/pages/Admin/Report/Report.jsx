import React, { useState } from 'react'

const Report = () => {
  const [timeRange, setTimeRange] = useState('month')
  
  const [reportData, setReportData] = useState({
    revenue: {
      total: 45800000,
      growth: 12.5,
      transactions: 156
    },
    members: {
      total: 245,
      new: 28,
      active: 180
    },
    classes: {
      total: 89,
      completed: 82,
      cancelled: 7
    },
    packages: {
      mostPopular: 'Premium Monthly',
      totalSales: 173
    }
  })

  const [monthlyData] = useState([
    { month: 'Jan', revenue: 38500000, members: 215 },
    { month: 'Feb', revenue: 42000000, members: 228 },
    { month: 'Mar', revenue: 45800000, members: 245 },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Business insights and performance metrics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">Rp {reportData.revenue.total.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +{reportData.revenue.growth}%
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.members.active}</p>
              <p className="text-sm text-blue-600">+{reportData.members.new} new this month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Classes Completed</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.classes.completed}</p>
              <p className="text-sm text-gray-600">{reportData.classes.cancelled} cancelled</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Package Sales</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.packages.totalSales}</p>
              <p className="text-sm text-gray-600">Most popular: {reportData.packages.mostPopular}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-blue-500 rounded-t w-full"
                  style={{ height: `${(data.revenue / 50000000) * 200}px` }}
                ></div>
                <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs text-gray-500">
                  Rp {(data.revenue / 1000000).toFixed(0)}M
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Member Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Growth</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-green-500 rounded-t w-full"
                  style={{ height: `${(data.members / 300) * 200}px` }}
                ></div>
                <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs text-gray-500">{data.members}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Packages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Packages</h3>
          <div className="space-y-4">
            {[
              { name: 'Premium Monthly', sales: 68, revenue: 81600000 },
              { name: 'Basic Monthly', sales: 52, revenue: 41600000 },
              { name: 'Elite Unlimited', sales: 28, revenue: 56000000 },
              { name: 'Trial Package', sales: 25, revenue: 3750000 }
            ].map((pkg, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{pkg.name}</p>
                  <p className="text-sm text-gray-600">{pkg.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">Rp {pkg.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              { member: 'Sarah Johnson', package: 'Premium Monthly', amount: 1200000, date: '2024-01-20' },
              { member: 'Mike Chen', package: 'Basic Monthly', amount: 800000, date: '2024-01-19' },
              { member: 'Emma Wilson', package: 'Elite Unlimited', amount: 2000000, date: '2024-01-18' },
              { member: 'David Kim', package: 'Trial Package', amount: 150000, date: '2024-01-17' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{transaction.member}</p>
                  <p className="text-sm text-gray-600">{transaction.package}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">Rp {transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report 