import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  label = '',
  required = false,
  disabled = false,
  error = '',
  className = '',
  variant = 'soft',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

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

  // Filter options based on search term
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get selected option label
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
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
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleOptionSelect = (option) => {
    console.log('Dropdown option selected:', option.value);
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <span className={displayValue ? 'text-gray-900' : 'text-gray-400'}>
            {displayValue || placeholder}
          </span>
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
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
              </div>
            )}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors ${
                      option.value === value ? 'bg-primary text-white' : 'text-gray-700'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default Dropdown; 