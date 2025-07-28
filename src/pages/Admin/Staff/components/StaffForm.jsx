import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { staffValidation } from '../api';

const StaffForm = ({ 
  isOpen, 
  onClose, 
  staffData = null, 
  onSubmit,
  loading = false
}) => {
  const { showToast } = useApiToast();
  const isEdit = !!staffData;

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    date_of_birth: '',
    phone_number: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or staffData changes
  useEffect(() => {
    if (isOpen) {
      if (staffData) {
        setFormData({
          full_name: staffData.full_name || '',
          username: staffData.username || '',
          email: staffData.email || '',
          date_of_birth: staffData.date_of_birth ? staffData.date_of_birth.split('T')[0] : '',
          phone_number: staffData.phone_number || '',
          password: '', // Password kosong untuk edit
        });
      } else {
        setFormData({
          full_name: '',
          username: '',
          email: '',
          date_of_birth: '',
          phone_number: '',
          password: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, staffData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    let fieldError = null;
    switch (name) {
      case 'full_name':
        fieldError = staffValidation.validateFullName(value);
        break;
      case 'username':
        fieldError = staffValidation.validateUsername(value);
        break;
      case 'email':
        fieldError = staffValidation.validateEmail(value);
        break;
      case 'date_of_birth':
        fieldError = staffValidation.validateDateOfBirth(value);
        break;
      case 'phone_number':
        fieldError = staffValidation.validatePhoneNumber(value);
        break;
      case 'password':
        fieldError = staffValidation.validatePassword(value, isEdit);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldError || ''
    }));
  };

  const validateForm = () => {
    const validation = staffValidation.validateForm(formData, isEdit);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const getFormTitle = () => {
    return isEdit ? 'Edit Staff' : 'Add Staff';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepare data for submission
    const submitData = { ...formData };
    
    // Jika edit dan password kosong, hapus password dari data
    if (isEdit && !formData.password) {
      delete submitData.password;
    }

    onSubmit(submitData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getFormTitle()}>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* Full Name */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Nama Lengkap *
          </label>
          <div className="flex-1">
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] ${
                errors.full_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Username *
          </label>
          <div className="flex-1">
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Masukkan username"
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Email *
          </label>
          <div className="flex-1">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Masukkan email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="date_of_birth" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Tanggal Lahir *
          </label>
          <div className="flex-1">
            <input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] ${
                errors.date_of_birth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-0 sm:w-40">
            No. Telepon *
          </label>
          <div className="flex-1">
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] ${
                errors.phone_number ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Contoh: +62 812-3456-7890"
            />
            {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-0 sm:w-40">
            {isEdit ? 'Password Baru' : 'Password *'}
          </label>
          <div className="flex-1">
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder={isEdit ? "Kosongkan jika tidak ingin mengubah password" : "Masukkan password"}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            {isEdit && (
              <p className="mt-1 text-sm text-gray-500">
                Kosongkan field ini jika tidak ingin mengubah password
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {isEdit ? 'Save' : 'Create Staff'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StaffForm; 