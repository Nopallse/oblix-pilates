import React, { useState } from 'react'

const Package = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Basic Monthly',
      type: 'Monthly',
      price: 800000,
      sessions: 8,
      validity: 30,
      features: ['8 Group Classes', 'Equipment Included', 'Basic Support'],
      status: 'active',
      sold: 45
    },
    {
      id: 2,
      name: 'Premium Monthly',
      type: 'Monthly',
      price: 1200000,
      sessions: 12,
      validity: 30,
      features: ['12 Mixed Classes', 'Priority Booking', 'Nutrition Consultation', 'Equipment Included'],
      status: 'active',
      sold: 32
    },
    {
      id: 3,
      name: 'Elite Unlimited',
      type: 'Monthly',
      price: 2000000,
      sessions: 999,
      validity: 30,
      features: ['Unlimited Classes', 'Private Sessions (2x)', 'Personal Program', 'Priority Booking', 'Nutrition Plan'],
      status: 'active',
      sold: 18
    },
    {
      id: 4,
      name: 'Trial Package',
      type: 'Trial',
      price: 150000,
      sessions: 3,
      validity: 14,
      features: ['3 Group Classes', 'Equipment Trial', 'Basic Assessment'],
      status: 'active',
      sold: 78
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState('all')

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Monthly': return 'bg-blue-100 text-blue-800'
      case 'Trial': return 'bg-purple-100 text-purple-800'
      case 'Annual': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPackages = packages.filter(pkg => 
    filter === 'all' || pkg.type.toLowerCase() === filter.toLowerCase()
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage membership packages and pricing</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create Package</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            {['all', 'monthly', 'trial', 'annual'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search packages..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Package Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Packages</p>
              <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Packages</p>
              <p className="text-2xl font-bold text-gray-900">{packages.filter(p => p.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{packages.reduce((sum, p) => sum + p.sold, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                Rp {packages.reduce((sum, p) => sum + (p.price * p.sold), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(pkg.type)}`}>
                    {pkg.type}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                  {pkg.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">Rp {pkg.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-2">/{pkg.validity} days</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {pkg.sessions === 999 ? 'Unlimited' : pkg.sessions} sessions
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{pkg.sold}</span> sold
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Package 