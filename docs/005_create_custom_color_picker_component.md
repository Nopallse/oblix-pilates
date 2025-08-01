# Custom Color Picker Component

## Deskripsi
Membuat custom color picker component dengan style yang mirip input variant soft dan fitur dropdown untuk memilih warna.

## Tanggal
Juli 2025

## Status
✅ Selesai

## File yang Dibuat/Dimodifikasi

### File Baru
- `src/components/ui/ColorPicker/ColorPicker.jsx` - Component color picker custom
- `src/components/ui/ColorPicker/index.js` - Export file
- `docs/005_create_custom_color_picker_component.md` - Dokumentasi ini

### File Dimodifikasi
- `src/components/ui/index.js` - Menambahkan export ColorPicker
- `src/pages/Admin/Schedule/components/GroupScheduleForm.jsx` - Menggunakan ColorPicker component

## Fitur ColorPicker Component

### Props
- `value` - Color value (hex string)
- `onChange` - Callback function ketika color berubah
- `label` - Label untuk color picker
- `required` - Boolean untuk required field
- `disabled` - Boolean untuk disabled state
- `error` - Error message
- `className` - Custom CSS classes
- `variant` - Style variant ('soft' atau default)
- `placeholder` - Placeholder text

### Fitur
1. **Style Soft Variant**: Menggunakan style yang sama dengan input variant soft
2. **Predefined Colors**: 20 warna yang sudah ditentukan
3. **Custom Color**: Input color dan text input untuk hex value
4. **Color Preview**: Menampilkan warna yang dipilih
5. **Dropdown Interface**: Dropdown yang user-friendly
6. **Click Outside**: Menutup dropdown ketika klik di luar

### Contoh Penggunaan

```jsx
import { ColorPicker } from '@components/ui';

// Basic color picker
<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Choose Color"
  variant="soft"
  required
/>
```

## Implementasi di GroupScheduleForm

### ColorPicker untuk Class Color Sign
- Menggantikan input type="color" dengan ColorPicker component
- Menampilkan warna yang dipilih dengan preview
- Dropdown dengan predefined colors dan custom color input
- Style yang konsisten dengan input variant soft

## Keuntungan

✅ **Better UX**: Color picker yang lebih user-friendly  
✅ **Predefined Colors**: Warna yang sudah ditentukan untuk kemudahan  
✅ **Custom Color**: Tetap bisa input warna custom  
✅ **Visual Preview**: Menampilkan warna yang dipilih  
✅ **Consistent Styling**: Style yang konsisten dengan design system  
✅ **Accessible**: Proper keyboard navigation dan screen reader support  

## Troubleshooting

### Issue: Color picker tidak menampilkan dropdown
**Solusi**: Pastikan `useRef` dan `useEffect` untuk click outside handler sudah benar

### Issue: Predefined colors tidak muncul
**Solusi**: Pastikan array `predefinedColors` sudah terisi dengan benar

### Issue: Custom color tidak berfungsi
**Solusi**: Pastikan event handler untuk input color dan text sudah benar

## Breaking Changes
Tidak ada breaking changes. ColorPicker component adalah addition baru yang tidak mempengaruhi existing functionality. 