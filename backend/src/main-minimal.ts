import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  try {
    console.log('🚀 Starting minimal nuclear application...');
    
    const app: INestApplication = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
    });

    // Minimal CORS for cPanel integration
    const corsOptions: CorsOptions = {
      origin: ['https://galloways.co.ke', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    };

    app.enableCors(corsOptions);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    // Test database connection
    const prismaService = app.get(PrismaService);
    await prismaService.$connect();
    console.log('✅ Database connected successfully');

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    
    console.log(`🎯 Minimal nuclear application running on port ${port}`);
    console.log(`🌐 Health endpoint: http://0.0.0.0:${port}/health`);
    
  } catch (error) {
    console.error('💥 Nuclear startup failed:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('💥 Bootstrap failed:', error);
  process.exit(1);
});
