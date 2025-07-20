import React, { useState } from 'react';
import Button from '../../../components/ui/Button/Button';

const ChangePasswordForm = ({
  formik,
  loading,
  onCancel
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Password Field */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Current Password *
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              formik.touched.currentPassword && formik.errors.currentPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter your current password"
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.currentPassword}</p>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password *
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              formik.touched.newPassword && formik.errors.newPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter your new password"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password *
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Confirm your new password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Password Visibility Toggle */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="submit"
          loading={loading}
          disabled={loading}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm; 