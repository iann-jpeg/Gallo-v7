# 🚀 Complete Aplin Deployment Guide for Galloways Insurance Platform

## 📋 Overview
This guide covers the complete deployment of both frontend and backend to Aplin hosting with PostgreSQL database integration.

---

## 🎯 **Backend Deployment (API)**

### **Prerequisites**
- ✅ Aplin hosting account with PostgreSQL database
- ✅ Database credentials: `gallowa2_galloways_user` / `gallowa2_gallowaysdb`
- ✅ Node.js environment on Aplin hosting
- ✅ Domain: `galloways.co.ke`

### **1. Backend Preparation**
```bash
cd backend/
chmod +x aplin-production-deploy.sh
./aplin-production-deploy.sh
```

### **2. Upload Backend Files**
Upload these files/folders to your Aplin hosting backend directory:
- `dist/` (compiled TypeScript)
- `prisma/` (database schema and migrations)
- `uploads/` (file storage directories)
- `node_modules/` (production dependencies)
- `package.json`
- `.env` (production environment variables)

### **3. Backend Environment Variables**
Ensure your `.env` file contains:
```bash
NODE_ENV=production
DATABASE_URL=postgresql://gallowa2_galloways_user:%29%3DF%5D%2A9F0AHj4QO%26y@localhost:5432/gallowa2_gallowaysdb
JWT_SECRET=your-secure-jwt-secret
API_BASE_URL=https://galloways.co.ke/api
FRONTEND_URL=https://galloways.co.ke
CORS_ORIGINS=https://galloways.co.ke,https://www.galloways.co.ke
```

### **4. Database Setup**
```bash
# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Optional: Seed initial data
npm run seed
```

### **5. Start Backend Service**
```bash
npm run start:prod
```

---

## 🌐 **Frontend Deployment (Website)**

### **1. Frontend Build**
```bash
cd frontend/
chmod +x aplin-frontend-build.sh
./aplin-frontend-build.sh
```

### **2. Upload Frontend Files**
Upload the entire `dist/` folder contents to your Aplin `public_html` directory:
- `index.html`
- `assets/` (CSS, JS, and other static assets)
- Any other files in the `dist/` folder

### **3. Frontend Configuration**
The frontend is pre-configured for production with:
- **API URL**: `https://galloways.co.ke/api`
- **Environment**: `production`
- **Optimizations**: Minified JS/CSS, removed console logs
- **Performance**: Code splitting and lazy loading

---

## ⚙️ **Aplin Hosting Configuration**

### **Domain Setup**
1. Point your domain `galloways.co.ke` to Aplin hosting
2. Ensure SSL certificate is properly configured
3. Set up proper DNS A/CNAME records

### **Server Configuration**
1. **Backend**: Usually runs on a subdirectory or specific port
2. **Frontend**: Serves from `public_html` root directory
3. **Database**: PostgreSQL accessible via localhost:5432

### **URL Structure**
- **Website**: `https://galloways.co.ke`
- **API**: `https://galloways.co.ke/api`
- **Admin**: `https://galloways.co.ke/admin`
- **Docs**: `https://galloways.co.ke/docs`

---

## 🔧 **Production Features Configured**

### **Backend**
- ✅ PostgreSQL database connection with proper credentials
- ✅ Environment-aware CORS settings
- ✅ Production security headers and CSP
- ✅ Email service (ElasticEmail SMTP)
- ✅ Payment gateways (M-PESA and Paystack)
- ✅ File upload handling
- ✅ Real-time admin dashboard
- ✅ Comprehensive error handling
- ✅ Health check endpoints

### **Frontend**
- ✅ Production API integration
- ✅ Optimized build with code splitting
- ✅ Environment-aware logging
- ✅ Responsive design for all devices
- ✅ Admin dashboard with real-time updates
- ✅ Form validation and error handling
- ✅ Payment integration UI
- ✅ File upload components
- ✅ SEO optimized

---

## 🧪 **Testing Your Deployment**

### **Backend Health Checks**
```bash
# Test API connectivity
curl https://galloways.co.ke/api/health

# Test database connection
curl https://galloways.co.ke/api/admin/health
```

### **Frontend Functionality**
1. Visit `https://galloways.co.ke`
2. Test form submissions (claims, consultations, etc.)
3. Test admin panel at `https://galloways.co.ke/admin`
4. Verify payment integration works
5. Check real-time dashboard updates

### **Key Endpoints to Test**
- **Health**: `/api/health`
- **Claims**: `/api/claims`
- **Consultations**: `/api/consultations`
- **Payments**: `/api/payments`
- **Admin Dashboard**: `/api/admin/dashboard`
- **Documentation**: `/docs`

---

## 🚨 **Troubleshooting**

### **Common Issues**

**Backend Won't Start**
- Check database connection string
- Verify environment variables
- Check Node.js version compatibility
- Review server logs

**Frontend Not Loading**
- Verify all files uploaded to `public_html`
- Check if `index.html` exists in root
- Verify API URL configuration
- Check browser console for errors

**Database Connection Failed**
- Confirm PostgreSQL service is running
- Verify database credentials
- Check if database exists
- Ensure user has proper permissions

**API Calls Failing**
- Check CORS configuration
- Verify API endpoints are active
- Test with curl or Postman
- Check authentication tokens

---

## 📞 **Support**

For deployment assistance:
1. **Backend Issues**: Check server logs and database connectivity
2. **Frontend Issues**: Verify file uploads and API configuration
3. **Database Issues**: Contact Aplin support for PostgreSQL access
4. **Domain Issues**: Verify DNS and SSL certificate setup

---

## 🎉 **Deployment Checklist**

### Backend ✅
- [ ] Backend files uploaded to Aplin hosting
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Backend service started successfully
- [ ] Health check endpoint responding
- [ ] API endpoints accessible

### Frontend ✅
- [ ] Frontend build generated successfully
- [ ] All dist files uploaded to public_html
- [ ] Website loads at galloways.co.ke
- [ ] API calls work from frontend
- [ ] Admin panel accessible
- [ ] Payment forms functional

### Final Verification ✅
- [ ] SSL certificate working
- [ ] All forms submit successfully
- [ ] Admin dashboard real-time updates working
- [ ] Email notifications sending
- [ ] Payment processing functional
- [ ] File uploads working
- [ ] Mobile responsiveness verified

---

**🌟 Your Galloways Insurance Platform is now live on Aplin hosting with full PostgreSQL integration!**
