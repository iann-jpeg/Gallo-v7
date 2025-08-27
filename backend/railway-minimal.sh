#!/bin/bash
set -e

echo "🚀 Railway Ultra Minimal Nuclear Deployment Starting..."

# Install dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production --silent

# Generate Prisma client
echo "🎯 Generating Prisma client..."
DATABASE_URL="$DATABASE_URL" npx prisma generate --silent

# Create minimal app build
echo "🏗️ Building minimal application..."
mkdir -p dist

# Create minimal health-only application
cat > dist/main-health-only.js << 'EOF'
const { NestFactory } = require('@nestjs/core');
const { Controller, Get, Module, Injectable } = require('@nestjs/common');

// Minimal Health Controller
@Controller('health')
class HealthController {
  @Get()
  async getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      message: 'Railway minimal deployment operational',
      version: '1.0.0-minimal',
      platform: 'railway',
      database: process.env.DATABASE_URL ? 'configured' : 'not_configured'
    };
  }

  @Get('status')
  async getStatus() {
    return {
      application: 'running',
      deployment: 'minimal-nuclear',
      health_endpoint: '/health',
      timestamp: new Date().toISOString()
    };
  }
}

// Minimal App Module
@Module({
  controllers: [HealthController],
})
class MinimalAppModule {}

// Bootstrap
async function bootstrap() {
  try {
    console.log('🚀 Starting Railway minimal health service...');
    
    const app = await NestFactory.create(MinimalAppModule, {
      logger: ['error', 'warn', 'log'],
    });

    app.enableCors({
      origin: ['https://galloways.co.ke', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true,
    });

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    
    console.log(`✅ Minimal health service running on port ${port}`);
    console.log(`🌐 Health endpoint: http://0.0.0.0:${port}/health`);
    
  } catch (error) {
    console.error('💥 Minimal bootstrap failed:', error);
    process.exit(1);
  }
}

bootstrap();
EOF

echo "✅ Minimal health service built successfully"

# Start the minimal application
echo "🎯 Starting Railway minimal health service..."
node dist/main-health-only.js
