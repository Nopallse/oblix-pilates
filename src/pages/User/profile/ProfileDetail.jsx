import React from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';

const ProfileDetail = ({ profile, onEdit }) => (
  <div className="rounded-lg mb-6 flex flex-col bg-white shadow-sm p-6">
    {/* Profile Photo */}
    <div className="mb-6 flex ">
      {profile?.profile_picture ? (
        <img
          src={profile.profile_picture}
          alt="Profile"
          className="w-28 h-28 rounded-lg object-cover border-2 border-primary shadow"
        />
      ) : (
        <div className="w-28 h-28 rounded-lg bg-primary flex items-center justify-center text-white text-4xl font-bold border-2 border-primary shadow">
          {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : profile?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
      )}
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Full Name"
        value={profile?.full_name || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Username"
        value={profile?.username || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Email"
        value={profile?.email || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Phone Number"
        value={profile?.phone_number || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Date of Birth"
        value={profile?.dob ? new Date(profile.dob).toLocaleDateString() : ''}
        variant="soft"
        disabled
      />
    </div>
    <div className="flex justify-end mt-6 w-full">
      <Button variant="secondary" onClick={onEdit}>
        Edit Profile
      </Button>
    </div>
  </div>
);

export default ProfileDetail; 