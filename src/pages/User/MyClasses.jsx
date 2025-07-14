import React from 'react'

const MyClasses = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Classes</h1>
        
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🧘‍♀️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Yet</h3>
          <p className="text-gray-600">You haven't enrolled in any classes yet.</p>
        </div>
      </div>
    </div>
  )
}

export default MyClasses 