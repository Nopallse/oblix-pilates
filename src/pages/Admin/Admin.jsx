import React, { useState } from 'react'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Total Members', value: '156', trend: '+12%', color: 'blue' },
    { label: 'Active Classes', value: '24', trend: '+2', color: 'green' },
    { label: 'Revenue', value: '$8,450', trend: '+15%', color: 'purple' },
    { label: 'Instructors', value: '8', trend: '+1', color: 'orange' }
  ]

  const recentActivities = [
    { id: 1, action: 'New member registration', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, action: 'Class booking', user: 'Mike Chen', time: '4 hours ago' },
    { id: 3, action: 'Payment received', user: 'Emma Wilson', time: '6 hours ago' },
    { id: 4, action: 'Class cancelled', user: 'Admin', time: '1 day ago' }
  ]

  const upcomingClasses = [
    { id: 1, name: 'Morning Stretch', instructor: 'Lisa', time: '09:00 AM', capacity: '12/15' },
    { id: 2, name: 'Power Pilates', instructor: 'James', time: '11:00 AM', capacity: '15/15' },
    { id: 3, name: 'Beginner Class', instructor: 'Maria', time: '02:00 PM', capacity: '8/12' },
    { id: 4, name: 'Advanced Flow', instructor: 'Lisa', time: '05:00 PM', capacity: '10/10' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your studio today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend}
                </div>
              </div>
              <div className={`mt-2 w-full bg-gray-200 rounded-full h-2`}>
                <div className={`bg-${stat.color}-600 h-2 rounded-full`} style={{ width: '75%' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{classItem.name}</p>
                    <p className="text-sm text-gray-600">{classItem.instructor} • {classItem.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    classItem.capacity.split('/')[0] === classItem.capacity.split('/')[1] 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {classItem.capacity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">👤</div>
                <p className="text-sm font-medium text-gray-700">Add Member</p>
              </div>
            </button>
            
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="text-sm font-medium text-gray-700">Schedule Class</p>
              </div>
            </button>
            
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-sm font-medium text-gray-700">View Reports</p>
              </div>
            </button>
            
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <p className="text-sm font-medium text-gray-700">Settings</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
