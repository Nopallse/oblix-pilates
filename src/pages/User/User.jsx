import React from 'react'

const User = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 mb-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Member Portal</h1>
          <p className="text-blue-100">Your pilates journey dashboard</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Classes Attended</h3>
            <p className="text-3xl font-bold text-blue-600 mb-1">24</p>
            <span className="text-sm text-gray-500">This Month</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">⏰</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Class</h3>
            <p className="text-xl font-bold text-green-600 mb-1">Tomorrow 9:00 AM</p>
            <span className="text-sm text-gray-500">Morning Flow</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Membership</h3>
            <p className="text-xl font-bold text-purple-600 mb-1">Premium</p>
            <span className="text-sm text-gray-500">Expires Dec 2025</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Classes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Classes</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium mb-2 inline-block">
                      Today 6:00 PM
                    </div>
                    <h3 className="font-semibold text-gray-900">Evening Pilates</h3>
                    <p className="text-sm text-gray-600">with Jane Doe</p>
                  </div>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium mb-2 inline-block">
                      Tomorrow 9:00 AM
                    </div>
                    <h3 className="font-semibold text-gray-900">Morning Flow</h3>
                    <p className="text-sm text-gray-600">with Mike Smith</p>
                  </div>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Available Classes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Classes</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">Core Strength</h3>
                <p className="text-sm text-gray-600 mb-1">Friday 11:00 AM - with Sarah Johnson</p>
                <p className="text-sm text-green-600 font-medium mb-3">5 spots available</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm w-full">
                  Book Now
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">Flexibility & Flow</h3>
                <p className="text-sm text-gray-600 mb-1">Saturday 2:00 PM - with Emma Wilson</p>
                <p className="text-sm text-green-600 font-medium mb-3">8 spots available</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm w-full">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Classes This Week</span>
                <span className="text-sm text-gray-500">3/5 Goal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{width: '60%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Monthly Goal</span>
                <span className="text-sm text-gray-500">24/30 Classes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full transition-all duration-300" style={{width: '80%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
