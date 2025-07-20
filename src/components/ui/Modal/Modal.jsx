import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

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
      console.log('Modal opened - setting body styles')
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = '0'
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.bottom = '0'
    }

    return () => {
      console.log('Modal closed - resetting body styles')
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.top = 'unset'
      document.body.style.left = 'unset'
      document.body.style.right = 'unset'
      document.body.style.bottom = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl'
  }

  const modalClasses = [
    'bg-white rounded-3xl shadow-xl transform transition-all',
    sizeClasses[size],
    'w-full mx-4',
    className
  ].filter(Boolean).join(' ')

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" 
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        minHeight: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        zIndex: 9999,
        margin: 0,
        padding: 0
      }}
      onClick={onClose}
    >
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex-1"></div>
          {title && <h3 className="text-lg font-bold flex-1 font-raleway text-center">{title}</h3>}
          {onClose && (
            <button 
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none focus:outline-none flex-1 flex justify-end"
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

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body)
}

export default Modal