import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  to = null,
  href = null,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-montserrat font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap'
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-opacity-90 focus:ring-primary disabled:bg-opacity-50',
    secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary disabled:bg-opacity-50',
    outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:opacity-50',
    'outline-white': 'border border-primary text-white hover:bg-primary hover:text-white focus:ring-primary disabled:opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    submit: 'w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  }
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs sm:text-sm min-w-[100px]',
    medium: 'px-4 p2-2 text-sm sm:text-base min-w-[120px]',
    large: 'p126 py23 textbasee sm:text2xlg min-w-140pxx]'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'opacity-75 cursor-wait',
    className
  ].filter(Boolean).join(' ')

  const content = loading ? (
    <div className="flex items-center">
      <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
      Loading...
    </div>
  ) : (
    children
  )

  // If it's a Link (React Router)
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        {...props}
      >
        {content}
      </Link>
    )
  }

  // If it's an external link
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...props}
      >
        {content}
      </a>
    )
  }

  // Regular button
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}

export default Button
