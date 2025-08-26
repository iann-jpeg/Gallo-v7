#!/bin/bash

echo "🔧 Admin Panel Configuration Tool"
echo "=================================="
echo ""
echo "Choose your admin panel version:"
echo ""
echo "1. 🌐 Full Backend Admin (requires Node.js backend)"
echo "2. 📱 Static Admin (works without backend)"
echo "3. 🔍 Diagnostic Admin (for troubleshooting)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "✅ Configuring Full Backend Admin..."
        # Keep original admin
        echo "📋 Using original Admin.tsx with full backend connectivity"
        echo ""
        echo "Requirements for Aplin:"
        echo "• Node.js support enabled"
        echo "• Backend deployed to subdomain"
        echo "• Database connection configured"
        echo ""
        echo "Admin URL: https://galloways.co.ke/#/admin"
        ;;
    2)
        echo "✅ Configuring Static Admin (Offline-capable)..."
        # Replace with static version
        cp /home/crash/Desktop/npm/frontend/src/pages/AdminStatic.tsx /home/crash/Desktop/npm/frontend/src/pages/Admin.tsx
        echo "🔧 Building with static admin..."
        cd /home/crash/Desktop/npm/frontend
        npm run build
        echo ""
        echo "✅ Static Admin Features:"
        echo "• Works without backend"
        echo "• Shows demo data and local storage"
        echo "• Automatically detects backend availability"
        echo "• Switches to live data when backend connects"
        echo ""
        echo "Admin URL: https://galloways.co.ke/#/admin"
        echo ""
        echo "Upload dist/ contents to /public_html/ on Aplin"
        ;;
    3)
        echo "✅ Configuring Diagnostic Admin..."
        # Use diagnostic version
        if [ -f "/home/crash/Desktop/npm/frontend/src/pages/AdminDiagnostic.tsx" ]; then
            cp /home/crash/Desktop/npm/frontend/src/pages/AdminDiagnostic.tsx /home/crash/Desktop/npm/frontend/src/pages/Admin.tsx
            echo "🔧 Building with diagnostic admin..."
            cd /home/crash/Desktop/npm/frontend
            npm run build
            echo ""
            echo "🔍 Diagnostic Admin Features:"
            echo "• Tests API connectivity"
            echo "• Shows connection status"
            echo "• Displays debug information"
            echo "• Helpful for troubleshooting"
            echo ""
            echo "Admin URL: https://galloways.co.ke/#/admin"
        else
            echo "❌ Diagnostic admin not available"
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        ;;
esac

echo ""
echo "🚀 Next Steps:"
echo "1. Upload frontend/dist/ contents to Aplin /public_html/"
echo "2. Test admin panel: https://galloways.co.ke/#/admin"
echo "3. If using backend version, ensure Node.js is configured on Aplin"
