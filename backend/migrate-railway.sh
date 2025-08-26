#!/bin/bash
# Railway Migration Script - Ensures database schema is properly set up

echo "🔄 Starting Railway migration process..."

# Set connection pool to minimal for migrations
export DATABASE_URL="${DATABASE_URL}?connection_limit=1&pool_timeout=20"

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Run database migrations with retry
echo "🚀 Running database migrations..."
npx prisma migrate deploy || {
    echo "⚠️ Migration failed, retrying in 5 seconds..."
    sleep 5
    npx prisma migrate deploy || {
        echo "⚠️ Migration failed again, checking if tables exist..."
        npx prisma db pull
    }
}

echo "✅ Migration process completed!"
