# 🚨 URGENT FIX: 404 Error on /admin Route

## Problem
- Typing `yoursite.com/admin` shows 404 error
- React Router routes don't work with direct URLs
- Apache server doesn't know how to handle React routes

## ✅ Quick Solution

### Step 1: Create .htaccess file
Create a file named `.htaccess` (with the dot) and add this content:

```apache
RewriteEngine On
RewriteBase /

# Handle React Router - redirect all requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Step 2: Upload to Aplin
1. **Using File Manager**:
   - Login to Aplin control panel
   - Go to File Manager
   - Navigate to your domain's `public_html` folder
   - Upload the `.htaccess` file
   - Make sure it's in the same folder as `index.html`

2. **Using FTP**:
   - Upload `.htaccess` to your website's root directory
   - Ensure it's at the same level as `index.html`

### Step 3: Test
- Try accessing: `https://galloways.co.ke/admin`
- Should now load the admin panel instead of 404

## 🔍 File Structure Should Look Like:
```
public_html/
├── .htaccess          ← ADD THIS FILE
├── index.html
├── assets/
├── favicon.ico
└── ... other files
```

## ❓ Why This Happens
- React Router handles routes in JavaScript
- When you type `/admin` directly, Apache server looks for an actual `/admin` folder
- Since there's no `/admin` folder, it returns 404
- `.htaccess` tells Apache to send all requests to `index.html`
- Then React Router takes over and shows the correct page

## 🎯 This Fixes All Routes
After adding `.htaccess`, these will all work:
- `/admin`
- `/products`
- `/claims`
- `/diaspora`
- `/quotes`
- Any other React route

## ✅ Already Fixed in Repository
The `.htaccess` file is now included in `frontend/dist/.htaccess`
Just upload it to your public_html folder!
