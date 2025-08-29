#!/bin/bash
# Complete Supabase & Alpine Hosting Setup Script
# Run this script after setting up your Supabase project

echo "🚀 Setting up Supabase for Alpine Hosting Integration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if required environment variables exist
echo -e "${BLUE}📋 Checking environment configuration...${NC}"

if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found. Copying from .env.example...${NC}"
    cp .env.example .env
fi

# Verify Supabase credentials
if [ -z "$VITE_SUPABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  VITE_SUPABASE_URL not found in environment${NC}"
    echo "Please add your Supabase URL to .env file"
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo -e "${YELLOW}⚠️  VITE_SUPABASE_ANON_KEY not found in environment${NC}"
    echo "Please add your Supabase anonymous key to .env file"
fi

echo -e "${GREEN}✅ Environment check complete${NC}"

# Database setup instructions
echo ""
echo -e "${BLUE}📊 Database Setup Instructions:${NC}"
echo "1. Go to your Supabase project: https://supabase.com/dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Run the SQL script: supabase-setup.sql"
echo "4. Enable Realtime for all tables in Database → Replication"

# Build verification
echo ""
echo -e "${BLUE}🔨 Building project for production...${NC}"
npm run build:prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed. Please check for errors.${NC}"
    exit 1
fi

# File structure verification
echo ""
echo -e "${BLUE}📁 Verifying file structure...${NC}"

REQUIRED_FILES=(
    "src/integrations/supabase/client.ts"
    "src/integrations/supabase/types.ts" 
    "src/lib/api.ts"
    "src/components/admin/AdminDashboard.tsx"
    ".env.production"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (missing)${NC}"
    fi
done

# Alpine hosting deployment checklist
echo ""
echo -e "${BLUE}🌐 Alpine Hosting Deployment Checklist:${NC}"
echo ""
echo -e "${YELLOW}1. Domain & SSL Configuration:${NC}"
echo "   • Ensure galloways.co.ke points to your Alpine hosting"
echo "   • SSL certificate is installed and active"
echo "   • HTTPS redirects are configured"
echo ""
echo -e "${YELLOW}2. File Upload:${NC}"
echo "   • Upload contents of 'dist/' folder to public_html/"
echo "   • Ensure index.html is in the root directory"
echo "   • Set correct file permissions (644 for files, 755 for folders)"
echo ""
echo -e "${YELLOW}3. Environment Variables:${NC}"
echo "   • Supabase URL: https://wctkikgmncnunntsiqdu.supabase.co"
echo "   • Frontend will connect directly to Supabase"
echo "   • No backend server required on Alpine"
echo ""
echo -e "${YELLOW}4. Supabase Configuration:${NC}"
echo "   • Add galloways.co.ke to allowed origins in Supabase"
echo "   • Enable RLS policies for security"
echo "   • Configure storage bucket permissions"
echo ""
echo -e "${YELLOW}5. Testing Checklist:${NC}"
echo "   • Forms submit successfully"
echo "   • Real-time updates work"
echo "   • File uploads function"
echo "   • Admin dashboard loads"
echo "   • Mobile responsiveness"

echo ""
echo -e "${GREEN}🎉 Setup complete! Your frontend is ready for Alpine hosting.${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Run the SQL script in your Supabase dashboard"
echo "2. Upload 'dist/' contents to Alpine hosting"
echo "3. Test all functionality on https://galloways.co.ke"
echo "4. Monitor real-time features and form submissions"

echo ""
echo -e "${BLUE}🔧 Troubleshooting:${NC}"
echo "• Check browser console for API errors"
echo "• Verify Supabase connection in Network tab"
echo "• Ensure CORS is configured in Supabase"
echo "• Test forms and real-time features"
