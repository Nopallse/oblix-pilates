import React, { useState } from 'react'

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('week') // 'week', 'month', 'day'
  
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: 'Morning Flow',
      type: 'Group',
      instructor: 'Sarah Wilson',
      time: '07:00 - 08:00',
      date: '2024-01-15',
      capacity: 15,
      booked: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Private Session',
      type: 'Private',
      instructor: 'Mike Johnson',
      time: '09:00 - 10:00',
      date: '2024-01-15',
      capacity: 1,
      booked: 1,
      status: 'active'
    },
    {
      id: 3,
      title: 'Power Pilates',
      type: 'Group',
      instructor: 'Emma Chen',
      time: '18:00 - 19:00',
      date: '2024-01-15',
      capacity: 12,
      booked: 8,
      status: 'active'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Private': return 'bg-purple-100 text-purple-800'
      case 'Semi Private': return 'bg-blue-100 text-blue-800'
      case 'Group': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">Manage classes, instructors, and schedules</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Class</span>
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            {['day', 'week', 'month'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Today's Classes</h3>
          <p className="text-sm text-gray-500">January 15, 2024</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {classes.map((classItem) => (
              <div key={classItem.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{classItem.title}</h4>
                      <p className="text-sm text-gray-600">{classItem.instructor}</p>
                      <p className="text-sm text-gray-500">{classItem.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{classItem.booked}/{classItem.capacity}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                      {classItem.type}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}>
                      {classItem.status}
                    </span>
                    
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
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Classes</p>
              <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{classes.reduce((sum, c) => sum + c.booked, 0)}</p>
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
              <p className="text-sm font-medium text-gray-600">Capacity Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((classes.reduce((sum, c) => sum + c.booked, 0) / classes.reduce((sum, c) => sum + c.capacity, 0)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule 