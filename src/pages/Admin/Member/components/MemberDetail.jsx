import React, { useState, useEffect } from 'react';
import { Modal } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';

const MemberDetail = ({ isOpen, onClose, memberId }) => {
  const { showToast } = useApiToast();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch member detail when modal opens
  useEffect(() => {
    if (isOpen && memberId) {
      fetchMemberDetail();
    }
  }, [isOpen, memberId]);

  const fetchMemberDetail = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/member/${memberId}`);
      
      if (response.success) {
        setMember(response.data);
        console.log('📋 Member detail loaded:', response.data);
      } else {
        showToast('Failed to load member detail', 'error');
      }
    } catch (error) {
      console.error('Error fetching member detail:', error);
      showToast('Failed to load member detail', 'error');
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

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Member Detail">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading member detail...</span>
        </div>
      ) : member ? (
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
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
          </div>

          {/* Member Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Member Code</label>
                  <p className="text-sm text-gray-900 font-medium">{member.member_code || '-'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-sm text-gray-900 font-medium">{member.full_name || '-'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Username</label>
                  <p className="text-sm text-gray-900">{member.username || '-'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm text-gray-900">{member.email || '-'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-sm text-gray-900">{member.phone_number || '-'}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Additional Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-sm text-gray-900">{formatDate(member.dob)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date of Join</label>
                  <p className="text-sm text-gray-900">{formatDate(member.date_of_join)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(member.status)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Address</label>
                  <p className="text-sm text-gray-900">{member.address || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Statistics (if available) */}
          {member.sessionStats && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Session Statistics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {member.sessionStats.totalSessions || 0}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Total Sessions</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {member.sessionStats.totalUsedSessions || 0}
                  </div>
                  <div className="text-sm text-green-600 font-medium">Used Sessions</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {member.sessionStats.totalRemainingSessions || 0}
                  </div>
                  <div className="text-sm text-orange-600 font-medium">Remaining Sessions</div>
                </div>
              </div>

              {/* Session Breakdown */}
              {member.sessionStats.sessionBreakdown && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Session Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-gray-700">
                        {member.sessionStats.sessionBreakdown.group?.remaining || 0}
                      </div>
                      <div className="text-xs text-gray-600">Group Sessions Remaining</div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-gray-700">
                        {member.sessionStats.sessionBreakdown.semi_private?.remaining || 0}
                      </div>
                      <div className="text-xs text-gray-600">Semi-Private Sessions Remaining</div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-gray-700">
                        {member.sessionStats.sessionBreakdown.private?.remaining || 0}
                      </div>
                      <div className="text-xs text-gray-600">Private Sessions Remaining</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Close
            </button>
            <button
              onClick={() => {
                // TODO: Implement edit functionality
                console.log('Edit member:', member.id);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Edit Member
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500">No member data available</div>
        </div>
      )}
    </Modal>
  );
};

export default MemberDetail; 