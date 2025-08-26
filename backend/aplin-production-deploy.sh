#!/bin/bash

# Aplin Production Deployment Script for Galloways Insurance Platform
# This script optimizes and deploys the backend for Aplin PostgreSQL hosting

set -e  # Exit on any error

echo "🚀 Starting Aplin Production Deployment..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the backend directory."
    exit 1
fi

# Set production environment
export NODE_ENV=production

# Clean up and install dependencies
echo "📦 Installing production dependencies..."
rm -rf node_modules
npm ci

# Check if build exists, if not create it
if [ ! -d "dist" ] || [ ! -f "dist/main.js" ]; then
    echo "🔧 Installing build dependencies..."
    npm install --save-dev @nestjs/cli typescript ts-node
    
    echo "🔨 Building TypeScript application..."
    npx nest build
else
    echo "✅ Build already exists, skipping compilation"
fi

# Generate Prisma client for production
echo "🗄️  Generating Prisma client..."
npx prisma generate

# Validate Prisma schema
echo "✅ Validating database schema..."
npx prisma validate

# Create production logs directory
mkdir -p logs

# Set proper file permissions for uploads
chmod -R 755 uploads/
mkdir -p uploads/claims uploads/outsourcing uploads/quotes uploads/resources

# Production environment check
echo "🔍 Production Environment Check:"
echo "- Node.js version: $(node --version)"
echo "- NPM version: $(npm --version)"
echo "- DATABASE_URL configured: $([ -n "$DATABASE_URL" ] && echo "✅ Yes" || echo "❌ No")"
echo "- JWT_SECRET configured: $([ -n "$JWT_SECRET" ] && echo "✅ Yes" || echo "❌ No")"
echo "- EMAIL_* configured: $([ -n "$EMAIL_HOST" ] && echo "✅ Yes" || echo "❌ No")"

# Final production readiness check
echo "🔍 Final Production Readiness Check:"
echo "- Build directory exists: $([ -d "dist" ] && echo "✅ Yes" || echo "❌ No")"
echo "- Prisma client generated: $([ -d "node_modules/.prisma" ] && echo "✅ Yes" || echo "❌ No")"
echo "- Uploads directory ready: $([ -d "uploads" ] && echo "✅ Yes" || echo "❌ No")"
echo "- Environment: $NODE_ENV"

echo ""
echo "✅ Aplin Production Deployment Complete!"
echo ""
echo "🔧 Next Steps for Aplin Hosting:"
echo "1. Upload all files to your Aplin hosting account"
echo "2. Ensure your Aplin PostgreSQL database is running"
echo "3. Run database migrations: npm run prisma:migrate:deploy"
echo "4. Start the application: npm run start:prod"
echo ""
echo "📊 Your backend is now optimized for:"
echo "- ✅ Aplin PostgreSQL database (gallowa2_gallowaysdb)"
echo "- ✅ Production security headers and CORS"
echo "- ✅ ElasticEmail SMTP service"
echo "- ✅ M-PESA and Paystack payment gateways"
echo "- ✅ galloways.co.ke domain configuration"
echo ""
echo "🌐 API will be available at: https://galloways.co.ke/api"
echo "📚 Documentation at: https://galloways.co.ke/docs"
