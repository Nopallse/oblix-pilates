import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input, Modal } from '@components/ui';
import { useMember } from './api/useMember';
import { MemberForm } from './components';
import { icons } from '@shared/utils/assets';

const statusOptions = [
  { value: '', label: 'Semua Status' },
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Tidak Aktif' },
];

const Member = () => {
  const { members, pagination, loading, error, fetchMembers } = useMember();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchMembers({ page, search, status });
  }, [fetchMembers, page, search, status]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleDetail = (row) => {
    navigate(`/admin/member/${row.id}`);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  // Dummy submit handler
  const handleSubmit = (data) => {
    // TODO: Call API create/update
    setShowForm(false);
    setEditData(null);
    fetchMembers({ page, search, status });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format status
  const formatStatus = (status) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Aktif
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Tidak Aktif
      </span>
    );
  };

  // Columns configuration
  const columns = [
    { 
      key: 'no', 
      header: 'No', 
      span: 1, 
      render: (v, r, i) => <span>{(pagination.current_page - 1) * pagination.per_page + i + 1}</span>, 
      className: 'text-center w-12' 
    },
    { 
      key: 'full_name', 
      header: 'Nama Lengkap', 
      span: 2, 
      render: v => <span className="font-medium text-gray-900">{v}</span> 
    },
    { 
      key: 'email', 
      header: 'Email', 
      span: 3, 
      render: (v, r) => <span>{r.User?.email || '-'}</span> 
    },
    { 
      key: 'date_of_join', 
      header: 'Join Date', 
      span: 2, 
      render: v => <span>{formatDate(v)}</span> 
    },
    { 
      key: 'status', 
      header: 'Status', 
      span: 2, 
      render: v => formatStatus(v),
      className: 'text-center'
    },
    {
      key: 'actions',
      header: '',
      span: 2,
      render: (v, r) => (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="primary"
            size="small"
            onClick={() => handleDetail(r)}
          >
            View Details
          </Button>
        </div>
      )
    }
  ];

  // Transform data for table
  const tableData = members.map((item, index) => ({
    ...item,
    no: index + 1,
    actions: '',
  }));

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Member</h1>
          <Button
            variant="primary"
            size="medium"
            onClick={handleAdd}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <Input
            placeholder="Cari nama, username, kode, atau no HP"
            value={search}
            onChange={handleSearch}
            className="w-full sm:w-64"
          />
          <select 
            value={status} 
            onChange={handleStatusChange} 
            className="w-full sm:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg w-full">
          <Table
            columns={columns}
            data={tableData}
            loading={loading}
            emptyMessage="Tidak ada data member."
          />
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 items-center gap-2">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="mx-2 text-sm text-gray-600">
            {pagination.current_page || 1} / {pagination.total_pages || 1}
          </span>
          <Button
            variant="outline"
            disabled={!pagination.has_next}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal Form */}
      <Modal open={showForm} onClose={handleCloseForm} title={editData ? 'Edit Member' : 'Tambah Member'}>
        <MemberForm
          initialValues={editData || {}}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
          loading={false}
        />
      </Modal>
    </div>
  );
};

export default Member; 