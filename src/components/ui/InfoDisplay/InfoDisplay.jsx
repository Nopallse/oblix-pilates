import React from 'react';

const InfoDisplay = ({ 
  label, 
  value, 
  variant = 'default',
  className = '',
  labelClassName = '',
  valueClassName = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'soft':
        return {
          container: 'px-3 py-4 bg-quaternary rounded-xl text-sm text-gray-500',
          label: 'text-sm font-medium text-gray-700'
        };
      case 'outline':
        return {
          container: 'px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900',
          label: 'text-sm font-medium text-gray-700'
        };
      case 'primary':
        return {
          container: 'px-3 py-2 bg-primary bg-opacity-10 rounded-lg text-sm text-primary font-medium',
          label: 'text-sm font-medium text-gray-700'
        };
      case 'success':
        return {
          container: 'px-3 py-2 bg-green-50 rounded-lg text-sm text-green-700 font-medium',
          label: 'text-sm font-medium text-gray-700'
        };
      case 'warning':
        return {
          container: 'px-3 py-2 bg-yellow-50 rounded-lg text-sm text-yellow-700 font-medium',
          label: 'text-sm font-medium text-gray-700'
        };
      case 'error':
        return {
          container: 'px-3 py-2 bg-red-50 rounded-lg text-sm text-red-700 font-medium',
          label: 'text-sm font-medium text-gray-700'
        };
      default:
        return {
          container: 'px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900',
          label: 'text-sm font-medium text-gray-700'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`space-y-1 ${className}`}>
      <label className={`${variantClasses.label} ${labelClassName}`}>
        {label}
      </label>
      <div className={`mt-1 ${variantClasses.container} ${valueClassName}`}>
        {value || '-'}
      </div>
    </div>
  );
};

export default InfoDisplay; 