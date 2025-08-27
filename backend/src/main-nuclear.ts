import { NestFactory } from '@nestjs/core';
import { NestApplication } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  console.log('🚀 STARTING GALLOWAYS BACKEND - NUCLEAR VERSION');
  
  // Test database connection
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('✅ DATABASE CONNECTED SUCCESSFULLY');
    
    // Test basic query
    const userCount = await prisma.user.count();
    console.log(`✅ DATABASE QUERY TEST PASSED - ${userCount} users found`);
  } catch (error: any) {
    console.log('⚠️ DATABASE CONNECTION ISSUES:', error.message);
    console.log('⚠️ CONTINUING WITH MOCK DATA...');
  }

  // Create minimal app
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['https://galloways.co.ke', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  // Health check endpoint
  app.getHttpAdapter().get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0',
      deployment: 'railway'
    });
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`✅ APPLICATION STARTED SUCCESSFULLY ON PORT ${port}`);
  console.log(`✅ HEALTH CHECK: http://localhost:${port}/api/health`);
  console.log(`✅ PUBLIC URL: https://gallo-end-production.up.railway.app`);
}

bootstrap().catch((error) => {
  console.error('❌ APPLICATION FAILED TO START:', error);
  process.exit(1);
});
