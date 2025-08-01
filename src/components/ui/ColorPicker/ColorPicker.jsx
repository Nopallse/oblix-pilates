import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = ({
  value = '#FF6B6B',
  onChange,
  label = '',
  required = false,
  disabled = false,
  error = '',
  className = '',
  variant = 'soft',
  placeholder = 'Choose color',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Predefined colors
  const predefinedColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#FAD7A0', '#A9DFBF', '#F9E79F', '#D5A6BD', '#A3E4D7'
  ];

  // Style for 'soft' variant
  const isSoft = variant === 'soft';
  const dropdownClass = isSoft
    ? `w-full text-base px-4 py-3 bg-[#f8f8f8] border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`
    : `w-full text-xs px-4 py-4 bg-white border border-[#E0E5F2] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  const labelClass = isSoft
    ? 'block text-sm font-semibold text-gray-800 mb-2'
    : 'block text-sm font-medium text-gray-700 mb-2';
  
  const requiredClass = isSoft
    ? 'text-xs text-red-500 align-super ml-0.5'
    : 'text-red-500 ml-1';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false);
  };

  const handleCustomColorChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className={labelClass}>
          {label}
          {required && <span className={requiredClass}>*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <div
          className={`flex items-center justify-between ${dropdownClass}`}
          onClick={handleToggle}
          {...props}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full border border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span className="text-gray-900">{value}</span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Predefined Colors</h4>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      value === color ? 'border-gray-800 scale-110' : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                ))}
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Custom Color</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={value}
                    onChange={handleCustomColorChange}
                    className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default ColorPicker; 