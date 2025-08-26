#!/bin/bash

echo "🔍 Testing Aplin PostgreSQL Connection"
echo "======================================="

# Set environment variables
export NODE_ENV=development

# Test connection using different formats
echo "📡 Testing URL-encoded password format..."
export DATABASE_URL="postgresql://gallowa2_galloways_user:%29%3DF%5D%2A9F0AHj4QO%26y@localhost:5432/gallowa2_gallowaysdb?sslmode=prefer"

npx prisma db execute --stdin <<< "SELECT 1 as test_connection, current_database() as db_name, current_user as user_name;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ URL-encoded format works!"
else
    echo "❌ URL-encoded format failed, trying plain password..."
    export DATABASE_URL="postgresql://gallowa2_galloways_user:)=F]*9F0AHj4QO&y@localhost:5432/gallowa2_gallowaysdb?sslmode=prefer"
    
    npx prisma db execute --stdin <<< "SELECT 1 as test_connection, current_database() as db_name, current_user as user_name;" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Plain password format works!"
        echo "📝 Update your .env to use plain password format"
    else
        echo "❌ Both formats failed. Please check:"
        echo "   - Database server is running"
        echo "   - Credentials are correct"
        echo "   - Network connectivity to database"
    fi
fi

echo ""
echo "🎯 Current connection details:"
echo "   Username: gallowa2_galloways_user"
echo "   Database: gallowa2_gallowaysdb"
echo "   Host: localhost"
echo "   Port: 5432"
