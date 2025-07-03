import React from 'react'

const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  onFocus,
  name = '',
  id = '',
  required = false,
  disabled = false,
  error = '',
  label = '',
  className = '',
  ...props
}) => {
  const inputClasses = [
    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
    disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

export default Input