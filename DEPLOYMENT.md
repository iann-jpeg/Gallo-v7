# Galloways Insurance - cPanel Deployment Guide

## Asset Configuration Fixed ✅

Your frontend now properly handles asset URLs for cPanel deployment. All images, logos, and downloads will now work correctly on your live site.

## What Was Fixed:

### 1. Asset URL Helper System
- Created `src/lib/assets.ts` with helper functions
- `getAssetUrl()` - Main asset URL resolver
- `getLogoUrl()` - For partner logos in `/LOGOS/`
- `getPictureUrl()` - For product images in `/pictures/` 
- `getDownloadUrl()` - For PDF downloads in `/Downloads/`
- `getMainLogoUrl()` - For main site logo

### 2. Updated Components:
- **Header.tsx** - Main logo now uses `getMainLogoUrl()`
- **TrustedPartners.tsx** - All partner logos use `getLogoUrl()`
- **Products.tsx** - Product images use `getPictureUrl()`, downloads use `getDownloadUrl()`
- **Claims.tsx** - All claim form downloads use `getDownloadUrl()`

### 3. Environment Configuration:
- Added `VITE_BASE_URL=https://galloways.co.ke` to production environment
- Updated Vite config with proper base URL handling

## cPanel Deployment Instructions:

### 1. Upload Frontend Files:
```
Upload contents of frontend/dist/ folder to your cPanel public_html directory:
- Copy all files from F:\Gallo V8\Gallo-v7\frontend\dist\*
- Upload to: public_html/ on your cPanel file manager
```

### 2. Upload Backend Files:
```
Upload backend-laravel folder to your cPanel:
- Copy F:\Gallo V8\Gallo-v7\backend-laravel\*
- Upload to: public_html/backend-laravel/ on cPanel
```

### 3. File Structure on cPanel:
```
public_html/
├── index.html (React app entry point)
├── assets/ (CSS, JS files)
├── pictures/ (Product images) ✅
├── LOGOS/ (Partner logos) ✅  
├── Downloads/ (PDF forms) ✅
├── galloways-logo.jpg (Main logo) ✅
├── .htaccess (Apache configuration)
└── backend-laravel/
    ├── public/
    │   └── index.php (API entry point)
    ├── app/
    ├── vendor/
    └── ...
```

### 4. Set Up Database:
1. Create PostgreSQL database in cPanel
2. Update backend-laravel/.env with your database credentials:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   ```

### 5. Run Initial Setup:
```bash
# In your cPanel terminal or file manager
cd public_html/backend-laravel
php artisan key:generate
php artisan storage:link
php artisan migrate
```

### 6. Verify Assets:
Check these URLs work:
- https://galloways.co.ke/galloways-logo.jpg
- https://galloways.co.ke/pictures/motor.jpg
- https://galloways.co.ke/LOGOS/UAP.png
- https://galloways.co.ke/Downloads/claim_documentation_guide.pdf

## Expected Results:
- ✅ Main logo displays in header
- ✅ Partner logos show in trusted partners section
- ✅ Product images display on products page
- ✅ All download links work for claim forms and documents
- ✅ API endpoints work for form submissions
- ✅ React routing works with .htaccess fallback

Your site should now be fully functional at https://galloways.co.ke with all assets loading correctly!
