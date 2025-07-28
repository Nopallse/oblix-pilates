# Schedule Management

Fitur untuk mengelola jadwal kelas pilates dengan tampilan kalender yang interaktif.

## Fitur

- **Kalender Bulanan**: Tampilan kalender dengan navigasi bulan
- **Preview Schedule**: Menampilkan preview schedule di setiap tanggal
- **Detail Panel**: Panel detail untuk melihat dan mengelola schedule pada tanggal tertentu
- **CRUD Operations**: Create, Read, Update, Delete schedule
- **Color Coding**: Setiap kelas memiliki warna yang berbeda
- **Real-time Updates**: Data diperbarui secara real-time setelah operasi CRUD

## API Endpoints

### GET /api/schedule/calendar
Mengambil data kalender untuk bulan tertentu.

**Parameters:**
- `month` (int): Bulan (1-12)
- `year` (int): Tahun

**Response:**
```json
{
  "success": true,
  "message": "Schedule calendar data retrieved successfully",
  "data": {
    "month": 7,
    "year": 2025,
    "filter_type": "group",
    "total_schedules": 48,
    "schedules_by_date": {
      "2025-07-01": [
        {
          "id": "schedule-1",
          "class_name": "Intermediate Pilates",
          "class_color": "#2196F3",
          "trainer_name": "Coach Lauren",
          "type": "group",
          "date": "2025-07-01",
          "time_start": "07:30:00",
          "time_end": "08:30:00"
        }
      ]
    }
  }
}
```

### POST /api/schedule
Membuat schedule baru.

**Body:**
```json
{
  "date": "2025-07-01",
  "time_start": "07:30:00",
  "time_end": "08:30:00",
  "class_name": "Intermediate Pilates",
  "trainer_name": "Coach Lauren",
  "class_color": "#2196F3",
  "type": "group"
}
```

### PUT /api/schedule/{id}
Mengupdate schedule yang ada.

### DELETE /api/schedule/{id}
Menghapus schedule.

## Komponen

### Schedule.jsx
Komponen utama yang menampilkan kalender dan mengelola interaksi.

### useSchedule.js
Custom hook untuk mengelola state dan operasi API schedule.

### scheduleAPI.js
File yang berisi fungsi-fungsi API untuk schedule.

## Struktur Data

### Schedule Object
```javascript
{
  id: "schedule-1",
  class_name: "Intermediate Pilates",
  class_color: "#2196F3",
  trainer_name: "Coach Lauren",
  type: "group",
  date: "2025-07-01",
  time_start: "07:30:00",
  time_end: "08:30:00"
}
```

## Interaksi

1. **Navigasi Kalender**: Gunakan tombol prev/next untuk berpindah bulan
2. **Klik Tanggal**: Klik pada tanggal untuk melihat detail schedule
3. **Edit Schedule**: Klik tombol edit pada schedule di detail panel
4. **Delete Schedule**: Klik tombol delete untuk menghapus schedule
5. **Add Schedule**: Klik tombol "Add Schedule" untuk membuat schedule baru

## Styling

- Menggunakan warna dari API (`class_color`) untuk setiap schedule
- Background card tanggal: `#f8f8f8`
- Hover effects dengan shadow dan transition
- Responsive design untuk berbagai ukuran layar 