# Custom Dropdown Component

## Deskripsi
Membuat custom dropdown component yang mirip dengan input variant soft dan mendukung fitur search.

## Tanggal
Juli 2025

## Status
✅ Selesai

## File yang Dibuat/Dimodifikasi

### File Baru
- `src/components/ui/Dropdown/Dropdown.jsx` - Component dropdown custom
- `src/components/ui/Dropdown/index.js` - Export file
- `docs/002_create_custom_dropdown_component.md` - Dokumentasi ini

### File Dimodifikasi
- `src/components/ui/index.js` - Menambahkan export Dropdown
- `src/pages/Admin/Schedule/components/GroupScheduleForm.jsx` - Menggunakan dropdown component

## Fitur Dropdown Component

### Props
- `options` - Array of objects dengan `value` dan `label`
- `value` - Value yang dipilih
- `onChange` - Callback function ketika value berubah
- `placeholder` - Placeholder text
- `searchable` - Boolean untuk mengaktifkan fitur search
- `label` - Label untuk dropdown
- `required` - Boolean untuk required field
- `disabled` - Boolean untuk disabled state
- `error` - Error message
- `className` - Custom CSS classes
- `variant` - Style variant ('soft' atau default)

### Fitur
1. **Style Soft Variant**: Menggunakan style yang sama dengan input variant soft
2. **Search Functionality**: Filter options berdasarkan input search
3. **Click Outside**: Menutup dropdown ketika klik di luar
4. **Keyboard Navigation**: Support untuk keyboard navigation
5. **Accessibility**: Proper ARIA labels dan focus management
6. **Custom Styling**: Consistent dengan design system

### Contoh Penggunaan

```jsx
import { Dropdown } from '@components/ui';

// Basic dropdown
<Dropdown
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>

// Searchable dropdown
<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  searchable={true}
  variant="soft"
  label="Select Class"
  required
/>
```

## Implementasi di GroupScheduleForm

### Dropdown untuk Repeat Type
- Opsi: "No Repeat" dan "Weekly"
- Conditional rendering untuk repeat days dan schedule until
- State management untuk repeat type

### Dropdown untuk Class Selection
- Searchable dropdown untuk memilih class
- Hidden input untuk form data
- Integration dengan create/edit class functionality

### Dropdown untuk Trainer Selection
- Searchable dropdown untuk memilih trainer
- Hidden input untuk form data
- Proper validation

## Keuntungan

✅ **Consistent Styling**: Menggunakan style yang sama dengan input soft variant  
✅ **Search Functionality**: Memudahkan pencarian option yang banyak  
✅ **Better UX**: Dropdown yang lebih user-friendly  
✅ **Reusable**: Bisa digunakan di berbagai tempat  
✅ **Accessible**: Proper keyboard navigation dan screen reader support  
✅ **Customizable**: Support untuk berbagai variant dan props  

## Troubleshooting

### Issue: Dropdown tidak menutup ketika klik di luar
**Solusi**: Pastikan `useRef` dan `useEffect` untuk click outside handler sudah benar

### Issue: Form data tidak terkirim
**Solusi**: Gunakan hidden input untuk menyimpan value yang dipilih

### Issue: Search tidak berfungsi
**Solusi**: Pastikan prop `searchable={true}` sudah diset dan options memiliki `label` property

## Breaking Changes
Tidak ada breaking changes. Dropdown component adalah addition baru yang tidak mempengaruhi existing functionality. 