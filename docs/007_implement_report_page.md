# 007 - Implement Report Page

## Deskripsi
Membuat halaman Report dengan style, layout, dan cara pakai API yang sama dengan Dashboard. Halaman ini menampilkan dua tab: Revenue dan Payroll dengan data yang sesuai dengan API response.

## Tujuan
- Membuat halaman Report yang konsisten dengan Dashboard
- Menampilkan data Revenue dan Payroll dengan format yang sesuai
- Implementasi modal untuk detail payroll instructor
- Menggunakan pattern API yang sama dengan Dashboard

## Perubahan yang Dilakukan

### 1. Membuat Service Layer
**File**: `src/shared/services/reportService.js`

**Fitur**:
- Service untuk API report (revenue, payroll, payroll detail)
- Menggunakan `apiClient` untuk konsistensi

**Methods**:
- `getRevenueReport(params)`: Mengambil data revenue report
- `getPayrollReport(params)`: Mengambil data payroll report  
- `getPayrollDetail(instructorId, params)`: Mengambil detail payroll instructor

### 2. Membuat API Wrapper
**File**: `src/pages/Admin/Report/api/reportAPI.js`

**Fitur**:
- Wrapper untuk report services
- Export methods yang diperlukan

### 3. Membuat Custom Hook
**File**: `src/pages/Admin/Report/api/useReport.js`

**Fitur**:
- State management untuk revenue, payroll, dan payroll detail
- Loading dan error handling
- Methods untuk fetch data

**State**:
- `revenueData`: Data revenue report
- `payrollData`: Data payroll report
- `payrollDetailData`: Data payroll detail
- `loading`: Status loading
- `error`: Error message

### 4. Membuat PayrollDetailModal Component
**File**: `src/pages/Admin/Report/components/PayrollDetailModal.jsx`

**Fitur**:
- Modal untuk menampilkan detail payroll instructor
- Summary information dengan layout grid
- Table untuk detail class
- Action buttons (Cancel, Save)

**Props**:
- `isOpen`: Boolean untuk menampilkan/menyembunyikan modal
- `onClose`: Function untuk menutup modal
- `payrollDetail`: Data payroll detail dari API

### 5. Membuat Halaman Report Utama
**File**: `src/pages/Admin/Report/Report.jsx`

**Fitur**:
- Tab navigation (Revenue, Payroll)
- Date range filter
- Metrics cards untuk summary data
- Tables untuk detail data
- Modal integration untuk payroll detail

**Components**:
- **Header**: Title dan date range filter
- **Tabs**: Revenue dan Payroll navigation
- **Metrics Cards**: Summary data dengan style yang sama dengan Dashboard
- **Tables**: Detail data dengan action buttons
- **Modal**: Payroll detail modal

## Struktur API Layer

```
Report/
├── api/
│   ├── reportAPI.js      # API wrapper
│   ├── useReport.js      # Custom hook
│   └── index.js          # Export file
├── components/
│   ├── PayrollDetailModal.jsx  # Modal component
│   └── index.js          # Export file
└── Report.jsx            # Main page
```

## API Integration

### Revenue Report
- **Endpoint**: `GET /api/report/revenue`
- **Parameters**: `start_date`, `end_date`
- **Response**: Metrics dan payments list

### Payroll Report  
- **Endpoint**: `GET /api/report/payroll`
- **Parameters**: `start_date`, `end_date`
- **Response**: Metrics dan payroll list

### Payroll Detail
- **Endpoint**: `GET /api/report/payroll/{instructor_id}`
- **Parameters**: `instructor_id`, `start_date`, `end_date`
- **Response**: Instructor detail dan class details

## UI/UX Features

### 1. Date Range Filter
- Start date dan end date input
- Default: bulan ini
- Auto-refresh data ketika date berubah

### 2. Tab Navigation
- Revenue tab (default)
- Payroll tab
- Active state dengan border dan color

### 3. Metrics Cards
- Style yang sama dengan Dashboard
- Dark background dengan white text
- Grid layout responsive

### 4. Tables
- Consistent dengan Table component
- Action buttons untuk payroll detail
- Loading state dan empty message

### 5. Modal
- Style yang sama dengan GroupScheduleForm
- Rounded corners dan primary header
- Summary grid dan detail table

## Data Formatting

### Currency Formatting
```javascript
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
```

### Date Range Default
```javascript
const [dateRange, setDateRange] = useState({
  start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
  end_date: new Date().toISOString().split('T')[0]
});
```

## Error Handling

### 1. API Error
- Menggunakan `useApiToast` untuk error messages
- Loading state untuk user feedback
- Graceful fallback untuk empty data

### 2. Data Validation
- Check data existence sebelum render
- Default values untuk metrics
- Empty state untuk tables

## Responsive Design

### 1. Grid Layout
- Metrics cards: `grid-cols-1 md:grid-cols-3`
- Summary grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5`

### 2. Table Responsive
- Horizontal scroll untuk mobile
- Proper column spans
- Responsive text sizes

## Testing

### 1. API Integration
- Revenue report loading dan display
- Payroll report loading dan display
- Payroll detail modal functionality

### 2. UI Interaction
- Tab switching
- Date range filtering
- Modal open/close
- Button actions

### 3. Data Display
- Metrics cards dengan correct values
- Table data dengan proper formatting
- Currency formatting
- Date formatting

## Troubleshooting

### Masalah Umum:
1. **Data tidak muncul**: Periksa API response format
2. **Date range tidak bekerja**: Periksa parameter format
3. **Modal tidak muncul**: Periksa state management
4. **Currency format error**: Periksa number validation

### Solusi:
- Periksa console untuk error messages
- Validasi API response structure
- Test dengan different date ranges
- Check component props

## Breaking Changes
Tidak ada breaking changes. Semua perubahan bersifat penambahan fitur baru.

## Dependencies
- `@components/ui`: Button, Table
- `@shared/hooks`: useApiToast
- `@shared/services`: apiClient
- React hooks: useState, useEffect, useCallback

## Performance Considerations
- Lazy loading untuk modal content
- Memoized callbacks untuk API calls
- Efficient re-renders dengan proper dependencies
- Optimized table rendering dengan pagination support 