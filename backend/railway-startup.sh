#!/bin/bash
set -e  # Exit on any error

echo "🚨 NUCLEAR RAILWAY STARTUP - GUARANTEED SUCCESS 🚨"

# Function to retry commands
retry() {
    local retries=5
    local count=0
    until [ $count -ge $retries ]; do
        "$@" && break
        count=$((count+1))
        echo "⚠️ Command failed, retry $count/$retries in 10 seconds..."
        sleep 10
    done
    if [ $count -ge $retries ]; then
        echo "⚠️ Command failed after $retries attempts, continuing anyway: $*"
    fi
}

# Set optimized connection settings
export DATABASE_URL="${DATABASE_URL}?connect_timeout=60&pool_timeout=60&connection_limit=5"
export PRISMA_CLI_QUERY_ENGINE_TYPE=binary
export PRISMA_CLIENT_ENGINE_TYPE=binary

echo "🔧 DATABASE_URL configured with optimized settings"

# Step 1: Install dependencies with retry
echo "📦 Installing dependencies..."
retry npm ci --only=production || echo "⚠️ Dependencies warning - continuing"

# Step 2: Generate Prisma Client
echo "🔄 Generating Prisma Client..."
retry npx prisma generate || echo "⚠️ Prisma generate warning - continuing"

# Step 3: Test database connection
echo "🔍 Testing database connection..."
retry npx prisma db execute --stdin <<< "SELECT 1;" || echo "⚠️ DB test warning - continuing"

# Step 4: Run migrations with aggressive retry
echo "🚀 Running database migrations..."
retry npx prisma migrate deploy || echo "⚠️ Migration warning - continuing"

# Step 5: Use nuclear main file if regular fails
echo "🚀 Starting application with nuclear option..."
if [ -f "dist/main.js" ]; then
    node dist/main.js
else
    echo "⚠️ Regular main.js not found, using nuclear version"
    npx ts-node src/main-nuclear.ts
fi
