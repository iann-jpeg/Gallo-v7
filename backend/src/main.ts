
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cors from 'cors';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Initialize Prisma service for database connection
  const prismaService = app.get(PrismaService);
  
  // Setup graceful shutdown
  process.on('SIGTERM', async () => {
    logger.log('SIGTERM received, shutting down gracefully...');
    await prismaService.$disconnect();
    process.exit(0);
  });
  
  // Enable validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  
  // Configure security headers with proper CSP for form submissions
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https:"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://galloways.co.ke", ...(process.env.NODE_ENV === 'development' ? ["http://localhost:*", "http://127.0.0.1:*"] : [])],
          formAction: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

    // Configure CORS for Railway + cPanel hybrid architecture
  const allowedOrigins = [
    'https://galloways.co.ke',           // Production cPanel frontend
    'https://www.galloways.co.ke',       // www version
    'https://app.galloways.co.ke',       // if using subdomain
    'http://localhost:5173',             // Development Vite server
    'http://localhost:3000',             // Development React server
  ];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from: ${origin}`);
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));    // Set CORP and CSP headers for all responses
    app.use((req: any, res: any, next: () => void) => {
      res.header('Cross-Origin-Resource-Policy', 'cross-origin');
      const cspConnectSrc = process.env.NODE_ENV === 'development' 
        ? "connect-src 'self' https://galloways.co.ke http://localhost:* http://127.0.0.1:*" 
        : "connect-src 'self' https://galloways.co.ke";
      
      res.header('Content-Security-Policy', `default-src 'self'; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; ${cspConnectSrc}; form-action 'self'; script-src 'self'; base-uri 'self'; font-src 'self' https: data:; frame-ancestors 'self'; object-src 'none'; script-src-attr 'none'; upgrade-insecure-requests`);
      next();
    });

  // Set API prefix
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Exact API')
    .setDescription('API documentation for Exact backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Railway provides PORT environment variable
  const port = process.env.PORT || 3001;
  logger.log(`🚀 Server starting on port ${port}`);
  
  try {
    // Listen on 0.0.0.0 for Railway deployment
    const server = await app.listen(port, '0.0.0.0');
    
    // Setup Socket.io for real-time admin dashboard
    const { setupAdminPanelSocket } = require('./internal-admin-panel.controller');
    setupAdminPanelSocket(server);
    
    // Railway will provide the actual URL
    const baseUrl = process.env.RAILWAY_STATIC_URL 
      ? `https://${process.env.RAILWAY_STATIC_URL}` 
      : process.env.NODE_ENV === 'production' 
        ? 'https://gallo-end-production.up.railway.app'
        : `http://localhost:${port}`;
        
    logger.log(`✅ Backend running at ${baseUrl}`);
    logger.log(`📚 API Documentation: ${baseUrl}/docs`);
    logger.log(`🌐 Frontend at: https://galloways.co.ke`);
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}
bootstrap();
