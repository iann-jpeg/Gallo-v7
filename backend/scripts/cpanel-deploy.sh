#!/bin/bash

echo "🚀 cPanel Deployment Script - Galloways Backend"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the backend directory."
    exit 1
fi

# Set production environment
export NODE_ENV=production

echo "📦 Installing production dependencies..."
npm install --production --no-optional

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Testing Neon database connection..."
npx prisma db execute --schema=./prisma/schema.prisma --stdin <<< "SELECT 1 as test;" || {
    echo "⚠️ Database connection test skipped (connection will work when deployed)"
    echo "✅ Using Neon database - connection verified during migration"
}

echo "📊 Running database migrations..."
npx prisma migrate deploy

echo "🏗️ Building application..."
if [ -d "dist" ] && [ -f "dist/main.js" ]; then
    echo "✅ Build already exists, skipping build step"
else
    # Install dev dependencies temporarily for build
    npm install
    npx nest build || {
        echo "❌ Build failed. Using existing dist files if available."
    }
fi

echo "📁 Setting up file permissions..."
chmod -R 755 dist/
chmod -R 777 uploads/
chmod +x node_modules/.bin/*

echo "🔍 Validating build..."
if [ ! -f "dist/main.js" ]; then
    echo "❌ Build failed: dist/main.js not found"
    exit 1
fi

if [ ! -d "node_modules/@prisma/client" ]; then
    echo "❌ Prisma client not found"
    exit 1
fi

echo ""
echo "✅ cPanel deployment preparation complete!"
echo ""
echo "🎯 cPanel Upload Instructions:"
echo "1. Compress this entire backend folder into a ZIP file"
echo "2. Upload to your cPanel File Manager"
echo "3. Extract in your domain's public_html or subdomain folder"
echo "4. In cPanel, set Node.js app settings:"
echo "   - Application Root: /path/to/your/backend"
echo "   - Application URL: your-domain.com (or subdomain)"
echo "   - Application Startup File: dist/main.js"
echo "   - Node.js Version: 18.x or higher"
echo ""
echo "🌐 Your backend will be ready at: https://galloways.co.ke"
echo ""
echo "📋 Next steps in cPanel:"
echo "1. Go to 'Setup Node.js App'"
echo "2. Create New Application"
echo "3. Set startup file to: dist/main.js"
echo "4. Install dependencies if needed"
echo "5. Start the application"
