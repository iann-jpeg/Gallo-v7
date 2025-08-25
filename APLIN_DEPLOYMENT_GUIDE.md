# Galloways Insurance Platform - Deployment Guide for Aplin Hosting

## 🚀 Production Build Status
✅ Backend: ### Step 2: Frontend Deployment (Static Website)

1. **Upload Static Files**:
   - Go to your domain's public_html or www folder
   - Upload all contents from `frontend/dist/` folder
   - Ensure `index.html` is in the root directory
   - **IMPORTANT**: Include the `.htaccess` file for React Router support

2. **Fix React Router 404 Issues**:
   - Create `.htaccess` file in your public_html folder with this content:
   ```apache
   RewriteEngine On
   RewriteBase /
   
   # Handle React Router - redirect all requests to index.html
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

3. **File Structure on Aplin**:
   ```
   public_html/
   ├── .htaccess              # ← CRITICAL for /admin route to work
   ├── index.html             # ← Main page
   ├── assets/               # ← CSS/JS files
   ├── favicon.ico           # ← Website icon
   └── ... other static files
   ```

4. **Test Routes**:
   - `https://galloways.co.ke/` ← Home page
   - `https://galloways.co.ke/admin` ← Should work now (not 404)
   - `https://galloways.co.ke/products` ← All routes should worky compiled to `/backend/dist/`
✅ Frontend: Successfully compiled to `/frontend/gallo/dist/`

## 📦 Deployment Package Structure

### Backend (Node.js Application)
```
backend/
├── dist/                    # Compiled JavaScript files (UPLOAD THIS)
├── node_modules/           # Dependencies (will be installed on server)
├── package.json           # Dependencies and scripts
├── package-lock.json      # Lock file for exact versions
├── .env                   # Environment variables (configure on server)
├── prisma/               # Database schema and migrations
└── uploads/              # File storage directory
```

### Frontend (Static Files)
```
frontend/gallo/dist/         # Static website files (UPLOAD TO WEB ROOT)
├── index.html              # Main HTML file
├── assets/                 # CSS, JS, and other assets
│   ├── index-DCvrOvrW.css  # Compiled CSS (99.74 kB)
│   └── index-BYk6U1d1.js   # Compiled JavaScript (945.96 kB)
└── public assets/          # Images, favicon, etc.
```

## 🌐 Aplin Hosting Deployment Instructions

### Step 1: Backend Deployment (Node.js Hosting)

1. **Upload Backend Files**:
   - **IMPORTANT**: Upload the ENTIRE `backend/` folder (not just dist/)
   - The `dist/` folder contains the compiled JavaScript files
   - But you ALSO need: `package.json`, `node_modules/`, `prisma/`, `.env`, etc.
   - Upload to your Node.js hosting directory on Aplin (usually `/nodejs/` or `/app/`)
   - Extract files on the server

2. **Backend Folder Structure on Aplin**:
   ```
   /your-nodejs-directory/
   ├── dist/                    # ← Compiled JavaScript (THIS is what runs)
   ├── node_modules/           # ← Dependencies 
   ├── package.json           # ← Required for npm commands
   ├── package-lock.json      # ← Lock file
   ├── .env                   # ← Environment variables
   ├── prisma/               # ← Database schema
   ├── uploads/              # ← File storage
   └── src/                  # ← Source code (optional, for reference)
   ```

3. **What Actually Runs**:
   - Aplin will run: `node dist/main.js` (the compiled version)
   - NOT the TypeScript source files in `src/`
   - The `dist/` folder IS your production backend

4. **Install Dependencies**:
   ```bash
   npm install --production
   ```

5. **Configure Environment Variables** on Aplin Control Panel:
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_neon_postgresql_url
   JWT_SECRET=your_super_secure_jwt_secret
   JWT_EXPIRES_IN=7d
   
   # Paystack (Get from https://dashboard.paystack.com)
   PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key
   PAYSTACK_PUBLIC_KEY=pk_live_your_actual_public_key
   PAYSTACK_API_URL=https://api.paystack.co
   PAYSTACK_CALLBACK_URL=https://galloways.co.ke/payment-callback
   PAYSTACK_WEBHOOK_SECRET=your_webhook_secret_from_paystack
   
   # M-PESA (Get from Safaricom Developer Portal)
   MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   MPESA_SHORTCODE=your_business_shortcode
   MPESA_PASSKEY=your_mpesa_passkey
   MPESA_CALLBACK_URL=https://api.galloways.co.ke/api/payments/callback/mpesa
   MPESA_ENVIRONMENT=production
   
   # Contact Information
   WHATSAPP_NUMBER=+254712345678
   COMPANY_EMAIL=info@galloways.co.ke
   COMPANY_PHONE=+254700123456
   ```

4. **Database Setup**:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. **Start the Application**:
   ```bash
   # Aplin will automatically run this command:
   npm run start:prod
   # Which executes: node dist/main.js
   ```

6. **Verify Backend is Running**:
   - Check: `https://api.galloways.co.ke/api/health`
   - Should return: `{"status": "ok", "message": "Server is running"}`

### Step 2: Frontend Deployment (Static Website)

1. **Upload Static Files**:
   - Go to your domain's public_html or www folder
   - Upload all contents from `frontend/gallo/dist/` folder
   - Ensure `index.html` is in the root directory

2. **Configure Subdomain for API**:
   - Create subdomain: `api.galloways.co.ke`
   - Point it to your Node.js application directory
   - Ensure SSL certificate is enabled

## 🔧 Backend Deployment Details

### Understanding the Backend Structure:

