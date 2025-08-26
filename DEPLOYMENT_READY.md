# 🚀 Railway + cPanel Deployment - READY TO DEPLOY!

## ✅ **Your Configuration is Complete**

**Railway Domain**: `gallo-end-production.up.railway.app`  
**Frontend Domain**: `galloways.co.ke` (cPanel)  
**Database**: Neon PostgreSQL (configured and working)

---

## 🎯 **Architecture Overview**

```
Frontend (cPanel)          Backend (Railway)         Database (Neon)
─────────────────          ─────────────────         ───────────────
galloways.co.ke      →     gallo-end-production      PostgreSQL
Static React App           .up.railway.app           (Cloud DB)
```

---

## 🚀 **Deploy Your Backend to Railway**

### **Step 1: Deploy Backend**
```bash
cd /home/crash/Desktop/npm/backend

# Option A: Use our deployment script
./scripts/deploy-railway.sh

# Option B: Manual deployment
railway login
railway deploy
```

### **Step 2: Build Frontend for cPanel**
```bash
cd /home/crash/Desktop/npm/frontend

# Build with Railway API endpoints
./scripts/build-for-cpanel.sh
```

### **Step 3: Upload to cPanel**
```bash
# Create upload package
cd /home/crash/Desktop/npm/frontend
zip -r galloways-frontend.zip dist/*

# Upload to cPanel:
# 1. Login to cPanel
# 2. File Manager → public_html
# 3. Upload galloways-frontend.zip
# 4. Extract all files
```

---

## 🔧 **Configuration Summary**

### **✅ Backend (.env):**
- Database: `postgresql://neondb_owner:...@ep-square-art-aeup2xky-pooler.c-2.us-east-2.aws.neon.tech/neondb`
- M-PESA Callback: `https://gallo-end-production.up.railway.app/api/payments/callback/mpesa`
- Paystack Callback: `https://galloways.co.ke/payment/callback/paystack`
- Frontend URL: `https://galloways.co.ke`

### **✅ Frontend (.env.production):**
- API URL: `https://gallo-end-production.up.railway.app/api`
- Socket URL: `https://gallo-end-production.up.railway.app`
- App URL: `https://galloways.co.ke`

### **✅ API Configuration:**
- Main API: `https://gallo-end-production.up.railway.app/api`
- Socket.IO: `https://gallo-end-production.up.railway.app`
- Health Check: `https://gallo-end-production.up.railway.app/api/health`

---

## 🌐 **Production URLs**

Once deployed, your application will be available at:

- **Website**: `https://galloways.co.ke`
- **API**: `https://gallo-end-production.up.railway.app/api`
- **Admin Panel**: `https://galloways.co.ke/admin`
- **API Docs**: `https://gallo-end-production.up.railway.app/docs`

---

## ✅ **Ready to Deploy Checklist**

- ✅ Neon Database: Connected and tested
- ✅ Railway Configuration: Complete with correct domain
- ✅ Frontend API URLs: Updated to Railway backend
- ✅ Payment Callbacks: Configured for Railway
- ✅ CORS Settings: Allows galloways.co.ke
- ✅ Environment Variables: Production ready
- ✅ Build Scripts: Created and tested

---

## 🚀 **Final Commands**

```bash
# 1. Deploy Backend to Railway
cd /home/crash/Desktop/npm/backend
./scripts/deploy-railway.sh

# 2. Build Frontend for cPanel
cd /home/crash/Desktop/npm/frontend  
./scripts/build-for-cpanel.sh

# 3. Upload frontend/dist/ contents to cPanel
```

**Your hybrid Railway + cPanel architecture is ready to go live!** 🎉
