import React, { useEffect, useState } from 'react';
import { icons } from '../../../shared/utils/assets';
import Button from '../../../components/ui/Button/Button';
import Table from '../../../components/ui/Table/Table';
import PackageForm from './components/PackageForm';
import { usePackage } from './api';

const Package = () => {
  const {
    packages,
    categories,
    loading,
    error,
    pagination,
    currentCategory,
    loadPackages,
    loadCategories,
    changeCategory,
    createPackage,
    updatePackage,
    deletePackage,
  } = usePackage();

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    loadPackages(currentCategory, pagination.current_page, pagination.per_page);
    loadCategories();
    // eslint-disable-next-line
  }, [currentCategory]);

  // Format currency
  const formatCurrency = (value) => {
    const num = Number(value);
    return isNaN(num)
      ? '-'
      : new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(num);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      let result;
      if (selectedPackage) {
        // Update package
        result = await updatePackage(selectedPackage.id, formData);
      } else {
        // Create package
        result = await createPackage(formData);
      }

      if (result.success) {
        setIsFormOpen(false);
        setSelectedPackage(null);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle edit package
  const handleEdit = (packageItem) => {
    console.log('🔧 Edit package clicked:', packageItem);
    console.log('📅 Package dates for edit:', {
      start_time: packageItem.start_time,
      end_time: packageItem.end_time,
      category: currentCategory
    });
    setSelectedPackage(packageItem);
    setIsFormOpen(true);
  };

  // Handle delete package
  const handleDelete = async (packageItem) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(packageItem.id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  // Handle add new package
  const handleAddPackage = () => {
    setSelectedPackage(null);
    setIsFormOpen(true);
  };

  // Kolom dinamis sesuai kategori
  const getColumnsByCategory = (category) => {
    
    if (category === 'membership') {
      return [
        { 
          key: 'no', 
          header: 'No', 
          span: 1, 
          render: (v, r, i) => <span>{(pagination.current_page - 1) * pagination.per_page + i + 1}</span>, 
          className: 'text-center w-12' 
        },
        { 
          key: 'name', 
          header: 'Nama Paket', 
          span: 3, 
          render: v => <span className="font-medium text-gray-900">{v}</span> 
        },
        { 
          key: 'session', 
          header: 'Sesi', 
          span: 2, 
          render: v => <span>{v ?? '-'}</span>, 
          className: 'text-center' 
        },
        { 
          key: 'category', 
          header: 'Kategori', 
          span: 2, 
          render: (v, r) => <span>{r.category?.name ?? '-'}</span>, 
          className: 'text-center' 
        },
        { 
          key: 'price', 
          header: 'Harga', 
          span: 2, 
          render: v => <span className="font-semibold">{formatCurrency(v)}</span> 
        },
        { 
          key: 'actions', 
          span: 2, 
          render: (v, r) => (
            <div className="flex items-center justify-end space-x-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded" 
                title="Edit" 
                aria-label="Edit"
                onClick={() => handleEdit(r)}
              >
                <img src={icons.edit} alt="Edit" className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded" 
                title="Hapus" 
                aria-label="Delete"
                onClick={() => handleDelete(r)}
              >
                <img src={icons.delete} alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          ) 
        }
      ];
    }
    if (category === 'trial') {
      return [
        { key: 'no', header: 'No', span: 1, render: (v, r, i) => <span>{(pagination.current_page - 1) * pagination.per_page + i + 1}</span>, className: 'text-center w-12' },
        { key: 'name', header: 'Nama Paket', span: 3, render: v => <span className="font-medium text-gray-900">{v}</span> },
        { key: 'group_session', header: 'Sesi Grup', span: 2, render: v => <span>{v ?? '-'}</span>, className: 'text-center' },
        { key: 'private_session', header: 'Sesi Privat', span: 2, render: v => <span>{v ?? '-'}</span>, className: 'text-center' },
        { key: 'price', header: 'Harga', span: 2, render: v => <span className="font-semibold">{formatCurrency(v)}</span> },
        { key: 'actions', span: 2, render: (v, r) => (
          <div className="flex items-center justify-end space-x-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded" 
              title="Edit" 
              aria-label="Edit"
              onClick={() => handleEdit(r)}
            >
              <img src={icons.edit} alt="Edit" className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded" 
              title="Hapus" 
              aria-label="Delete"
              onClick={() => handleDelete(r)}
            >
              <img src={icons.delete} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        ) }
      ];
    }
    if (category === 'promo') {
      return [
        { key: 'no', header: 'No', span: 1, render: (v, r, i) => <span>{(pagination.current_page - 1) * pagination.per_page + i + 1}</span>, className: 'text-center w-12' },
        { key: 'name', header: 'Nama Paket', span: 2, render: v => <span className="font-medium text-gray-900">{v}</span> },
        { 
          key: 'start_time', 
          header: 'Mulai Promo', 
          span: 2, 
          render: v => (
            <span>
              {v ? new Date(v).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
            </span>
          ) 
        },
        { 
          key: 'end_time', 
          header: 'Akhir Promo', 
          span: 2, 
          render: v => (
            <span>
              {v ? new Date(v).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
            </span>
          ) 
        },
        { key: 'group_session', header: 'Grup', span: 1, render: v => <span>{v ?? '-'}</span>, className: 'text-center' },
        { key: 'private_session', header: 'Privat', span: 1, render: v => <span>{v ?? '-'}</span>, className: 'text-center' },
        { key: 'price', header: 'Harga', span: 1, render: v => <span className="font-semibold">{formatCurrency(v)}</span> },
        { key: 'actions', span: 2, render: (v, r) => (
          <div className="flex items-center justify-end space-x-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded" 
              title="Edit" 
              aria-label="Edit"
              onClick={() => handleEdit(r)}
            >
              <img src={icons.edit} alt="Edit" className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded" 
              title="Hapus" 
              aria-label="Delete"
              onClick={() => handleDelete(r)}
            >
              <img src={icons.delete} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        ) }
      ];
    }
    if (category === 'bonus') {
      return [
        { key: 'no', header: 'No', span: 1, render: (v, r, i) => <span>{(pagination.current_page - 1) * pagination.per_page + i + 1}</span>, className: 'text-center w-12' },
        { key: 'member_name', header: 'Nama Member', span: 3, render: v => <span className="font-medium text-gray-900">{v}</span> },
        { key: 'group_session', header: 'Sesi Grup', span: 3, render: v => <span>{v ?? '-'}</span>, className: 'text-center' },
        { key: 'private_session', header: 'Sesi Privat', span: 3, render: v => <span>{v ?? '-'}</span>, className: 'text-center' },
        { key: 'actions', span: 2, render: (v, r) => (
          <div className="flex items-center justify-end space-x-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded" 
              title="Edit" 
              aria-label="Edit"
              onClick={() => handleEdit(r)}
            >
              <img src={icons.edit} alt="Edit" className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded" 
              title="Hapus" 
              aria-label="Delete"
              onClick={() => handleDelete(r)}
            >
              <img src={icons.delete} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        ) }
      ];
    }
    return [];
  };

  // Mapping data sesuai kategori
  const tableData = packages.map((item, idx) => {
    if (currentCategory === 'bonus') {
      return {
        ...item,
        member_name: item.members?.[0]?.name ?? '-',
        group_session: item.group_session ?? '-',
        private_session: item.private_session ?? '-',
        actions: '',
      };
    }
    if (currentCategory === 'promo') {
      return {
        ...item,
        start_time: item.start_time ?? '-',
        end_time: item.end_time ?? '-',
        group_session: item.group_session ?? '-',
        private_session: item.private_session ?? '-',
        actions: '',
      };
    }
    // membership & trial
    return {
      ...item,
      group_session: item.group_session ?? '-',
      private_session: item.private_session ?? '-',
      actions: '',
    };
  });

  // Kategori
  const packageCategories = [
    { value: 'membership', label: 'Membership' },
    { value: 'trial', label: 'First Time Trial' },
    { value: 'promo', label: 'Promo' },
    { value: 'bonus', label: 'Bonus' }
  ];

  const columns = getColumnsByCategory(currentCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Package</h1>
          <Button
            variant="primary"
            size="medium"
            onClick={handleAddPackage}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
            Add Package
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          {packageCategories.map((cat) => (
              <button
              key={cat.value}
              onClick={() => changeCategory(cat.value)}
              className={`px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base duration-150 ${
                currentCategory === cat.value
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {cat.label}
              </button>
            ))}
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="bg-white rounded-lg w-full">
          <Table
            columns={columns}
            data={tableData}
            loading={loading}
            emptyMessage="Tidak ada data package."
          />
        </div>
      </div>

      {/* Package Form Modal */}
      <PackageForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedPackage(null);
        }}
        packageData={selectedPackage}
        category={currentCategory}
        categories={categories}
        onSubmit={handleFormSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Package; 