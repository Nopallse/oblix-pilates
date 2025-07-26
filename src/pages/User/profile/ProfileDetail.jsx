import React from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import { getProfileImageUrl } from '../../../shared/utils/assets';

const ProfileDetail = ({ profile, onEdit }) => {
  console.log('ProfileDetail rendering with profile:', profile)

  return (
  <div className="rounded-lg mb-6 flex flex-col">
    {/* Profile Photo */}
    <div className="mb-6 flex ">
        {profile?.picture ? (
        <img
            src={getProfileImageUrl(profile.picture)}
          alt="Profile"
          className="w-28 h-28 rounded-lg object-cover border-2 border-primary shadow"
            onError={(e) => {
              console.log('Image failed to load:', profile.picture)
              e.target.style.display = 'none'
            }}
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
        name="fullName"
        value={profile?.full_name || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Username"
        name="username"
        value={profile?.username || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Email"
        name="email"
        value={profile?.email || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Phone Number"
        name="phoneNumber"
        value={profile?.phone_number || ''}
        variant="soft"
        disabled
      />
      <Input
        label="Date of Birth"
        name="dob"
        value={profile?.dob ? new Date(profile.dob).toLocaleDateString() : ''}
        variant="soft"
        disabled
      />
        <Input
          label="Member Code"
          name="memberCode"
          value={profile?.member_code || ''}
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
};

export default ProfileDetail; 