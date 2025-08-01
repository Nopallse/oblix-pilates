import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Table, InfoDisplay } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';
import { icons } from '@shared/utils/assets';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApiToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data when component mounts
  useEffect(() => {
    if (id) {
      fetchProfileData();
      fetchPackageData(); // Fetch package data immediately
      fetchBookingData(); // Fetch booking data immediately
    }
  }, [id]);

  // Remove the tab change effect since all data is loaded initially
  // useEffect(() => {
  //   if (id && activeTab === 'booking') {
  //     fetchBookingData();
  //   }
  // }, [id, activeTab]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/member/${id}/profile`);
      
      if (response.success) {
        setProfileData(response.data);
        console.log('📋 Profile data loaded:', response.data);
      } else {
        showToast('Failed to load profile data', 'error');
        navigate('/admin/member');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      showToast('Failed to load profile data', 'error');
      navigate('/admin/member');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackageData = async () => {
    try {
      const response = await apiClient.get(`/api/member/${id}/packages`);
      if (response.success) {
        setPackageData(response.data);
        console.log('📦 Package data loaded:', response.data);
      }
    } catch (error) {
      console.error('Error fetching package data:', error);
      showToast('Failed to load package data', 'error');
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await apiClient.get(`/api/member/${id}/bookings`);
      if (response.success) {
        setBookingData(response.data);
        console.log('📅 Booking data loaded:', response.data);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
      showToast('Failed to load booking data', 'error');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading member detail...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Member Not Found</h1>
          <p className="text-gray-600 mb-6">The member you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/admin/member')}
          >
            Back to Member List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/admin/member" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                  Member
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Member Detail</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Member Detail</h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'profile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Detail Profile
          </button>
          <button
            onClick={() => setActiveTab('package')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'package'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Package ({packageData.length})
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
              activeTab === 'booking'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Booking ({bookingData.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg w-full">
          {activeTab === 'profile' && (
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="space-y-4">
                    <InfoDisplay
                      label="Full Name"
                      value={profileData.full_name}
                      variant="soft"
                    />
                    
                    <InfoDisplay
                      label="Username"
                      value={profileData.username}
                      variant="soft"
                    />
                    
                    <InfoDisplay
                      label="Email"
                      value={profileData.email}
                      variant="soft"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="space-y-4">
                    <InfoDisplay
                      label="Date of Birth"
                      value={formatDate(profileData.date_of_birth)}
                      variant="soft"
                    />
                    
                    <InfoDisplay
                      label="Join Date"
                      value={formatDate(profileData.join_date)}
                      variant="soft"
                    />
                    
                    <InfoDisplay
                      label="Phone Number"
                      value={profileData.phone_number}
                      variant="soft"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'package' && (
            <div>
              {/* Removed tabLoading check */}
                <Table
                  columns={[
                    {
                      key: 'no',
                      header: 'No',
                      span: 1,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>
                    },
                    {
                      key: 'payment_date',
                      header: 'Payment Date',
                      span: 2,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>
                    },
                    {
                      key: 'expired_date',
                      header: 'Expired Date',
                      span: 2,
                      render: (v) => <span className="text-sm text-gray-900">{v}</span>
                    },
                    {
                      key: 'package',
                      header: 'Package',
                      span: 2,
                      render: (v) => <span className="font-medium text-gray-900">{v}</span>
                    },
                    {
                      key: 'initial_session',
                      header: 'Initial Session',
                      span: 2,
                      render: (v) => (
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">Total: {v.total}</div>
                          <div className="text-gray-500">
                            G: {v.group} | SP: {v.semi_private} | P: {v.private}
                          </div>
                        </div>
                      )
                    },
                    {
                      key: 'session_left',
                      header: 'Session Left',
                      span: 2,
                      render: (v) => (
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">Total: {v.total}</div>
                          <div className="text-gray-500">
                            G: {v.group} | SP: {v.semi_private} | P: {v.private}
                          </div>
                        </div>
                      )
                    },
                    {
                      key: 'price',
                      header: 'Price',
                      span: 1,
                      render: (v) => (
                        <span className="font-semibold text-green-600">{v}</span>
                      )
                    }
                  ]}
                  data={packageData}
                  emptyMessage="No package data found"
                />
              {/* Removed tabLoading check */}
            </div>
          )}

          {activeTab === 'booking' && (
            <div>
              <Table
                columns={[
                  {
                    key: 'no',
                    header: 'No',
                    span: 1,
                    render: (v) => <span className="text-sm text-gray-900">{v}</span>
                  },
                  {
                    key: 'booked_date',
                    header: 'Booked Date',
                    span: 2,
                    render: (v) => <span className="text-sm text-gray-900">{v}</span>
                  },
                  {
                    key: 'class_date',
                    header: 'Class Date',
                    span: 2,
                    render: (v) => <span className="text-sm text-gray-900">{v}</span>
                  },
                  {
                    key: 'time',
                    header: 'Time',
                    span: 2,
                    render: (v) => <span className="text-sm text-gray-900">{v}</span>
                  },
                  {
                    key: 'course',
                    header: 'Course',
                    span: 3,
                    render: (v) => <span className="font-medium text-gray-900">{v}</span>
                  },
                  {
                    key: 'coach',
                    header: 'Coach',
                    span: 2,
                    render: (v) => <span className="text-sm text-gray-900">{v}</span>
                  }
                ]}
                data={bookingData}
                emptyMessage="No booking data found"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail; 