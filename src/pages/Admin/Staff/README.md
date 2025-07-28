# Staff Management

Fitur untuk mengelola data staff di aplikasi Oblix Pilates.

## Fitur

### 1. Daftar Staff
- Menampilkan daftar staff dengan pagination
- Informasi yang ditampilkan: nama, username, email, dan nomor HP
- Pencarian berdasarkan nama, username, atau email
- Debounced search untuk performa yang lebih baik

### 2. Tambah Staff Baru
- Form untuk menambah staff baru
- Validasi real-time untuk semua field
- Field yang diperlukan:
  - Nama Lengkap (min 2 karakter, max 100 karakter)
  - Username (min 3 karakter, max 50 karakter, hanya huruf, angka, underscore)
  - Email (format email valid, max 255 karakter)
  - Tanggal Lahir (usia minimal 17 tahun, maksimal 100 tahun)
  - Nomor Telepon (format valid, min 10 digit, max 15 digit)
  - Password (min 6 karakter, max 100 karakter)

### 3. Edit Staff
- Form untuk mengedit data staff
- Password bersifat opsional (kosongkan jika tidak ingin mengubah)
- Validasi yang sama dengan form tambah staff

### 4. Hapus Staff
- Konfirmasi sebelum menghapus
- Menampilkan nama staff yang akan dihapus

### 5. Pencarian dan Filter
- Pencarian real-time dengan debounce 500ms
- Reset pencarian
- Informasi jumlah data yang ditampilkan

### 6. Pagination
- Navigasi halaman sebelumnya/selanjutnya
- Informasi halaman saat ini dan total halaman
- Responsive design

## Struktur File

```
src/pages/Admin/Staff/
├── Staff.jsx                 # Komponen utama
├── index.js                  # Export komponen
├── README.md                 # Dokumentasi ini
├── api/
│   ├── staffAPI.js          # API calls
│   ├── useStaff.js          # Custom hook untuk state management
│   ├── staffValidation.js   # Validasi form
│   └── index.js             # Export API
└── components/
    ├── StaffForm.jsx        # Form modal untuk tambah/edit
    └── index.js             # Export komponen
```

## API Endpoints

### GET /api/staff
Mengambil daftar staff dengan pagination dan search.

**Parameters:**
- `page` (number): Halaman yang diminta
- `limit` (number): Jumlah data per halaman
- `search` (string): Kata kunci pencarian

**Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "staff": [
      {
        "id": "uuid",
        "full_name": "string",
        "username": "string",
        "email": "user@example.com",
        "date_of_birth": "2025-07-27",
        "phone_number": "string"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 100,
      "per_page": 20,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### POST /api/staff
Membuat staff baru.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "date_of_birth": "1990-01-15",
  "phone_number": "+62 812-3456-7890",
  "password": "password123"
}
```

### PUT /api/staff/{id}
Mengupdate data staff.

**Request Body:** Sama dengan POST (password opsional)

### DELETE /api/staff/{id}
Menghapus staff.

## Validasi

### Nama Lengkap
- Wajib diisi
- Minimal 2 karakter
- Maksimal 100 karakter

### Username
- Wajib diisi
- Minimal 3 karakter
- Maksimal 50 karakter
- Hanya boleh berisi huruf, angka, dan underscore

### Email
- Wajib diisi
- Format email valid
- Maksimal 255 karakter

### Tanggal Lahir
- Wajib diisi
- Usia minimal 17 tahun
- Usia maksimal 100 tahun

### Nomor Telepon
- Wajib diisi
- Format valid (boleh mengandung spasi, tanda kurung, tanda hubung)
- Minimal 10 digit
- Maksimal 15 digit

### Password
- Wajib diisi untuk staff baru
- Opsional untuk edit (kosongkan jika tidak ingin mengubah)
- Minimal 6 karakter
- Maksimal 100 karakter

## Penggunaan

1. Akses halaman Staff melalui menu sidebar Admin
2. Gunakan search bar untuk mencari staff
3. Klik tombol "Tambah Staff" untuk menambah staff baru
4. Klik ikon edit untuk mengedit data staff
5. Klik ikon hapus untuk menghapus staff
6. Gunakan pagination untuk navigasi antar halaman

## Dependencies

- React Router DOM untuk routing
- Custom hooks untuk state management
- Tailwind CSS untuk styling
- React Hot Toast untuk notifikasi
- Custom UI components (Button, Modal, Input, Table) 