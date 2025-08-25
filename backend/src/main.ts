
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Initialize Prisma service for database connection
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  
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
          connectSrc: ["'self'", "http://localhost:*", "http://127.0.0.1:*"],
          formAction: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // Configure CORS for frontend
  const allowedOrigins = [
    'https://galloways.co.ke',
    'https://www.galloways.co.ke',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  // Add environment-specific origins
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  // Add Railway-specific origins
  allowedOrigins.push('https://*.railway.app');

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    exposedHeaders: 'Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });    // Set CORP and CSP headers for all responses
    app.use((req: any, res: any, next: () => void) => {
      res.header('Cross-Origin-Resource-Policy', 'cross-origin');
      res.header('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https://galloways.co.ke http://localhost:* http://127.0.0.1:*; form-action 'self'; script-src 'self'; base-uri 'self'; font-src 'self' https: data:; frame-ancestors 'self'; object-src 'none'; script-src-attr 'none'; upgrade-insecure-requests");
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

  const port = process.env.PORT || 3001;
  console.log(`🚀 Server starting on port ${port}`);
  
  try {
    const server = await app.listen(port);
    // Setup Socket.io for real-time admin dashboard
    const { setupAdminPanelSocket } = require('./internal-admin-panel.controller');
    setupAdminPanelSocket(server);
    console.log(`✅ Server is running on http://localhost:${port}`);
    console.log(`📚 API Documentation available at http://localhost:${port}/docs`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}
bootstrap();
