import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@components/ui';
import { useApiToast } from '@shared/hooks';
import { apiClient } from '@shared/services';

const PackageForm = ({ 
  isOpen, 
  onClose, 
  packageData = null, 
  category = 'membership',
  categories = [],
  onSubmit,
  loading = false
}) => {
  const { showToast } = useApiToast();
  const isEdit = !!packageData;

  // Form state untuk semua kategori
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    session: '',
    duration_value: '',
    duration_unit: 'week',
    reminder_day: '',
    reminder_session: '',
    category_id: '',
    member_id: '', // Hanya untuk bonus package
    start_time: '', // Hanya untuk promo package
    end_time: '', // Hanya untuk promo package
    group_session: '', // Hanya untuk trial, promo, bonus
    private_session: '', // Hanya untuk trial, promo, bonus
  });

  const [errors, setErrors] = useState({});

  // Duration unit options
  const durationUnits = [
    { value: 'day', label: 'Day(s)' },
    { value: 'week', label: 'Week(s)' },
    { value: 'month', label: 'Month(s)' },
    { value: 'year', label: 'Year(s)' }
  ];

  // Tambahkan state untuk search member
  const [memberOptions, setMemberOptions] = useState([]);
  const [memberSearch, setMemberSearch] = useState('');
  const [memberLoading, setMemberLoading] = useState(false);

  // Fetch member saat user mengetik
  useEffect(() => {
    let ignore = false;
    const fetchMembers = async () => {
      if (memberSearch.length < 2) {
        setMemberOptions([]);
        return;
      }
      setMemberLoading(true);
      try {
        const res = await apiClient.get('/api/bonus-package/members/search', { params: { search: memberSearch } });
        if (!ignore) {
          setMemberOptions(res.data || []);
        }
      } catch (e) {
        if (!ignore) setMemberOptions([]);
      } finally {
        if (!ignore) setMemberLoading(false);
      }
    };
    fetchMembers();
    return () => { ignore = true; };
  }, [memberSearch]);

  // Reset form when modal opens/closes or packageData changes
  useEffect(() => {
    if (isOpen) {
      if (packageData) {
        setFormData({
          name: packageData.name || '',
          price: packageData.price || '',
          session: packageData.session || '',
          duration_value: packageData.duration_value || '',
          duration_unit: packageData.duration_unit || 'week',
          reminder_day: packageData.reminder_day || '',
          reminder_session: packageData.reminder_session || '',
          category_id: packageData.category?.id || '',
          member_id: packageData.member_id || (packageData.members?.[0]?.id ?? ''),
          start_time: packageData.start_time || '',
          end_time: packageData.end_time || '',
          group_session: packageData.group_session || '',
          private_session: packageData.private_session || '',
        });
        // Untuk bonus, set memberSearch ke nama member
        if (packageData.members?.[0]?.name) {
          setMemberSearch(packageData.members[0].name);
        } else {
          setMemberSearch('');
        }
      } else {
        setFormData({
          name: '',
          price: '',
          session: '',
          duration_value: '',
          duration_unit: 'week',
          reminder_day: '',
          reminder_session: '',
          category_id: '',
          member_id: '',
          start_time: '',
          end_time: '',
          group_session: '',
          private_session: '',
        });
        setMemberSearch('');
      }
      setErrors({});
    }
  }, [isOpen, packageData, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi berdasarkan kategori
    if (category === 'bonus') {
      // Hanya validasi member, group_session, private_session, duration
      if (!formData.member_id) {
        newErrors.member_id = 'Member wajib diisi';
      }
      if (!formData.group_session || formData.group_session <= 0) {
        newErrors.group_session = 'Jumlah group session harus lebih dari 0';
      }
      if (!formData.private_session || formData.private_session <= 0) {
        newErrors.private_session = 'Jumlah private session harus lebih dari 0';
      }
      if (!formData.duration_value || formData.duration_value <= 0) {
        newErrors.duration_value = 'Durasi harus lebih dari 0';
      }
      if (!formData.duration_unit) {
        newErrors.duration_unit = 'Satuan durasi wajib diisi';
      }
    } else {
      // Validasi umum
      if (!formData.name.trim()) {
        newErrors.name = 'Package name is required';
      }

      if (!formData.price || formData.price <= 0) {
        newErrors.price = 'Price must be greater than 0';
      }

      if (!formData.duration_value || formData.duration_value <= 0) {
        newErrors.duration_value = 'Duration value must be greater than 0';
      }

      if (!formData.duration_unit) {
        newErrors.duration_unit = 'Duration unit is required';
      }

      if (formData.reminder_day && formData.reminder_day < 0) {
        newErrors.reminder_day = 'Reminder day cannot be negative';
      }

      if (formData.reminder_session && formData.reminder_session < 0) {
        newErrors.reminder_session = 'Reminder session cannot be negative';
      }

      // Validasi berdasarkan kategori
      if (category === 'membership') {
        if (!formData.session || formData.session <= 0) {
          newErrors.session = 'Session count must be greater than 0';
        }
        if (!formData.category_id) {
          newErrors.category_id = 'Category is required';
        }
      }

      if (category === 'trial') {
        if (!formData.group_session || formData.group_session <= 0) {
          newErrors.group_session = 'Group session count must be greater than 0';
        }
        if (!formData.private_session || formData.private_session <= 0) {
          newErrors.private_session = 'Private session count must be greater than 0';
        }
        // Tidak perlu validasi category_id
      }

      if (category === 'promo') {
        if (!formData.group_session || formData.group_session <= 0) {
          newErrors.group_session = 'Group session count must be greater than 0';
        }
        if (!formData.private_session || formData.private_session <= 0) {
          newErrors.private_session = 'Private session count must be greater than 0';
        }
        // Tidak perlu validasi category_id
        if (!formData.start_time) {
          newErrors.start_time = 'Promo start date is required';
        }
        if (!formData.end_time) {
          newErrors.end_time = 'Promo end date is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    // Jika member_id kosong pada bonus, reset memberSearch agar user sadar harus memilih
    if (category === 'bonus' && !formData.member_id) {
      setMemberSearch('');
    }
    if (valid) {
      // Siapkan data sesuai kategori
      const submitData = { ...formData };
      
      // Hapus field yang tidak diperlukan untuk kategori tertentu
      if (category === 'membership') {
        delete submitData.group_session;
        delete submitData.private_session;
        delete submitData.start_time;
        delete submitData.end_time;
        delete submitData.member_id;
      }
      
      if (category === 'trial') {
        delete submitData.session;
        delete submitData.start_time;
        delete submitData.end_time;
        delete submitData.member_id;
      }
      
      if (category === 'promo') {
        delete submitData.session;
        delete submitData.member_id;
      }
      
      if (category === 'bonus') {
        delete submitData.session;
        delete submitData.start_time;
        delete submitData.end_time;
      }
      
      onSubmit(submitData);
    }
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'membership': return 'Membership';
      case 'trial': return 'First Time Trial';
      case 'promo': return 'Promo';
      case 'bonus': return 'Bonus';
      default: return 'Package';
    }
  };

  const renderMembershipForm = () => (
    <>
      {/* Package Name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Package Name *
        </label>
        <div className="flex-1">
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter package name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Price *
        </label>
        <div className="flex-1">
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter price"
            min="0"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
      </div>

      {/* Session Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="session" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Session Count *
        </label>
        <div className="flex-1">
          <input
            id="session"
            name="session"
            type="number"
            value={formData.session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter number of sessions"
            min="1"
          />
          {errors.session && <p className="mt-1 text-sm text-red-600">{errors.session}</p>}
        </div>
      </div>

      {/* Duration */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Duration *
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="duration_value"
            type="number"
            value={formData.duration_value}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.duration_value ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Duration value"
            min="1"
          />
          <select
            name="duration_unit"
            value={formData.duration_unit}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {durationUnits.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </div>
      {(errors.duration_value || errors.duration_unit) && (
        <div className="sm:ml-44">
          {errors.duration_value && <p className="text-sm text-red-600">{errors.duration_value}</p>}
          {errors.duration_unit && <p className="text-sm text-red-600">{errors.duration_unit}</p>}
        </div>
      )}

      {/* Reminders */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Reminders
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="reminder_day"
            type="number"
            value={formData.reminder_day}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.reminder_day ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Days before expiry"
            min="0"
          />
          <input
            name="reminder_session"
            type="number"
            value={formData.reminder_session}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.reminder_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Sessions remaining"
            min="0"
          />
        </div>
      </div>
      {(errors.reminder_day || errors.reminder_session) && (
        <div className="sm:ml-44">
          {errors.reminder_day && <p className="text-sm text-red-600">{errors.reminder_day}</p>}
          {errors.reminder_session && <p className="text-sm text-red-600">{errors.reminder_session}</p>}
        </div>
      )}

      {/* Category */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Category *
        </label>
        <div className="flex-1">
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.category_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
        </div>
      </div>
    </>
  );

  const renderTrialForm = () => (
    <>
      {/* Package Name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Package Name *
        </label>
        <div className="flex-1">
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter package name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Price *
        </label>
        <div className="flex-1">
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter price"
            min="0"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
      </div>

      {/* Group Sessions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Group Sessions *
        </label>
        <div className="flex-1">
          <input
            name="group_session"
            type="number"
            value={formData.group_session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 focus:ring-primary ${
              errors.group_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Group sessions"
            min="1"
          />
          {errors.group_session && <p className="mt-1 text-sm text-red-600">{errors.group_session}</p>}
        </div>
      </div>

      {/* Private Sessions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Private Sessions *
        </label>
        <div className="flex-1">
          <input
            name="private_session"
            type="number"
            value={formData.private_session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 focus:ring-primary ${
              errors.private_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Private sessions"
            min="1"
          />
          {errors.private_session && <p className="mt-1 text-sm text-red-600">{errors.private_session}</p>}
        </div>
      </div>

      {/* Duration */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Duration *
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="duration_value"
            type="number"
            value={formData.duration_value}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.duration_value ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Duration value"
            min="1"
          />
          <select
            name="duration_unit"
            value={formData.duration_unit}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {durationUnits.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </div>
      {(errors.duration_value || errors.duration_unit) && (
        <div className="sm:ml-44">
          {errors.duration_value && <p className="text-sm text-red-600">{errors.duration_value}</p>}
          {errors.duration_unit && <p className="text-sm text-red-600">{errors.duration_unit}</p>}
        </div>
      )}

      {/* Reminders */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Reminders
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="reminder_day"
            type="number"
            value={formData.reminder_day}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.reminder_day ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Days before expiry"
            min="0"
          />
          <input
            name="reminder_session"
            type="number"
            value={formData.reminder_session}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.reminder_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Sessions remaining"
            min="0"
          />
        </div>
      </div>
      {(errors.reminder_day || errors.reminder_session) && (
        <div className="sm:ml-44">
          {errors.reminder_day && <p className="text-sm text-red-600">{errors.reminder_day}</p>}
          {errors.reminder_session && <p className="text-sm text-red-600">{errors.reminder_session}</p>}
        </div>
      )}

    </>
  );

  const renderPromoForm = () => (
    <>
      {/* Package Name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Package Name *
        </label>
        <div className="flex-1">
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter package name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Price *
        </label>
        <div className="flex-1">
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter price"
            min="0"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
      </div>

      {/* Group Sessions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Group Sessions *
        </label>
        <div className="flex-1">
          <input
            name="group_session"
            type="number"
            value={formData.group_session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.group_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Group sessions"
            min="1"
          />
        </div>
      </div>
      {/* Private Sessions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Private Sessions *
        </label>
        <div className="flex-1">
          <input
            name="private_session"
            type="number"
            value={formData.private_session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.private_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Private sessions"
            min="1"
          />
        </div>
      </div>
      {(errors.group_session || errors.private_session) && (
        <div className="sm:ml-44">
          {errors.group_session && <p className="text-sm text-red-600">{errors.group_session}</p>}
          {errors.private_session && <p className="text-sm text-red-600">{errors.private_session}</p>}
        </div>
      )}

      {/* Duration */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Duration *
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="duration_value"
            type="number"
            value={formData.duration_value}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.duration_value ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Duration value"
            min="1"
          />
          <select
            name="duration_unit"
            value={formData.duration_unit}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {durationUnits.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </div>
      {(errors.duration_value || errors.duration_unit) && (
        <div className="sm:ml-44">
          {errors.duration_value && <p className="text-sm text-red-600">{errors.duration_value}</p>}
          {errors.duration_unit && <p className="text-sm text-red-600">{errors.duration_unit}</p>}
        </div>
      )}

      {/* Promo Period */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Promo Period *
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="start_time"
            type="date"
            value={formData.start_time}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.start_time ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
          />
          <input
            name="end_time"
            type="date"
            value={formData.end_time}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.end_time ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
          />
        </div>
      </div>
      {(errors.start_time || errors.end_time) && (
        <div className="sm:ml-44">
          {errors.start_time && <p className="text-sm text-red-600">{errors.start_time}</p>}
          {errors.end_time && <p className="text-sm text-red-600">{errors.end_time}</p>}
        </div>
      )}

      {/* Reminders */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Reminders
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="reminder_day"
            type="number"
            value={formData.reminder_day}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.reminder_day ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Days before expiry"
            min="0"
          />
          <input
            name="reminder_session"
            type="number"
            value={formData.reminder_session}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.reminder_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Sessions remaining"
            min="0"
          />
        </div>
      </div>
      {(errors.reminder_day || errors.reminder_session) && (
        <div className="sm:ml-44">
          {errors.reminder_day && <p className="text-sm text-red-600">{errors.reminder_day}</p>}
          {errors.reminder_session && <p className="text-sm text-red-600">{errors.reminder_session}</p>}
        </div>
      )}

      {/* Category */}
      {/* (hapus input kategori di sini) */}
    </>
  );

  const renderBonusForm = () => (
    <>
      {/* Member Search Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="member_id" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Member *
        </label>
        <div className="flex-1 relative">
          <input
            id="member_id"
            name="member_id"
            type="text"
            autoComplete="off"
            value={memberOptions.find(m => m.id === formData.member_id)?.full_name || memberSearch}
            onChange={e => {
              setMemberSearch(e.target.value);
              setFormData(prev => ({ ...prev, member_id: '' }));
            }}
            onFocus={() => setMemberOptions([])}
            placeholder="Cari nama member..."
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.member_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}`}
          />
          {/* Dropdown */}
          {memberSearch.length >= 2 && memberOptions.length > 0 && !formData.member_id && (
            <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-56 overflow-auto shadow-lg">
              {memberOptions.map(member => (
                <li
                  key={member.id}
                  className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, member_id: member.id }));
                    setMemberSearch(member.full_name);
                    setMemberOptions([]);
                  }}
                >
                  <div className="font-medium">{member.full_name}</div>
                  <div className="text-xs text-gray-500">{member.email} | {member.username}</div>
                </li>
              ))}
            </ul>
          )}
          {memberLoading && <div className="absolute right-2 top-2 text-xs text-gray-400">Loading...</div>}
          {errors.member_id && <p className="mt-1 text-sm text-red-600">{errors.member_id}</p>}
        </div>
      </div>
      {/* Group Sessions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Group Sessions *
        </label>
        <div className="flex-1">
          <input
            name="group_session"
            type="number"
            value={formData.group_session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.group_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}`}
            placeholder="Group sessions"
            min="1"
          />
          {errors.group_session && <p className="mt-1 text-sm text-red-600">{errors.group_session}</p>}
        </div>
      </div>
      {/* Private Sessions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Private Sessions *
        </label>
        <div className="flex-1">
          <input
            name="private_session"
            type="number"
            value={formData.private_session}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.private_session ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}`}
            placeholder="Private sessions"
            min="1"
          />
          {errors.private_session && <p className="mt-1 text-sm text-red-600">{errors.private_session}</p>}
        </div>
      </div>
      {/* Duration */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
          Duration *
        </label>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            name="duration_value"
            type="number"
            value={formData.duration_value}
            onChange={handleChange}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.duration_value ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Duration value"
            min="1"
          />
          <select
            name="duration_unit"
            value={formData.duration_unit}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {durationUnits.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </div>
      {(errors.duration_value || errors.duration_unit) && (
        <div className="sm:ml-44">
          {errors.duration_value && <p className="text-sm text-red-600">{errors.duration_value}</p>}
          {errors.duration_unit && <p className="text-sm text-red-600">{errors.duration_unit}</p>}
        </div>
      )}

     

      
    </>
  );

  const renderFormByCategory = () => {
    switch (category) {
      case 'membership':
        return renderMembershipForm();
      case 'trial':
        return renderTrialForm();
      case 'promo':
        return renderPromoForm();
      case 'bonus':
        return renderBonusForm();
      default:
        return renderMembershipForm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isEdit ? 'Edit' : 'Add'} ${getCategoryTitle()} Package`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFormByCategory()}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {isEdit ? 'Save' : `Create ${getCategoryTitle()} Package`}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PackageForm; 