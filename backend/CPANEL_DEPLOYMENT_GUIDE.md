# 🚀 cPanel Deployment Guide - Galloways Backend with Neon Database

## ✅ **READY FOR cPANEL DEPLOYMENT**

Your Galloways Insurance Platform backend is now fully configured and tested with Neon PostgreSQL database.

---

## 🗄️ **Database Configuration - Neon PostgreSQL**

✅ **Connection String**: `postgresql://neondb_owner:npg_hNOgA08YpHoL@ep-square-art-aeup2xky-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require`

✅ **Database Status**: 
- Connection tested and working ✅
- Migrations applied successfully ✅
- Schema ready for production ✅

---

## 📁 **Files Ready for cPanel Upload**

Your backend directory (`/home/crash/Desktop/npm/backend/`) contains:

### **Essential Files**:
- ✅ `package.json` - Dependencies and scripts
- ✅ `package-lock.json` - Dependency lock file
- ✅ `.env` - Production environment (with Neon DB URL)
- ✅ `dist/` - Compiled JavaScript files
- ✅ `node_modules/` - All dependencies installed
- ✅ `prisma/` - Database schema and migrations
- ✅ `uploads/` - File upload directories

### **Entry Point**: `dist/main.js`

---

## 🎯 **cPanel Setup Instructions**

### **Step 1: Upload Files**
1. **Compress** the entire `/home/crash/Desktop/npm/backend/` folder into a ZIP file
2. **Login** to your cPanel
3. **Open** File Manager
4. **Navigate** to your domain folder (e.g., `public_html` or subdomain folder)
5. **Upload** the ZIP file
6. **Extract** all files

### **Step 2: Configure Node.js Application**
1. **Go to** "Setup Node.js App" in cPanel
2. **Click** "Create Application"
3. **Configure**:
   - **Node.js Version**: 18.x or higher
   - **Application Mode**: Production
   - **Application Root**: `/path/to/your/backend` (where you extracted files)
   - **Application URL**: `galloways.co.ke` (your domain)
   - **Application Startup File**: `dist/main.js`
   - **Environment Variables**: Leave blank (using .env file)

### **Step 3: Install Dependencies (if needed)**
If cPanel doesn't detect dependencies automatically:
```bash
npm install --production
```

### **Step 4: Start Application**
1. **Click** "Start App" in Node.js App interface
2. **Verify** the application is running

---

## 🔧 **Environment Configuration**

Your `.env` file is already configured with:

```env
# Database - Neon PostgreSQL  
DATABASE_URL=postgresql://neondb_owner:npg_hNOgA08YpHoL@ep-square-art-aeup2xky-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require

# Application
NODE_ENV=production
PORT=3001

# Email Service (ElasticEmail)
SMTP_HOST=smtp.elasticemail.com
SMTP_USER=excel6737@gmail.com
# ... all other configurations ready
```

---

## 🌐 **API Endpoints Available**

Once deployed, your API will be available at:
- **Base URL**: `https://galloways.co.ke/api`
- **Health Check**: `https://galloways.co.ke/api/health`
- **Admin Panel**: `https://galloways.co.ke/api/admin/dashboard`
- **API Docs**: `https://galloways.co.ke/docs` (if Swagger is enabled)

---

## ✅ **Pre-Deployment Checklist**

- ✅ Neon database connected and tested
- ✅ All migrations applied
- ✅ TypeScript compiled to JavaScript
- ✅ Prisma client generated
- ✅ Production dependencies installed
- ✅ Environment variables configured
- ✅ File permissions set correctly
- ✅ Application tested locally

---

## 🚨 **Important Notes**

1. **Database**: Using Neon PostgreSQL (cloud-hosted, no local DB needed)
2. **SSL**: Neon requires SSL connection (already configured)
3. **File Uploads**: `uploads/` directory needs write permissions (777)
4. **Port**: Application runs on port 3001 (cPanel will handle routing)
5. **Environment**: Set to production mode

---

## 🛠️ **Troubleshooting**

### **If Application Won't Start**:
1. Check Node.js version (needs 18+)
2. Verify startup file path: `dist/main.js`
3. Check error logs in cPanel

### **If Database Connection Fails**:
1. Verify DATABASE_URL in .env file
2. Check Neon database status
3. Ensure SSL is enabled

### **If File Uploads Don't Work**:
```bash
chmod 777 uploads/
chmod 777 uploads/claims/
chmod 777 uploads/quotes/
chmod 777 uploads/resources/
```

---

## 🎉 **You're Ready!**

Your backend is now fully prepared for cPanel deployment with Neon database. Simply upload and configure in cPanel to go live!

**Database**: Neon PostgreSQL ✅  
**Build**: Complete ✅  
**Configuration**: Production-ready ✅  
**Dependencies**: Installed ✅
