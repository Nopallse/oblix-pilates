import React, { useState, useRef } from 'react';

const FileInput = ({
  name = '',
  accept = '*',
  multiple = false,
  value = null,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  error = '',
  label = '',
  className = '',
  variant = 'soft',
  placeholder = 'Choose file',
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = [],
  showPreview = false,
  ...props
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  // Style for 'soft' variant
  const isSoft = variant === 'soft';
  const inputClass = isSoft
    ? `w-full text-base px-4 py-3 bg-[#f8f8f8] border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`
    : `w-full text-xs px-4 py-4 bg-white border border-[#E0E5F2] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  const labelClass = isSoft
    ? 'block text-sm font-semibold text-gray-800 mb-2'
    : 'block text-sm font-medium text-gray-700 mb-2';
  
  const requiredClass = isSoft
    ? 'text-xs text-red-500 align-super ml-0.5'
    : 'text-red-500 ml-1';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    
    // Validate file size
    if (file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      console.error(`File terlalu besar. Maksimal ${sizeMB}MB`);
      return;
    }

    // Validate file type
    if (allowedTypes.length > 0) {
      const isValidType = allowedTypes.some(type => 
        file.type.startsWith(type) || file.name.toLowerCase().endsWith(type)
      );
      if (!isValidType) {
        console.error('Tipe file tidak didukung');
        return;
      }
    }

    // Create preview if showPreview is true and file is image
    if (showPreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    onChange(file);
  };

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFileInfo = () => {
    if (value) {
      if (typeof value === 'string') {
        return value.split('/').pop(); // Extract filename from URL
      }
      return value.name;
    }
    return null;
  };

  return (
    <div className="w-full">
      {label && (
        <label className={labelClass}>
          {label}
          {required && <span className={requiredClass}>*</span>}
        </label>
      )}
      <div className="relative">
        <div
          className={`${inputClass} ${dragActive ? 'ring-2 ring-primary' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex items-center justify-between">
            <span className={getFileInfo() ? 'text-gray-900' : 'text-gray-400'}>
              {getFileInfo() || placeholder}
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
          disabled={disabled}
          className="hidden"
          {...props}
        />
      </div>
      
      {/* File Preview */}
      {showPreview && preview && (
        <div className="mt-3">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                onChange(null);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default FileInput; 