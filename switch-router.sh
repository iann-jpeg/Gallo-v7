#!/bin/bash
# 🔄 React Router Mode Switcher

echo "🚀 React Router Configuration Helper"
echo "Choose your routing mode:"
echo ""
echo "1. BrowserRouter (.htaccess required)"
echo "2. HashRouter (no server config needed)"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "✅ Configuring BrowserRouter..."
        cp /home/crash/Desktop/npm/frontend/src/App.tsx /home/crash/Desktop/npm/frontend/src/App.BrowserRouter.tsx
        echo "📁 .htaccess file created in dist/"
        echo "📋 Upload .htaccess to your web root (/public_html/)"
        echo ""
        echo "URLs will look like:"
        echo "• galloways.co.ke/admin"
        echo "• galloways.co.ke/claims"
        echo "• galloways.co.ke/quotes"
        ;;
    2)
        echo "✅ Configuring HashRouter..."
        cp /home/crash/Desktop/npm/frontend/src/App.HashRouter.tsx /home/crash/Desktop/npm/frontend/src/App.tsx
        echo "📁 Backup created: App.BrowserRouter.tsx"
        echo "🔧 Building with HashRouter..."
        cd /home/crash/Desktop/npm/frontend
        npm run build
        echo ""
        echo "URLs will look like:"
        echo "• galloways.co.ke/#/admin"
        echo "• galloways.co.ke/#/claims"
        echo "• galloways.co.ke/#/quotes"
        echo ""
        echo "✅ No server configuration needed!"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        ;;
esac
