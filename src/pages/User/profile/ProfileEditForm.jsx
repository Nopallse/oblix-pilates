import React from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import { getProfileImageUrl } from '../../../shared/utils/assets';

const ProfileEditForm = ({ formData, onChange, onSubmit, onCancel, loading, onUploadPhoto }) => {
  // Get preview URL for selected file
  const getPreviewUrl = () => {
    if (formData.picture instanceof File) {
      return URL.createObjectURL(formData.picture)
    }
    return getProfileImageUrl(formData.picture)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 mb-6">
      {/* Profile Photo */}
      <div className="mb-6 flex flex-col">
        <label className="w-28 h-28 flex flex-col border-2 border-primary rounded-lg cursor-pointer hover:bg-primary/5 transition group relative overflow-hidden">
          {getPreviewUrl() ? (
            <>
              <img
                src={getPreviewUrl()}
                alt="Profile"
                className="w-28 h-28 rounded-lg object-cover"
              />
              {/* Edit Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center">
                {/* Edit Icon */}
                <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-white text-xs font-medium">Edit Photo</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              {/* Icon upload */}
              <svg className="w-10 h-10 text-primary mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
              <span className="text-primary text-sm font-medium">Masukan Foto</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={onUploadPhoto}
            disabled={loading}
            tabIndex={-1}
          />
        </label>

      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter your full name"
          required
          variant="soft"
        />
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Enter your username"
          required
          variant="soft"
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter your email"
          required
          variant="soft"
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          placeholder="Enter your phone number"
          variant="soft"
        />
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={onChange}
          variant="soft"
        />
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
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm; 