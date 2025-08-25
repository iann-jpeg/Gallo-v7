# 🚀 PRODUCTION DEPLOYMENT - APLIN HOSTING SETUP

## CRITICAL: Complete Setup Guide for Live Environment

### 📋 WHAT YOU NEED TO UPLOAD

**FRONTEND (Main Domain: galloways.co.ke)**
Upload ALL contents of `/frontend/dist/` to `/public_html/`:
```
/public_html/
├── index.html
├── assets/ (entire folder)
├── Downloads/ (move from public/Downloads/)
├── LOGOS/ (move from public/LOGOS/)
├── pictures/ (move from public/pictures/)
└── All other files from dist/
```

**BACKEND (Subdomain: api.galloways.co.ke)**
Upload these files to `/public_html/api/`:
```
/public_html/api/
├── dist/ (entire compiled backend folder)
├── prisma/ (entire folder with schema and migrations)
├── package.json
├── package-lock.json
├── .env (create new - see below)
└── uploads/ (create folders: claims/, quotes/, outsourcing/, resources/)
```

---

## 🔧 BACKEND SETUP ON APLIN

### Step 1: Create Subdomain
1. **Login to cPanel**
2. **Go to "Subdomains"**
3. **Create:** `api.galloways.co.ke` → `/public_html/api`

### Step 2: Enable Node.js Application
1. **Find "Node.js App" in cPanel**
2. **Create Application:**
   - **Node.js version:** Latest available (18.x or 20.x)
   - **Application mode:** Production
   - **Application root:** `/public_html/api`
   - **Application URL:** `api.galloways.co.ke`
   - **Startup file:** `dist/main.js`

### Step 3: Create Production .env File
Create `/public_html/api/.env` with:

```env
# PRODUCTION ENVIRONMENT
NODE_ENV=production
PORT=3001

# DATABASE - Your existing Neon PostgreSQL
DATABASE_URL=postgresql://neondb_owner:npg_GeEKnyL14vDl@ep-wild-mud-aebwm3nb-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true

# JWT CONFIGURATION
JWT_SECRET=GUhhG79KBEKhhSZ519YgUIwp+hqnx5cBUZdH89D5cceoVo0TtJ0znXLMN4wsxjqYmW4meEBw4z68ukJXxITH0w==
REFRESH_TOKEN_SECRET=AFfg9VCzgEMCQMmEWqNj06VeqakyQj1F6hVFP9KNiOBUH9hZgoKbyv0cY+zyPF02Rbvc7oNZhgCM4GP4i2R/QA==

# API CONFIGURATION
API_KEYS=your_api_keys_here
PORT=3001

# EMAIL CONFIGURATION
SMTP_HOST=smtp.elasticemail.com
SMTP_PORT=2525
SMTP_USER=excel6737@gmail.com
SMTP_PASS=EF5B4990207916B7A4022328AAF8EAB72A22
SMTP_FROM=excel6737@gmail.com
SMTP_SECURE=false

# ADMIN CONFIGURATION
ADMIN_EMAIL=excel6737@gmail.com

# FRONTEND URL
FRONTEND_URL=https://galloways.co.ke

# PAYMENT CONFIGURATION
PAYSTACK_SECRET_KEY=sk_live_your_actual_live_key
PAYSTACK_PUBLIC_KEY=pk_live_your_actual_live_key
PAYSTACK_API_URL=https://api.paystack.co
PAYSTACK_CALLBACK_URL=https://galloways.co.ke/#/payment/callback
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret

# M-PESA CONFIGURATION (Production)
MPESA_CONSUMER_KEY=your_live_consumer_key
MPESA_CONSUMER_SECRET=your_live_consumer_secret
MPESA_SHORTCODE=your_live_shortcode
MPESA_PASSKEY=your_live_passkey
MPESA_INITIATOR_NAME=your_initiator_name
MPESA_INITIATOR_PASSWORD=your_initiator_password
MPESA_CALLBACK_URL=https://api.galloways.co.ke/api/payments/callback/mpesa
MPESA_ENVIRONMENT=production

# GENERAL PAYMENT
PAYMENT_CURRENCY=KES
```

### Step 4: Install Dependencies
1. **In Node.js App interface:**
   - Click "Run NPM Install"
   - Wait for completion

### Step 5: Run Database Migrations
1. **SSH or Terminal in cPanel:**
```bash
cd /home/yourusername/public_html/api
npx prisma migrate deploy
npx prisma generate
```

### Step 6: Create Upload Directories
Create these folders in `/public_html/api/`:
```bash
mkdir -p uploads/claims
mkdir -p uploads/quotes  
mkdir -p uploads/outsourcing
mkdir -p uploads/resources
chmod 755 uploads -R
```

### Step 7: Start Application
1. **In Node.js App interface:**
   - **Startup file:** `dist/main.js`
   - **Click "Restart App"**

---

## 🌐 FRONTEND CONFIGURATION

Your frontend is already configured with:
- ✅ **API URL:** `https://api.galloways.co.ke/api`
- ✅ **HashRouter:** Works without server config
- ✅ **Admin Panel:** `https://galloways.co.ke/#/admin`

---

## 🔍 TESTING YOUR DEPLOYMENT

### Test URLs (Must Work):
1. **Homepage:** `https://galloways.co.ke`
2. **Admin Panel:** `https://galloways.co.ke/#/admin`
3. **API Health:** `https://api.galloways.co.ke/api/health`
4. **Database Stats:** `https://api.galloways.co.ke/api/dashboard/stats`

### Admin Panel Access:
- **URL:** `https://galloways.co.ke/#/admin`
- **Should load immediately** (no login required)
- **Dashboard shows real data** from database
- **All admin functions work** (claims, quotes, users, etc.)

---

## 🚨 TROUBLESHOOTING

### If Admin Panel Doesn't Load:
1. **Check browser console** for errors
2. **Test API health:** `https://api.galloways.co.ke/api/health`
3. **Verify Node.js app is running** in cPanel
4. **Check .env file** is properly configured

### If API Calls Fail:
1. **Verify subdomain** `api.galloways.co.ke` resolves
2. **Check SSL certificate** for subdomain
3. **Restart Node.js application**
4. **Check application logs** in cPanel

### Database Connection Issues:
1. **Verify DATABASE_URL** is exactly as provided
2. **Test connection** with: `npx prisma db pull`
3. **Check Neon dashboard** for connection limits

---

## ✅ SUCCESS CHECKLIST

- [ ] Frontend uploaded to `/public_html/`
- [ ] Backend uploaded to `/public_html/api/`
- [ ] Node.js app created and configured
- [ ] .env file created with production values
- [ ] Dependencies installed (`npm install`)
- [ ] Database migrations run (`prisma migrate deploy`)
- [ ] Upload folders created with permissions
- [ ] SSL certificates installed for both domains
- [ ] Admin panel accessible at `/#/admin`
- [ ] API endpoints responding correctly

---

## 🎯 FINAL RESULT

**Your insurance platform will be fully functional with:**
- ✅ **Live admin panel** with database connectivity
- ✅ **Real-time dashboard** with actual data
- ✅ **Form submissions** stored in database
- ✅ **File uploads/downloads** working
- ✅ **Payment processing** with Paystack & M-PESA
- ✅ **Email notifications** for all forms

**Admin Panel:** `https://galloways.co.ke/#/admin`
**All functionality preserved and connected to live database!**
