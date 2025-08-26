# 🚀 Railway + cPanel Hybrid Deployment Guide

## ✅ **Implementation Complete!**

Your Galloways Insurance Platform is now configured for the **Railway + cPanel hybrid architecture**:

- **Frontend**: Static hosting on cPanel (`https://galloways.co.ke`)
- **Backend**: Node.js hosting on Railway (`https://galloways-backend-production.up.railway.app`)
- **Database**: Neon PostgreSQL (already configured and working)

---

## 🏗️ **Architecture Overview**

```
User Request Flow:
1. User visits → https://galloways.co.ke (cPanel)
2. Frontend loads → Static files from cPanel
3. API calls → https://galloways-backend-production.up.railway.app (Railway)
4. Data processing → Railway backend + Neon PostgreSQL
5. Response → Back to frontend on galloways.co.ke
```

---

## 🚂 **Step 1: Deploy Backend to Railway**

### **Prerequisites:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login
```

### **Deploy Backend:**
```bash
# Navigate to backend
cd /home/crash/Desktop/npm/backend

# Run deployment script
./scripts/deploy-railway.sh

# OR deploy manually:
railway init
railway deploy
```

### **Set Environment Variables in Railway Dashboard:**
- `NODE_ENV=production`
- `DATABASE_URL=postgresql://neondb_owner:npg_hNOgA08YpHoL@ep-square-art-aeup2xky-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require`
- All other environment variables from your `.env` file

---

## 🌐 **Step 2: Deploy Frontend to cPanel**

### **Build Frontend:**
```bash
# Navigate to frontend
cd /home/crash/Desktop/npm/frontend

# Build for production (points to Railway backend)
./scripts/build-for-cpanel.sh
```

### **Upload to cPanel:**
1. **Create ZIP file:**
   ```bash
   cd dist/
   zip -r ../galloways-frontend.zip *
   ```

2. **Upload via cPanel:**
   - Login to cPanel File Manager
   - Navigate to `public_html/`
   - Upload `galloways-frontend.zip`
   - Extract all files to `public_html/`

3. **Verify Upload:**
   - Visit `https://galloways.co.ke`
   - Check browser console for API connections
   - Test form submissions

---

## ⚙️ **Configuration Summary**

### **Backend (Railway):**
- ✅ CORS configured for `galloways.co.ke`
- ✅ Railway-optimized main.ts (listens on 0.0.0.0)
- ✅ Environment variables ready for Railway
- ✅ Neon PostgreSQL connection tested
- ✅ Socket.IO configured for cross-origin

### **Frontend (cPanel):**
- ✅ API endpoints point to Railway backend
- ✅ Socket.IO connects to Railway for real-time features
- ✅ Production build optimized for static hosting
- ✅ Environment variables configured

### **Database (Neon):**
- ✅ PostgreSQL connection working
- ✅ All migrations applied
- ✅ SSL connection configured

---

## 🔧 **Railway Deployment Commands**

```bash
# Check deployment status
railway status

# View logs
railway logs

# Get your Railway URL
railway domain

# Set environment variables
railway variables set KEY=value

# Redeploy
railway deploy
```

---

## 📋 **Post-Deployment Checklist**

### **Backend (Railway):**
- [ ] Backend deployed and running
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] API endpoints accessible
- [ ] CORS working with cPanel frontend

### **Frontend (cPanel):**
- [ ] Files uploaded to `public_html/`
- [ ] Website loads at `galloways.co.ke`
- [ ] API calls reach Railway backend
- [ ] Forms submit successfully
- [ ] Real-time features working

### **Integration Testing:**
- [ ] User registration works
- [ ] Claims submission works
- [ ] Admin dashboard connects
- [ ] Email notifications send
- [ ] Payment callbacks work

---

## 🌍 **Production URLs**

- **Frontend**: https://galloways.co.ke
- **Backend**: https://galloways-backend-production.up.railway.app
- **API**: https://galloways-backend-production.up.railway.app/api
- **Admin**: https://galloways.co.ke/admin
- **Docs**: https://galloways-backend-production.up.railway.app/docs

---

## 💰 **Cost Overview**

- **cPanel**: Your existing hosting plan
- **Railway**: Free tier → $5/month for production
- **Neon**: Free tier (1GB) → $24/month for production
- **Total**: ~$5-29/month for professional architecture

---

## 🚨 **Troubleshooting**

### **CORS Issues:**
- Check Railway backend logs: `railway logs`
- Verify origin in main.ts includes your domain

### **API Not Connecting:**
- Check Railway deployment status
- Verify API URL in frontend `.env.production`
- Test API directly: `https://your-railway-url.railway.app/api/health`

### **Database Issues:**
- Check Neon database status
- Verify DATABASE_URL in Railway environment variables
- Run migrations: `railway run npx prisma migrate deploy`

---

## ✨ **Benefits Achieved**

1. **Scalability**: Railway auto-scales your backend
2. **Performance**: Static files from cPanel, API from Railway
3. **Reliability**: Distributed architecture with redundancy
4. **Security**: CORS properly configured, HTTPS everywhere
5. **Cost**: Optimal cost for professional deployment

---

## 🎯 **Your Next Steps**

1. **Deploy to Railway** using the deployment script
2. **Build and upload frontend** to cPanel
3. **Test the integration** end-to-end
4. **Monitor performance** and adjust as needed

Your hybrid architecture is now ready for production! 🚀
