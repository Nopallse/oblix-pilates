import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';
import { icons } from '@shared/utils/assets';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApiToast();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch member detail when component mounts
  useEffect(() => {
    if (id) {
      fetchMemberDetail();
    }
  }, [id]);

  const fetchMemberDetail = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/member/${id}`);
      
      if (response.success) {
        setMember(response.data);
        console.log('📋 Member detail loaded:', response.data);
      } else {
        showToast('Failed to load member detail', 'error');
        navigate('/admin/member');
      }
    } catch (error) {
      console.error('Error fetching member detail:', error);
      showToast('Failed to load member detail', 'error');
      navigate('/admin/member');
    } finally {
      setLoading(false);
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

  // Format status
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' }
    };

    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
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

  if (!member) {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/member')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img src={icons.back} alt="Back" className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Member Detail</h1>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  // TODO: Implement edit functionality
                  console.log('Edit member:', member.id);
                }}
              >
                <img src={icons.edit} alt="Edit" className="w-4 h-4 mr-2" />
                Edit Member
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {member.picture ? (
                  <img 
                    src={member.picture} 
                    alt={member.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-semibold" style={{ display: member.picture ? 'none' : 'flex' }}>
                  {member.full_name?.charAt(0)?.toUpperCase() || 'M'}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{member.full_name}</h2>
                <p className="text-gray-600 mb-1">Member Code: {member.member_code}</p>
                <p className="text-gray-600 mb-3">Username: {member.username}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Status:</span>
                  {getStatusBadge(member.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-sm text-gray-900">{member.email || '-'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                    <p className="text-sm text-gray-900">{member.phone_number || '-'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                    <p className="text-sm text-gray-900">{formatDate(member.dob)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                    <p className="text-sm text-gray-900">{member.address || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Additional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Date of Join</label>
                    <p className="text-sm text-gray-900">{formatDate(member.date_of_join)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Member ID</label>
                    <p className="text-sm text-gray-900 font-mono">{member.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Statistics */}
            {member.sessionStats && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Session Statistics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {member.sessionStats.totalSessions || 0}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Total Sessions</div>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {member.sessionStats.totalUsedSessions || 0}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Used Sessions</div>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {member.sessionStats.totalRemainingSessions || 0}
                    </div>
                    <div className="text-sm text-orange-600 font-medium">Remaining Sessions</div>
                  </div>
                </div>

                {/* Session Breakdown */}
                {member.sessionStats.sessionBreakdown && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Session Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-700 mb-1">
                          {member.sessionStats.sessionBreakdown.group?.remaining || 0}
                        </div>
                        <div className="text-sm text-gray-600">Group Sessions Remaining</div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-700 mb-1">
                          {member.sessionStats.sessionBreakdown.semi_private?.remaining || 0}
                        </div>
                        <div className="text-sm text-gray-600">Semi-Private Sessions Remaining</div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-700 mb-1">
                          {member.sessionStats.sessionBreakdown.private?.remaining || 0}
                        </div>
                        <div className="text-sm text-gray-600">Private Sessions Remaining</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail; 