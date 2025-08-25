# 🚀 Complete Aplin Hosting Backend Setup Guide

## Overview
This guide will help you deploy your NestJS backend to Aplin hosting for your insurance platform at api.galloways.co.ke.

## 📋 Prerequisites
- Aplin hosting account with Node.js support
- Domain: galloways.co.ke (main) 
- Subdomain: api.galloways.co.ke (backend)
- cPanel access to your hosting account
- PostgreSQL database (Neon or Aplin's database)

---

## Step 1: Prepare Your Backend Files

### 1.1 Download/Clone from GitHub
```bash
# On your local machine or download as ZIP
git clone https://github.com/iann-jpeg/Gallo-End.git
cd Gallo-End/backend
```

### 1.2 Files You Need to Upload to Aplin
```
backend/
├── dist/                 # Compiled JavaScript (upload this)
├── node_modules/         # Dependencies (will install on server)
├── package.json          # Required for npm install
├── package-lock.json     # Lock file for exact versions
├── prisma/              # Database schema
│   ├── schema.prisma
│   └── migrations/
└── uploads/             # Create this folder on server
    ├── claims/
    ├── quotes/
    └── outsourcing/
```

---

## Step 2: Aplin cPanel Setup

### 2.1 Create Subdomain for Backend
1. **Login to cPanel**
2. **Go to "Subdomains"**
3. **Create subdomain:**
   - Subdomain: `api`
   - Domain: `galloways.co.ke`
   - Document Root: `/public_html/api` (or similar)
4. **Click Create**

### 2.2 Enable Node.js (Important!)
1. **Find "Node.js App" in cPanel**
2. **Click "Create Application"**
3. **Configure:**
   - Node.js version: `18.x` or latest available
   - Application mode: `Production`
   - Application root: `/public_html/api` (your subdomain path)
   - Application URL: `api.galloways.co.ke`
   - Application startup file: `main.js`
4. **Click "Create"**

---

## Step 3: Upload Backend Files

### 3.1 Using File Manager (Recommended for beginners)
1. **Go to cPanel File Manager**
2. **Navigate to your subdomain folder** (`/public_html/api/`)
3. **Upload these files/folders:**
   ```
   📁 Upload to /public_html/api/:
   ├── dist/ (entire folder)
   ├── prisma/ (entire folder)
   ├── package.json
   ├── package-lock.json
   └── .env (create this - see Step 4)
   ```

### 3.2 Using FTP (Advanced users)
```bash
# Using FileZilla or similar FTP client
Host: your-domain.com
Username: your-cpanel-username
Password: your-cpanel-password
Port: 21

# Upload to: /public_html/api/
```

---

## Step 4: Environment Configuration

### 4.1 Create .env File on Server
Create `.env` file in `/public_html/api/` with:

```env
# Production Environment
NODE_ENV=production
PORT=3001

# Database Configuration (Use Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-hostname.neon.tech/database-name?sslmode=require"

# API URLs
API_BASE_URL=https://api.galloways.co.ke
FRONTEND_URL=https://galloways.co.ke

# Payment Integration
PAYSTACK_SECRET_KEY=sk_live_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_live_your_paystack_public_key

# M-PESA Configuration
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_business_shortcode
MPESA_PASSKEY=your_mpesa_passkey
MPESA_CALLBACK_URL=https://api.galloways.co.ke/api/payment/callback/mpesa

# Email Configuration (Optional)
SMTP_HOST=mail.galloways.co.ke
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@galloways.co.ke
SMTP_PASS=your_email_password

# Security
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
```

---

## Step 5: Install Dependencies on Server

### 5.1 Using cPanel Terminal (If available)
1. **Go to cPanel Terminal**
2. **Navigate to your app directory:**
   ```bash
   cd /home/yourusername/public_html/api
   npm install --production
   ```

### 5.2 Using Node.js App Manager (Recommended)
1. **Go back to "Node.js App" in cPanel**
2. **Click on your application**
3. **In "Package.json" section, click "Run NPM Install"**
4. **Wait for installation to complete**

---

## Step 6: Database Setup

### 6.1 Set up PostgreSQL Database
**Option A: Use Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create free PostgreSQL database
3. Copy connection string to your .env file

**Option B: Use Aplin's PostgreSQL (if available)**
1. Go to cPanel "PostgreSQL Databases"
2. Create database and user
3. Update DATABASE_URL in .env

### 6.2 Run Database Migrations
```bash
# In cPanel Terminal or SSH
cd /home/yourusername/public_html/api
npx prisma migrate deploy
npx prisma generate
```

---

## Step 7: Configure Node.js Application

### 7.1 Set Application Settings
1. **Go to "Node.js App" in cPanel**
2. **Click on your application**
3. **Update settings:**
   - **Startup file:** `dist/main.js`
   - **Application mode:** `Production`
   - **Environment variables:** Add if needed
4. **Click "Restart App"**

---

## Step 8: Create Required Folders

### 8.1 Upload Directories
Create these folders in `/public_html/api/`:
```
uploads/
├── claims/
├── quotes/
├── outsourcing/
└── resources/
```

### 8.2 Set Proper Permissions
```bash
# If you have SSH access
chmod 755 uploads/
chmod 755 uploads/claims/
chmod 755 uploads/quotes/
chmod 755 uploads/outsourcing/
```

---

## Step 9: Update Frontend Configuration

### 9.1 Update API URL in Frontend
The frontend needs to point to your live backend:

**Create production build with correct API URL:**
```bash
# In your local frontend folder
echo "VITE_API_BASE_URL=https://api.galloways.co.ke" > .env.production
npm run build
```

### 9.2 Upload Updated Frontend
Upload the new `dist/` folder to your main domain (`/public_html/`)

---

## Step 10: Test Your Backend

### 10.1 Health Check URLs
Test these URLs in your browser:
- `https://api.galloways.co.ke/api/health` - Should return `{"status":"healthy"}`
- `https://api.galloways.co.ke/api/dashboard/stats` - Should return statistics
- `https://api.galloways.co.ke/api/static/downloads` - Should list PDF forms

### 10.2 Common Issues and Solutions

**Issue: "Cannot connect to database"**
```bash
# Check database connection in cPanel Terminal
cd /home/yourusername/public_html/api
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL);"
```

**Issue: "Module not found"**
```bash
# Reinstall dependencies
npm install --production
npx prisma generate
```

**Issue: "Permission denied"**
```bash
# Fix file permissions
chmod -R 755 /home/yourusername/public_html/api
```

---

## Step 11: SSL Certificate (Important!)

### 11.1 Enable SSL for Subdomain
1. **Go to cPanel "SSL/TLS"**
2. **Choose "Let's Encrypt SSL" (if available)**
3. **Add certificate for `api.galloways.co.ke`**
4. **Force HTTPS redirect**

---

## Step 12: Final Configuration

### 12.1 Update CORS Settings
Your backend is already configured for production CORS:
```javascript
// Already set in main.ts
app.enableCors({
  origin: [
    'https://galloways.co.ke',
    'http://localhost:3000', // Remove in production
  ],
  credentials: true,
});
```

### 12.2 Restart Application
1. **Go to "Node.js App" in cPanel**
2. **Click "Restart App"**
3. **Check application status**

---

## ✅ Verification Checklist

- [ ] Subdomain `api.galloways.co.ke` created
- [ ] Node.js application configured and running
- [ ] All backend files uploaded
- [ ] Dependencies installed (`npm install` completed)
- [ ] Environment variables set in `.env`
- [ ] Database connected and migrations run
- [ ] Upload folders created with proper permissions
- [ ] SSL certificate installed for subdomain
- [ ] Frontend updated to use production API URL
- [ ] Health check endpoint responding
- [ ] CORS configured for your domain

---

## 🚨 Troubleshooting

### Common Aplin Issues:

**1. Node.js not available:**
- Contact Aplin support to enable Node.js
- Ensure you have a compatible hosting plan

**2. Database connection fails:**
- Use Neon PostgreSQL (more reliable than shared hosting DB)
- Check connection string format
- Verify SSL mode in connection string

**3. File upload issues:**
- Ensure upload folders exist
- Check file permissions (755 recommended)
- Verify disk space availability

**4. Application won't start:**
- Check startup file path: `dist/main.js`
- Verify package.json exists
- Check Node.js version compatibility

---

## 📞 Support Contacts

- **Aplin Support:** Contact for Node.js setup help
- **Neon Database:** For database connection issues
- **Domain/DNS:** Check with your domain registrar

---

## 🎉 Success!

Once completed, your backend will be live at:
- **API Base:** `https://api.galloways.co.ke/api/`
- **Health Check:** `https://api.galloways.co.ke/api/health`
- **Downloads:** `https://api.galloways.co.ke/api/static/downloads`

Your insurance platform will be fully operational with:
- ✅ File uploads and downloads
- ✅ Payment processing
- ✅ Admin dashboard
- ✅ All form submissions
- ✅ Database integration
