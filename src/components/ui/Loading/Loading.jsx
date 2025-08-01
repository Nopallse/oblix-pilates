import React from 'react'

const Loading = ({ 
  size = 'medium',
  text = 'Loading...',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const spinnerSize = sizeClasses[size]

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen  ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className={`${spinnerSize} relative`}>
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Loading text */}
        {text && (
          <div className="text-center">
            <p className="text-gray-600 font-medium">{text}</p>
            <div className="flex space-x-1 mt-2 justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Loading
