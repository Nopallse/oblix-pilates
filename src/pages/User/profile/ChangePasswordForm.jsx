import React from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';

const ChangePasswordForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  showPassword,
  togglePasswordVisibility,
  loading
}) => (
  <form onSubmit={onSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Current Password"
        type={showPassword ? 'text' : 'password'}
        name="currentPassword"
        value={formData.currentPassword}
        onChange={onChange}
        placeholder="Enter your current password"
        required
      />
      <Input
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        name="newPassword"
        value={formData.newPassword}
        onChange={onChange}
        placeholder="Enter your new password"
        required
      />
      <Input
        label="Confirm New Password"
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        placeholder="Confirm your new password"
        required
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        {showPassword ? 'Hide' : 'Show'} Password
      </button>
    </div>
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

export default ChangePasswordForm; 