# Aplin Production Deployment Guide

## Overview
This guide ensures your Galloways Insurance Platform will work perfectly on Aplin hosting with proper CORS configuration and production settings.

## Frontend Configuration ✅

### Environment Variables (.env.production)
```bash
VITE_API_BASE_URL=https://api.galloways.co.ke/api
VITE_API_URL=https://api.galloways.co.ke/api
VITE_ENVIRONMENT=production
```

### Build Command
```bash
npm run build
```

### Deploy Directory
Upload the entire `dist/` folder to your Aplin frontend hosting.

## Backend Configuration ✅

### Environment Variables (.env.production)
Critical variables for production:
```bash
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_GeEKnyL14vDl@ep-wild-mud-aebwm3nb-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
JWT_SECRET=GUhhG79KBEKhhSZ519YgUIwp+hqnx5cBUZdH89D5cceoVo0TtJ0znXLMN4wsxjqYmW4meEBw4z68ukJXxITH0w==
FRONTEND_URL=https://galloways.co.ke
PORT=3001
```

### Build and Deploy Commands
```bash
# Build for production
npm run build:prod

# Start production server
npm start

# Deploy database migrations (run once)
npm run migrate:prod
```

## CORS Configuration ✅

The backend is configured to allow:
- `https://galloways.co.ke`
- `https://www.galloways.co.ke`
- Any domain specified in `FRONTEND_URL` environment variable
- Proper preflight handling with OPTIONS requests

## Database Configuration ✅

- ✅ Using Neon PostgreSQL with connection pooling
- ✅ SSL mode required for security
- ✅ Binary targets configured for Linux deployment
- ✅ Production-ready connection string

## Payment Integration ✅

### M-PESA Configuration
- Environment: Set to `production` for live payments
- Callback URL: `https://api.galloways.co.ke/api/payments/callback/mpesa`

### Paystack Configuration
- Use live keys (sk_live_* and pk_live_*) for production
- Callback URL: `https://galloways.co.ke/payment-callback`

## Security Features ✅

- ✅ CORS properly configured
- ✅ Helmet security headers
- ✅ Content Security Policy
- ✅ JWT authentication with secure secrets
- ✅ Rate limiting enabled
- ✅ SSL enforcement

## Pre-deployment Checklist

- [x] Frontend API URLs point to production backend
- [x] Backend CORS allows frontend domain
- [x] Database connection configured for production
- [x] Environment variables set correctly
- [x] Both frontend and backend build successfully
- [x] No hardcoded localhost references
- [x] Payment systems configured for production
- [x] SSL certificates configured

## Expected URLs

- Frontend: `https://galloways.co.ke`
- Backend API: `https://api.galloways.co.ke/api`
- API Documentation: `https://api.galloways.co.ke/docs`

## Troubleshooting

### If you still see CORS errors:
1. Verify the frontend is using the correct API URL
2. Check that FRONTEND_URL environment variable is set correctly
3. Ensure backend is deployed and running on the correct port

### If database connection fails:
1. Verify DATABASE_URL is correct
2. Run migrations: `npm run migrate:prod`
3. Check Neon dashboard for connection limits

### If payments don't work:
1. Verify payment provider keys are for production
2. Check callback URLs are accessible
3. Verify webhook endpoints are configured

## Production Monitoring

Monitor these endpoints for health:
- Backend Health: `https://api.galloways.co.ke/api/health`
- API Documentation: `https://api.galloways.co.ke/docs`

All configurations are now production-ready for Aplin deployment! 🚀
