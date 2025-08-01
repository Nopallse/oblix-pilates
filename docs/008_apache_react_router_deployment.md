# Deployment React Router dengan Apache di cPanel

## **Penjelasan Masalah**

React Router menggunakan **client-side routing**, yang berarti:
- URL seperti `/dashboard` tidak mengarah ke file `dashboard.html`
- Routing ditangani oleh JavaScript di browser
- Server perlu dikonfigurasi untuk mengarahkan semua request ke `index.html`

## **Solusi: File .htaccess**

### **Lokasi File**
File `.htaccess` harus ditempatkan di:
- **Development**: `public/.htaccess`
- **Production**: Root folder website (biasanya `public_html/` di cPanel)

### **Konten File .htaccess**

```apache
# Enable rewrite engine
RewriteEngine On

# Handle Angular and React Router
# Don't rewrite files or directories
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Handle client-side routing
# Rewrite everything else to index.html to let our app handle the routing
RewriteRule ^ index.html [L]

# Security headers
<IfModule mod_headers.c>
    # Prevent MIME type sniffing
    Header always set X-Content-Type-Options nosniff
    
    # Prevent clickjacking
    Header always set X-Frame-Options DENY
    
    # Enable XSS protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # Referrer policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    
    # Images
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
    
    # CSS and JavaScript
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    
    # Fonts
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>
```

## **Penjelasan Konfigurasi**

### **1. Rewrite Rules**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
```

- **Baris 1**: Mengaktifkan modul rewrite
- **Baris 2-4**: Jika request adalah file atau direktori yang ada, jangan rewrite
- **Baris 5**: Semua request lainnya diarahkan ke `index.html`

### **2. Security Headers**
- **X-Content-Type-Options**: Mencegah MIME type sniffing
- **X-Frame-Options**: Mencegah clickjacking
- **X-XSS-Protection**: Mengaktifkan XSS protection
- **Referrer-Policy**: Mengontrol referrer information

### **3. Compression**
Mengaktifkan gzip compression untuk file-file tertentu untuk meningkatkan performa.

### **4. Caching**
Mengatur cache untuk static assets (gambar, CSS, JS, font) untuk meningkatkan loading speed.

## **Langkah Deployment di cPanel**

### **1. Build Project**
```bash
npm run build
```

### **2. Upload Files**
- Upload semua file dari folder `dist/` ke `public_html/` di cPanel
- Pastikan file `.htaccess` juga terupload

### **3. Verifikasi**
- Akses website Anda
- Coba akses route seperti `/admin`, `/my-orders`, dll
- Pastikan tidak muncul error 404

## **Troubleshooting**

### **Error 500 Internal Server Error**
- Pastikan modul `mod_rewrite` aktif di server
- Cek syntax `.htaccess` file
- Coba hapus bagian security headers jika bermasalah

### **Route Tidak Berfungsi**
- Pastikan file `.htaccess` berada di root folder website
- Cek apakah file `index.html` ada di root folder
- Pastikan tidak ada konflik dengan file `.htaccess` lain

### **Performance Issues**
- Aktifkan compression di cPanel
- Optimasi gambar sebelum upload
- Gunakan CDN untuk static assets

## **Alternatif untuk Subdirectory**

Jika website berada di subdirectory (misal: `example.com/myapp/`):

```apache
RewriteEngine On
RewriteBase /myapp/

# Don't rewrite files or directories
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Handle client-side routing
RewriteRule ^ index.html [L]
```

## **Testing**

Setelah deployment, test route-route berikut:
- `/` (home)
- `/admin` (admin dashboard)
- `/my-orders` (user orders)
- `/profile` (user profile)
- `/check-class` (class checking)

Semua route harus berfungsi tanpa error 404.

---

**Tanggal**: Juli 2025  
**Status**: Implemented  
**File Terkait**: `public/.htaccess` 