# cPanel Deployment Guide for Galloways Insurance

## 📂 File Placement Structure

### 1. Frontend (React/Vite build)
**Location**: `public_html/`
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon.ico
├── robots.txt
└── Downloads/ (your PDF files)
```

### 2. API Endpoint
**Location**: `public_html/api/`
```
public_html/api/
├── index.php (Laravel entry point)
└── .htaccess (URL rewriting)
```

### 3. Backend Application (Secure)
**Location**: `~/backend-laravel/` (outside public_html)
```
~/backend-laravel/
├── app/
├── config/
├── vendor/
├── .env (with PostgreSQL credentials)
├── api.php (our production API)
└── storage/ (with proper permissions)
```

## 🚀 Deployment Steps

### Step 1: Upload Frontend
1. Build your frontend: `npm run build`
2. Upload contents of `frontend/dist/` to `public_html/`

### Step 2: Upload Backend
1. Upload entire `backend-laravel/` folder to your home directory
2. Place it outside `public_html` for security

### Step 3: Configure API Endpoint
1. Copy `public_html_api_index.php` to `public_html/api/index.php`
2. Copy `public_html_api_htaccess` to `public_html/api/.htaccess`
3. Update the `$BASE_PATH` in `index.php` to your actual path

### Step 4: Database Configuration
1. Update `backend-laravel/.env` with your PostgreSQL credentials:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=gallowa2_neon
   DB_USERNAME=gallowa2_william
   DB_PASSWORD=Galloways@2025
   ```

### Step 5: Alternative API (Recommended)
Since Laravel might have issues in cPanel, use our standalone `api.php`:
1. Copy `backend-laravel/api.php` to `public_html/api.php`
2. This bypasses Laravel and connects directly to PostgreSQL

## 🎯 Recommended Simple Setup

For maximum compatibility, place our `api.php` directly:

```
public_html/
├── index.html (frontend)
├── assets/ (frontend assets)
├── api.php (our production API)
└── .htaccess (for frontend routing)
```

This way:
- Frontend: `https://galloways.co.ke/`
- API: `https://galloways.co.ke/api.php`

## 🔧 Final Configuration

Update `frontend/.env`:
```
VITE_API_URL=https://galloways.co.ke/api.php
VITE_USE_POSTGRESQL_ONLY=true
```

This gives you a fully functional system with PostgreSQL database integration!
