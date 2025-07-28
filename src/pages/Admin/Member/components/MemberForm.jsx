import React from 'react';
import { Button } from '@components/ui';

const MemberForm = ({ initialValues = {}, onSubmit, onCancel, loading }) => {
  const [form, setForm] = React.useState({
    full_name: initialValues.full_name || '',
    username: initialValues.username || '',
    email: initialValues.email || '',
    phone_number: initialValues.phone_number || '',
    dob: initialValues.dob || '',
    address: initialValues.address || '',
    status: initialValues.status || 'active',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Nama Lengkap</label>
        <input name="full_name" value={form.full_name} onChange={handleChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1">Username</label>
        <input name="username" value={form.username} onChange={handleChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className="input" type="email" required />
      </div>
      <div>
        <label className="block mb-1">No HP</label>
        <input name="phone_number" value={form.phone_number} onChange={handleChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1">Tanggal Lahir</label>
        <input name="dob" value={form.dob} onChange={handleChange} className="input" type="date" />
      </div>
      <div>
        <label className="block mb-1">Alamat</label>
        <input name="address" value={form.address} onChange={handleChange} className="input" />
      </div>
      <div>
        <label className="block mb-1">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="input">
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Batal</Button>
        <Button type="submit" variant="primary" loading={loading}>Simpan</Button>
      </div>
    </form>
  );
};

export default MemberForm; 