import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    { title: "Today's Classes", value: "8", subtitle: "Active Sessions", icon: "🧘‍♀️", color: "blue" },
    { title: "Active Members", value: "156", subtitle: "Current Enrollment", icon: "👥", color: "green" },
    { title: "Revenue This Month", value: "$12,450", subtitle: "Total Earnings", icon: "💰", color: "purple" },
    { title: "Upcoming Classes", value: "24", subtitle: "Next 7 Days", icon: "📅", color: "orange" }
  ]

  const activities = [
    "New member Sarah Johnson joined",
    "Morning Pilates class completed",
    "Equipment maintenance scheduled",
    "New instructor onboarded",
    "Monthly membership renewal processed"
  ]

  const quickActions = [
    { title: "Schedule Class", icon: "📅", color: "blue" },
    { title: "Add Member", icon: "👤", color: "green" },
    { title: "View Reports", icon: "📊", color: "purple" },
    { title: "Manage Equipment", icon: "🏋️", color: "orange" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Oblix Pilates</h1>
        <p className="text-blue-100">
          Hello, <span className="font-semibold">{user?.email || 'User'}</span>! Here's your studio overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className={`text-${stat.color}-600 text-sm font-medium bg-${stat.color}-50 px-2 py-1 rounded`}>
                +12%
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <span className="text-gray-500 text-sm">{stat.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Recent Activities
          </h2>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{activity}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all activities →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`w-full p-4 rounded-lg border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors text-left group`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{action.icon}</span>
                  <span className={`font-medium text-${action.color}-700 group-hover:text-${action.color}-800`}>
                    {action.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">15+</p>
            <p className="text-gray-600 text-sm">Years of Experience</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">1000+</p>
            <p className="text-gray-600 text-sm">Happy Members</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">98%</p>
            <p className="text-gray-600 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