**Source Files (`src/` folder)**:
- Contains TypeScript source code
- Used for development only
- NOT used in production

**Compiled Files (`dist/` folder)**:
- Contains compiled JavaScript
- THIS is what actually runs in production
- Generated from TypeScript source
- Already optimized and ready to run

### Aplin Backend Deployment Process:

1. **Create Node.js App** on Aplin control panel
2. **Upload Method 1 - Full Backend Folder**:
   ```bash
   # Compress entire backend folder
   tar -czf backend.tar.gz backend/
   # Upload backend.tar.gz to Aplin
   # Extract in your Node.js directory
   ```

3. **Upload Method 2 - File Manager**:
   - Use Aplin File Manager
   - Upload entire `backend/` folder contents
   - Ensure `dist/` folder is included

4. **Aplin Configuration**:
   - **Startup File**: `dist/main.js` (NOT src/main.ts)
   - **Node Version**: 18.x or higher
   - **Environment**: Production
   - **Port**: 3000 (or as configured)

### Key Points:
- ✅ **dist/** folder contains your production backend
- ✅ Upload ENTIRE backend/ folder (includes dist/ + dependencies)
- ✅ Aplin runs `node dist/main.js` automatically
- ❌ Do NOT try to run TypeScript files directly
- ❌ Do NOT upload only the dist/ folder (missing package.json, etc.)

## 🌐 Domain Configuration

### Main Domain Setup (galloways.co.ke)
- **Document Root**: `/public_html/` (contains frontend dist files)
- **Index File**: `index.html`
- **SSL**: Enable SSL certificate
- **Redirects**: Configure www redirect if needed

### API Subdomain Setup (api.galloways.co.ke)
- **Document Root**: `/backend/` (Node.js application)
- **Port**: 3000 (or as configured)
- **SSL**: Enable SSL certificate
- **Proxy**: Configure reverse proxy to Node.js app

## 📡 DNS Configuration

### Required DNS Records:
```
Type    Name    Value                   TTL
A       @       YOUR_APLIN_SERVER_IP    300
A       api     YOUR_APLIN_SERVER_IP    300
CNAME   www     galloways.co.ke         300
```

## 🔐 SSL Certificate Setup

1. **Enable SSL** on Aplin control panel for both:
   - galloways.co.ke
   - api.galloways.co.ke

2. **Force HTTPS Redirect** (add to .htaccess if needed):
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## 🔍 Testing Checklist

### Frontend Testing:
- [ ] Website loads at https://galloways.co.ke
- [ ] All pages navigate correctly
- [ ] Images and assets load properly
- [ ] Forms submit without errors
- [ ] Responsive design works on mobile

### Backend Testing:
- [ ] API responds at https://api.galloways.co.ke/api
- [ ] Health check endpoint works: `GET /api/health`
- [ ] Authentication endpoints work
- [ ] Payment endpoints respond correctly
- [ ] Database connections are stable

### Payment Testing:
- [ ] Paystack payment initialization works
- [ ] M-PESA STK Push functions correctly
- [ ] Webhook endpoints receive callbacks
- [ ] Payment verification works
- [ ] Redirect flows function properly

## 🚨 Important Security Notes

1. **Environment Variables**: Never commit real API keys to git
2. **Database**: Use connection pooling for PostgreSQL
3. **CORS**: Already configured for galloways.co.ke domain
4. **Webhooks**: Signature verification is implemented
5. **SSL**: Always use HTTPS in production

## 📊 Performance Optimization

### Backend:
- Uses compiled JavaScript (dist folder)
- Database connection pooling enabled
- Efficient query patterns with Prisma
- Proper error handling and logging

### Frontend:
- Minified CSS (99.74 kB gzipped to 15.93 kB)
- Minified JavaScript (945.96 kB gzipped to 246.39 kB)
- Optimized images and assets
- Service worker for caching (if needed)

## 🆘 Troubleshooting

### Common Issues:

1. **502 Bad Gateway**: Backend not running or wrong port
2. **CORS Errors**: Check API URL in frontend environment
3. **Payment Failures**: Verify webhook URLs and API keys
4. **Database Errors**: Check connection string and migrations
5. **404 on /admin or other routes**: Missing .htaccess file for React Router
   - **Solution**: Add .htaccess file to public_html with rewrite rules
   - **Symptoms**: Direct URLs like `/admin` show 404, but clicking links works
   - **Fix**: Upload the .htaccess file from frontend/dist/ folder

### React Router 404 Fix:
If you get 404 errors when accessing routes like `/admin` directly:

1. **Create .htaccess** in your public_html folder:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

2. **Verify Apache mod_rewrite** is enabled on Aplin
3. **Test all routes** after uploading .htaccess

### Log Files:
- Backend logs: Check Node.js application logs
- Access logs: Check Aplin server logs
- Error logs: Monitor for 4xx and 5xx errors

## 📞 Support Contacts

- **Aplin Support**: Contact Aplin hosting support for server issues
- **Developer**: For application-specific issues
- **Payment Providers**: Paystack and Safaricom for payment issues

---

## 🎯 Quick Deployment Commands

```bash
# 1. Build production files (already done)
cd backend && npm run build
cd ../frontend/gallo && npm run build

# 2. Compress for upload
tar -czf galloways-backend.tar.gz backend/
tar -czf galloways-frontend.tar.gz frontend/gallo/dist/

# 3. Upload to Aplin and extract
# 4. Configure environment variables
# 5. Install dependencies and start services
```

✅ **Your application is now production-ready for Aplin hosting!**
