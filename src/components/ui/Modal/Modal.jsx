import React, { useEffect } from 'react'

const Modal = ({
  isOpen = false,
  onClose,
  title = '',
  children,
  footer = null,
  className = '',
  size = 'medium'
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl'
  }

  const modalClasses = [
    'bg-white rounded-lg shadow-xl transform transition-all',
    sizeClasses[size],
    'w-full mx-4',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {onClose && (
            <button 
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none focus:outline-none"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
        {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal