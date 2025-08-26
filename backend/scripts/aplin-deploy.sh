#!/bin/bash

echo "🚀 Deploying Backend to Aplin PostgreSQL"
echo "========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the backend directory."
    exit 1
fi

# Set production environment
export NODE_ENV=production

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check database connection
echo "🔍 Testing database connection..."
npx prisma db execute --stdin <<< "SELECT 1 as test;" || {
    echo "❌ Database connection failed. Please check your DATABASE_URL in .env"
    exit 1
}

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build application
echo "🏗️ Building application..."
npm run build

echo ""
echo "✅ Aplin deployment preparation complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Upload this backend folder to your Aplin hosting"
echo "2. Update .env with your actual Aplin PostgreSQL credentials"
echo "3. Run: npm run start:prod"
echo ""
echo "🌐 Your backend will be ready at: https://galloways.co.ke"
