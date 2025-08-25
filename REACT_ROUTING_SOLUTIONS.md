# 🚀 React Router Solutions for Aplin Hosting

## Problem
React Router needs to handle client-side routing, but direct URLs like `/admin` or `/claims` return 404 errors because the server doesn't know about these routes.

## 🎯 Solution 1: Create .htaccess File (Apache)

Create this file in your `/public_html/` folder:

```apache
# .htaccess for React Router on Apache
RewriteEngine On

# Handle Angular and React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Gzip compression
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
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

---

## 🎯 Solution 2: Use Hash Router (No server config needed)

Update your React app to use HashRouter instead of BrowserRouter:

**Update `src/main.tsx`:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
```

**URLs will look like:**
- Homepage: `galloways.co.ke/#/`
- Admin: `galloways.co.ke/#/admin`
- Claims: `galloways.co.ke/#/claims`

---

## 🎯 Solution 3: Nginx Configuration (If Aplin uses Nginx)

Create this configuration:

```nginx
server {
    listen 80;
    server_name galloways.co.ke;
    root /var/www/html;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend
    location /api {
        proxy_pass http://api.galloways.co.ke;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🎯 Solution 4: web.config for IIS (Windows Servers)

If Aplin uses Windows/IIS, create `web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

---

## 🎯 Solution 5: PHP Fallback (Most Shared Hosting)

Create `index.php` in your root directory:

```php
<?php
// Check if the requested file exists
$request = $_SERVER['REQUEST_URI'];
$file_path = __DIR__ . $request;

// If it's a file and exists, serve it
if (is_file($file_path)) {
    return false; // Let the server handle it
}

// Otherwise, serve index.html for React Router
include_once 'index.html';
?>
```

---

## 🎯 Solution 6: JavaScript Fallback Detection

Add this to your `index.html` in the `<head>` section:

```html
<script>
// Redirect to hash router if direct URL access fails
(function() {
    var path = window.location.pathname;
    if (path !== '/' && !path.includes('.')) {
        window.location.replace('/#' + path);
    }
})();
</script>
```

---

## ✅ Recommended Approach for Aplin

### Option A: Try .htaccess first (Most Common)
1. Create the `.htaccess` file above
2. Upload to `/public_html/`
3. Test your routes

### Option B: Use HashRouter (100% Compatible)
1. Update your React app to use HashRouter
2. Rebuild and deploy
3. All routes will work with # in URL

### Option C: Contact Aplin Support
Ask them:
1. "Do you support URL rewriting for single-page applications?"
2. "Is mod_rewrite enabled for Apache?"
3. "Can you help configure React Router routing?"

---

## 🧪 Test Your Routes

After implementing any solution, test these URLs:
- `galloways.co.ke` - Homepage ✅
- `galloways.co.ke/admin` - Admin panel ✅
- `galloways.co.ke/claims` - Claims form ✅
- `galloways.co.ke/quotes` - Quotes form ✅

If they all load correctly, your routing is working!

---

## 🚨 Quick Fix Commands

**Create .htaccess locally:**
```bash
cd /home/crash/Desktop/npm/frontend/dist
cat > .htaccess << 'EOF'
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF
```

**Switch to HashRouter:**
```bash
# Update main.tsx to use HashRouter instead of BrowserRouter
# Then rebuild: npm run build
```
