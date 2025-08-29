# Supabase Configuration Guide for Alpine Hosting

## 🔧 **Current Implementation Status**

### ✅ **Completed Setup**
- [x] Supabase client configuration
- [x] Environment variables configured  
- [x] API service layer with real-time capabilities
- [x] Admin dashboard with live updates
- [x] TypeScript definitions
- [x] File upload integration

### 🚨 **Critical Issues to Fix**

## 1. **Database Schema Missing**
Your Supabase project needs these tables:

```sql
-- Run supabase-setup.sql in your Supabase SQL Editor
-- This creates: users, consultations, quotes, diaspora_requests, 
-- outsourcing_requests, activities tables
```

## 2. **Environment Configuration**
Update your `.env.production` with the correct Supabase URLs:

```env
# Current (✅ Correct)
VITE_SUPABASE_URL=https://wctkikgmncnunntsiqdu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API endpoints now point to Supabase directly
VITE_API_BASE_URL=https://wctkikgmncnunntsiqdu.supabase.co/rest/v1
```

## 3. **Supabase Dashboard Configuration**

### **Authentication Settings**
1. Go to Authentication → Settings
2. Add your domain: `https://galloways.co.ke`
3. Add `http://localhost:8080` for development

### **API Settings**
1. Go to Settings → API
2. Add to CORS origins:
   - `https://galloways.co.ke`
   - `http://localhost:8080`

### **Storage Configuration**
1. Go to Storage → Buckets
2. Create bucket named `files`
3. Enable public access
4. Configure upload policies

## 4. **Row Level Security (RLS)**
Enable RLS for all tables but allow public access for now:
```sql
-- This is handled in supabase-setup.sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access" ON table_name FOR ALL USING (true);
```

## 5. **Real-time Configuration**
Enable real-time for all tables:
1. Go to Database → Replication
2. Enable replication for:
   - users
   - consultations  
   - quotes
   - diaspora_requests
   - outsourcing_requests
   - activities

## 🌐 **Alpine Hosting Deployment**

### **File Upload Process**
1. Build your project: `npm run build:prod`
2. Upload `dist/` contents to `public_html/`
3. Ensure `index.html` is in root directory

### **Domain Configuration**
- Domain: `galloways.co.ke`
- SSL: Ensure HTTPS is enabled
- Redirects: HTTP → HTTPS

### **No Backend Required**
Your frontend connects directly to Supabase:
- ✅ Database: Supabase PostgreSQL
- ✅ Storage: Supabase Storage  
- ✅ Real-time: Supabase Realtime
- ✅ Auth: Supabase Auth (when needed)

## 🧪 **Testing Checklist**

### **Forms & Submissions**
- [ ] Contact forms submit to Supabase
- [ ] Claims submissions work
- [ ] Consultation bookings save
- [ ] File uploads function

### **Real-time Features**  
- [ ] Admin dashboard shows live data
- [ ] Notifications appear for new submissions
- [ ] Auto-refresh works correctly

### **Performance**
- [ ] Fast page loads
- [ ] Mobile responsive
- [ ] SEO optimized

## 📋 **Quick Setup Commands**

```bash
# 1. Run setup script
./setup-supabase.sh

# 2. Build for production  
npm run build:prod

# 3. Test locally
npm run preview:prod
```

## 🔍 **Troubleshooting**

### **Common Issues**
1. **CORS Error**: Add your domain to Supabase CORS settings
2. **Table not found**: Run the SQL setup script
3. **Real-time not working**: Enable replication in Supabase
4. **File uploads fail**: Check storage bucket permissions

### **Debug Tools**
- Browser Developer Tools → Network tab
- Supabase Dashboard → Logs
- Console errors and warnings

## 🚀 **Production Deployment Flow**

1. **Supabase Setup** → Run SQL script + configure settings
2. **Build Project** → `npm run build:prod` 
3. **Upload to Alpine** → Upload `dist/` to `public_html/`
4. **Test Everything** → Forms, real-time, mobile
5. **Monitor** → Check logs and user feedback

Your frontend is now configured to work seamlessly with Supabase on Alpine hosting! 🎉
