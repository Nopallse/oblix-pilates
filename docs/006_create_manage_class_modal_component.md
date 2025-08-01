# 006 - Create ManageClassModal Component

## Deskripsi
Membuat komponen `ManageClassModal` yang dapat digunakan kembali (reusable) untuk mengelola class di kedua form schedule (GroupScheduleForm dan SemiPrivateScheduleForm).

## Tujuan
- Menghilangkan duplikasi kode modal manage class
- Meningkatkan maintainability dengan komponen yang terpusat
- Konsistensi UI/UX untuk manage class di semua form

## Perubahan yang Dilakukan

### 1. Membuat Komponen ManageClassModal
**File**: `src/pages/Admin/Schedule/components/ManageClassModal.jsx`

**Fitur**:
- Modal untuk mengelola class (CRUD operations)
- Table untuk menampilkan daftar class
- Form untuk add/edit class dengan ColorPicker
- State management untuk editing mode
- API integration untuk create, update, delete class

**Props**:
- `isOpen`: Boolean untuk menampilkan/menyembunyikan modal
- `onClose`: Function untuk menutup modal
- `classes`: Array data class yang tersedia
- `onClassCreated`: Callback function setelah class berhasil dibuat/diupdate

### 2. Update GroupScheduleForm
**File**: `src/pages/Admin/Schedule/components/GroupScheduleForm.jsx`

**Perubahan**:
- Menghapus import `Table`, `ColorPicker`, `icons`
- Menambahkan import `ManageClassModal`
- Menghapus state yang tidak diperlukan (`newClassData`, `isEditingClass`, `editingClassId`)
- Mengganti `isCreateClassOpen` menjadi `isManageClassOpen`
- Menghapus fungsi `handleCreateClass`
- Mengganti modal lama dengan komponen `ManageClassModal`

### 3. Update SemiPrivateScheduleForm
**File**: `src/pages/Admin/Schedule/components/SemiPrivateScheduleForm.jsx`

**Perubahan**:
- Menghapus import `Table`, `ColorPicker`, `icons`
- Menambahkan import `ManageClassModal`
- Menghapus state yang tidak diperlukan (`newClassData`, `isEditingClass`, `editingClassId`)
- Mengganti `isCreateClassOpen` menjadi `isManageClassOpen`
- Menghapus fungsi `handleCreateClass`
- Mengganti modal lama dengan komponen `ManageClassModal`

## Keuntungan

### 1. Code Reusability
- Komponen yang sama digunakan di dua form berbeda
- Mengurangi duplikasi kode sebesar ~200 baris per form

### 2. Maintainability
- Perubahan pada modal manage class hanya perlu dilakukan di satu tempat
- Bug fixes dan improvements otomatis berlaku di semua form

### 3. Consistency
- UI/UX yang konsisten untuk manage class di semua form
- Behavior yang sama untuk create, edit, delete operations

### 4. Performance
- Mengurangi bundle size dengan menghilangkan duplikasi
- State management yang lebih efisien

## Struktur Komponen

```
ManageClassModal/
├── ManageClassModal.jsx    # Komponen utama
└── index.js               # Export file (opsional)

Props:
├── isOpen: boolean        # Status modal
├── onClose: function      # Handler untuk menutup modal
├── classes: array         # Data class yang tersedia
└── onClassCreated: function # Callback setelah class berhasil dibuat
```

## Penggunaan

```jsx
// Di GroupScheduleForm atau SemiPrivateScheduleForm
<ManageClassModal
  isOpen={isManageClassOpen}
  onClose={() => setIsManageClassOpen(false)}
  classes={classes}
  onClassCreated={onClassCreated}
/>
```

## Testing
- Modal dapat dibuka dan ditutup dengan benar
- CRUD operations berfungsi dengan baik
- State management bekerja dengan proper
- Callback functions dipanggil dengan benar

## Troubleshooting

### Masalah Umum:
1. **Modal tidak muncul**: Pastikan `isOpen` prop bernilai `true`
2. **State tidak ter-reset**: Pastikan `onClose` handler mereset state dengan benar
3. **Callback tidak terpanggil**: Pastikan `onClassCreated` prop terdefinisi

### Solusi:
- Periksa console untuk error messages
- Pastikan semua props terkirim dengan benar
- Verifikasi bahwa API calls berhasil

## Breaking Changes
Tidak ada breaking changes. Semua perubahan bersifat internal refactoring untuk meningkatkan code quality dan maintainability.

## Dependencies
- `@components/ui`: Button, Input, Table, ColorPicker
- `@shared/hooks`: useApiToast
- `@shared/services`: apiClient
- `@shared/utils/assets`: icons 