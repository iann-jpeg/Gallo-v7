# Railway Deployment Script for Galloways Backend
#!/bin/bash

echo "🚂 Deploying to Railway - Galloways Backend"
echo "============================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check if we're logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway first:"
    echo "Run: railway login"
    echo "Then run this script again."
    exit 1
fi

# Build the application
echo "🏗️ Building application..."
npm run build

# Deploy to Railway
echo "🚀 Deploying to Railway..."

# Set environment variables using correct Railway CLI syntax
echo "⚙️ Setting up environment variables..."
railway variables --set "NODE_ENV=production" \
  --set "DATABASE_URL=postgresql://neondb_owner:npg_hNOgA08YpHoL@ep-square-art-aeup2xky-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require" \
  --set "JWT_SECRET=GUhhG79KBEKhhSZ519YgUIwp+hqnx5cBUZdH89D5cceoVo0TtJ0znXLMN4wsxjqYmW4meEBw4z68ukJXxITH0w==" \
  --set "REFRESH_TOKEN_SECRET=AFfg9VCzgEMCQMmEWqNj06VeqakyQj1F6hVFP9KNiOBUH9hZgoKbyv0cY+zyPF02Rbvc7oNZhgCM4GP4i2R/QA==" \
  --set "FRONTEND_URL=https://galloways.co.ke" \
  --set "ADMIN_EMAIL=excel6737@gmail.com" \
  --set "SMTP_HOST=smtp.elasticemail.com" \
  --set "SMTP_PORT=2525" \
  --set "SMTP_USER=excel6737@gmail.com" \
  --set "SMTP_PASS=EF5B4990207916B7A4022328AAF8EAB72A22" \
  --set "SMTP_FROM=excel6737@gmail.com" \
  --set "SMTP_SECURE=false" \
  --set "MPESA_CALLBACK_URL=https://gallo-end-production.up.railway.app/api/payments/callback/mpesa" \
  --set "PAYSTACK_CALLBACK_URL=https://galloways.co.ke/payment/callback/paystack" \
  --skip-deploys

# Deploy the application
echo "🚀 Deploying application..."
railway deploy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Get your Railway URL: railway domain"
echo "2. Update your frontend to use the Railway API URL"
echo "3. Test the API endpoints"
echo ""
echo "📊 Monitor deployment:"
echo "railway logs"
echo ""
echo "🌐 Your backend will be available at your Railway domain"
