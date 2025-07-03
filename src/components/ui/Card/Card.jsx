import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  header = null,
  footer = null,
  ...props 
}) => {
  const cardClasses = [
    'bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses} {...props}>
      {header && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          {header}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card