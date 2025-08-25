# 🚀 Complete Aplin Backend Configuration Guide

## Step-by-Step Backend Deployment on Aplin Hosting

### 1. Prerequisites Setup

**Before starting, ensure you have:**
- ✅ Aplin hosting account with Node.js support
- ✅ Subdomain created: `api.galloways.co.ke`
- ✅ Database access (if using Aplin's database) or Neon PostgreSQL credentials
- ✅ GitHub repository access: `https://github.com/iann-jpeg/Gallo-End.git`

### 2. Aplin Control Panel Configuration

#### A. Enable Node.js for your subdomain
1. Login to Aplin Control Panel
2. Go to **"Software"** → **"Node.js Apps"**
3. Click **"Create App"**
4. Configure:
   - **Node.js Version:** 18.x or 20.x (latest LTS)
   - **Application Root:** `/public_html/api.galloways.co.ke/`
   - **Application URL:** `api.galloways.co.ke`
   - **Application Startup File:** `dist/src/main.js`

#### B. Environment Variables Setup
In the Node.js app configuration, add these environment variables:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
NODE_ENV=production

# API Configuration
API_BASE_URL=https://api.galloways.co.ke
FRONTEND_URL=https://galloways.co.ke
PORT=3001

# Payment Integration
PAYSTACK_SECRET_KEY=sk_live_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_live_your_paystack_public_key

# M-PESA Configuration (Kenya)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_business_shortcode
MPESA_PASSKEY=your_mpesa_passkey
MPESA_ENVIRONMENT=sandbox  # or 'production' for live

# Email Configuration (Optional)
SMTP_HOST=mail.galloways.co.ke
SMTP_PORT=587
SMTP_USER=noreply@galloways.co.ke
SMTP_PASS=your_email_password
SMTP_FROM=noreply@galloways.co.ke

# JWT Secret (Generate a random 32+ character string)
JWT_SECRET=your_super_secure_random_jwt_secret_key_here

# File Upload Configuration
UPLOAD_DEST=./uploads
MAX_FILE_SIZE=10485760  # 10MB in bytes
```

### 3. File Upload and Deployment

#### Option A: Direct Upload via File Manager
1. Download the GitHub repository as ZIP
2. Extract and navigate to the `backend` folder
3. Upload these folders/files to your subdomain directory:
   ```
   /public_html/api.galloways.co.ke/
   ├── dist/                 (compiled TypeScript)
   ├── node_modules/         (if pre-built)
   ├── uploads/              (create this folder)
   ├── package.json
   ├── package-lock.json
   ├── .env                  (create with your variables)
   └── prisma/               (database schema)
   ```

#### Option B: Git Clone (Recommended)
If Aplin supports SSH/terminal access:
```bash
cd /public_html/api.galloways.co.ke/
git clone https://github.com/iann-jpeg/Gallo-End.git .
cd backend
npm install --production
npm run build
```

### 4. Database Setup

#### If using Neon PostgreSQL (Recommended):
1. Your `DATABASE_URL` should look like:
   ```
   postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

#### If using Aplin's MySQL:
You'll need to modify the Prisma schema. Contact me if you need help with MySQL conversion.

### 5. Dependencies Installation

In your Node.js app terminal or via SSH:
```bash
cd /public_html/api.galloways.co.ke/backend
npm install --production
```

**Required Dependencies:**
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@prisma/client": "latest",
    "prisma": "latest",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "helmet": "^7.0.0",
    "cors": "^2.8.5"
  }
}
```

### 6. Database Migration

Run these commands in order:
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed initial data
npx prisma db seed
```

### 7. Create Required Directories

Create these folders with proper permissions:
```bash
mkdir -p uploads/claims
mkdir -p uploads/quotes
mkdir -p uploads/outsourcing
mkdir -p uploads/resources

# Set permissions (if you have SSH access)
chmod 755 uploads/
chmod 755 uploads/*/
```

### 8. SSL Certificate Setup

1. In Aplin Control Panel, go to **"Security"** → **"SSL/TLS"**
2. Enable **"Let's Encrypt SSL"** for `api.galloways.co.ke`
3. Force HTTPS redirect

### 9. Test Your Backend

#### Health Check Endpoints:
1. **Basic Health:** `https://api.galloways.co.ke/api/health`
   - Should return: `{"status":"healthy","timestamp":"..."}`

2. **Deep Health:** `https://api.galloways.co.ke/api/health/deep`
   - Should return database connection status and table counts

3. **File Downloads:** `https://api.galloways.co.ke/api/static/downloads`
   - Should return list of available insurance forms

### 10. Aplin-Specific Configuration Files

#### Create `.htaccess` in your Node.js app root:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.js [L]

# Enable CORS headers
Header always set Access-Control-Allow-Origin "https://galloways.co.ke"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
```

#### Create `startup.js` (if needed):
```javascript
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/src/app.module');
const helmet = require('helmet');
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://galloways.co.ke"],
        formAction: ["'self'"],
        scriptSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  app.enableCors({
    origin: ['https://galloways.co.ke', 'https://www.galloways.co.ke'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  });

  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API Server running on https://api.galloways.co.ke`);
}
bootstrap();
```

### 11. Troubleshooting Common Issues

#### If Node.js app won't start:
1. Check the startup file path in Aplin control panel
2. Verify environment variables are set correctly
3. Check error logs in Aplin control panel

#### If database connection fails:
1. Verify `DATABASE_URL` format
2. Check if database allows connections from Aplin's IP
3. Ensure SSL mode is correct (`?sslmode=require` for Neon)

#### If file uploads don't work:
1. Check folder permissions: `chmod 755 uploads/`
2. Verify `UPLOAD_DEST` environment variable
3. Check disk space on Aplin hosting

### 12. Production Monitoring

#### Set up monitoring endpoints:
- `GET /api/health` - Basic health check
- `GET /api/health/deep` - Database and performance check
- Monitor response times and database connections

#### Log management:
- Check Aplin error logs regularly
- Monitor database query performance
- Set up email alerts for critical errors

### 13. Security Checklist

- ✅ HTTPS enabled with SSL certificate
- ✅ Environment variables secured (not in code)
- ✅ CORS configured for your domain only
- ✅ File upload validation active
- ✅ JWT secrets are secure random strings
- ✅ Database connection uses SSL
- ✅ Rate limiting enabled (if supported by Aplin)

## 🎯 Final Verification Steps

After deployment, test these key endpoints:

1. **Health Check:** `https://api.galloways.co.ke/api/health`
2. **Downloads:** `https://api.galloways.co.ke/api/static/downloads`  
3. **Dashboard Stats:** `https://api.galloways.co.ke/api/dashboard/stats`
4. **Claims Submission:** POST to `https://api.galloways.co.ke/api/claims`

## 📞 Need Help?

If you encounter issues:
1. Check Aplin's error logs first
2. Verify all environment variables
3. Test database connection separately
4. Contact Aplin support for Node.js specific issues

Your backend should now be fully functional on Aplin hosting! 🚀
