import React, { useEffect, useState, useCallback } from 'react';
import { icons } from '../../../shared/utils/assets';
import Button from '../../../components/ui/Button/Button';
import Table from '../../../components/ui/Table/Table';
import Input from '../../../components/ui/Input/Input';
import StaffForm from './components/StaffForm';
import { useStaff } from './api';

const Staff = () => {
  const {
    staff,
    loading,
    error,
    pagination,
    search,
    loadStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    searchStaff,
    changePage,
  } = useStaff();

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadStaff();
  }, []);

  // Debounced search
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        if (query.trim()) {
          setIsSearching(true);
        }
        timeoutId = setTimeout(() => {
          searchStaff(query);
          setIsSearching(false);
        }, 500);
      };
    })(),
    [searchStaff]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      let result;
      if (selectedStaff) {
        // Update staff
        result = await updateStaff(selectedStaff.id, formData);
      } else {
        // Create staff
        result = await createStaff(formData);
      }

      if (result.success) {
        setIsFormOpen(false);
        setSelectedStaff(null);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle edit staff
  const handleEdit = (staffItem) => {
    setSelectedStaff(staffItem);
    setIsFormOpen(true);
  };

  // Handle delete staff
  const handleDelete = async (staffItem) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus staff "${staffItem.full_name}"?`)) {
      try {
        await deleteStaff(staffItem.id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  // Handle add new staff
  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsFormOpen(true);
  };



  // Table columns
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
      key: 'username', 
      header: 'Username', 
      span: 2, 
      render: v => <span className="text-gray-700">{v}</span> 
    },
    { 
      key: 'email', 
      header: 'Email', 
      span: 3, 
      render: v => <span className="text-gray-700">{v}</span> 
    },
    { 
      key: 'phone_number', 
      header: 'No. Telepon', 
      span: 2, 
      render: v => <span className="text-gray-700">{v}</span> 
    },
    { 
      key: 'actions', 
      span: 2, 
      render: (v, r) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded transition-colors duration-200" 
            title={`Edit ${r.full_name}`}
            aria-label="Edit"
            onClick={() => handleEdit(r)}
          >
            <img src={icons.edit} alt="Edit" className="w-5 h-5" />
          </button>
          <button 
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded transition-colors duration-200" 
            title={`Hapus ${r.full_name}`}
            aria-label="Delete"
            onClick={() => handleDelete(r)}
          >
            <img src={icons.delete} alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  // Table data
  const tableData = staff.map((item) => ({
    ...item,
    actions: '',
  }));

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Staff Management</h1>
          <Button
            variant="primary"
            size="medium"
            onClick={handleAddStaff}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
            Add Staff
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md relative">
              <Input
                placeholder="Cari staff berdasarkan nama, username, atau email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12"
              />
              {/* Ikon cari */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.94446 3.23052C5.41597 3.23052 2.55556 6.19495 2.55556 9.85174C2.55556 13.5085 5.41597 16.473 8.94446 16.473C10.7091 16.473 12.3045 15.7334 13.462 14.5336C14.6197 13.334 15.3334 11.6805 15.3334 9.85174C15.3334 6.19495 12.4729 3.23052 8.94446 3.23052ZM0 9.85174C0 4.73223 4.00457 0.582031 8.94446 0.582031C13.8844 0.582031 17.8889 4.73223 17.8889 9.85174C17.8889 11.9333 17.2257 13.8561 16.1081 15.4031L22.6258 22.1578C23.1247 22.6749 23.1247 23.5134 22.6258 24.0306C22.1268 24.5477 21.3177 24.5477 20.8187 24.0306L14.301 17.2759C12.8083 18.4342 10.953 19.1215 8.94446 19.1215C4.00457 19.1215 0 14.9713 0 9.85174Z" fill="#6C6C6C"/>
                </svg>
              </div>
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
            {search && (
              <Button
                type="button"
                variant="outline"
                size="medium"
                onClick={() => {
                  setSearchQuery('');
                  searchStaff('');
                }}
                disabled={isSearching}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Data Info */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Menampilkan {staff.length} dari {pagination.total_items} staff
            {search && ` untuk pencarian "${search}"`}
          </div>
        </div>

        <div className="bg-white rounded-lg w-full">
          <Table
            columns={columns}
            data={tableData}
            loading={loading}
            emptyMessage="Tidak ada data staff."
          />
        </div>

        {/* Pagination */}
        {pagination.total_pages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Halaman {pagination.current_page} dari {pagination.total_pages}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => changePage(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                Sebelumnya
              </Button>
              
              <Button
                variant="outline"
                size="small"
                onClick={() => changePage(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Staff Form Modal */}
      <StaffForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedStaff(null);
        }}
        staffData={selectedStaff}
        onSubmit={handleFormSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Staff; 