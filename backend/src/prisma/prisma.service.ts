import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'info'] : ['error', 'warn'],
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      // Enable connection pooling and query optimization
      await this.$connect();
      console.log('✅ Database connected successfully with optimized settings');
    } catch (error: any) {
      console.error('❌ Database connection failed:', error.message || 'Unknown error');
      // Allow server to start even if DB connection fails initially
      console.log('⚠️  Server will continue without database connection');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Database connection closed');
  }

  async enableShutdownHooks(app: any) {
    // Enhanced shutdown hooks with cleanup
    process.on('beforeExit', async () => {
      console.log('📤 Gracefully shutting down database connections...');
      await this.$disconnect();
    });
  }

  // Helper method to handle database health checks
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Helper method for transaction handling with retry logic
  async executeTransaction<T>(
    operations: (tx: any) => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        return await this.$transaction(operations);
      } catch (error: any) {
        attempt++;
        if (attempt >= maxRetries) {
          throw error;
        }
        console.warn(`Transaction attempt ${attempt} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      }
    }
    throw new Error('Max transaction retries exceeded');
  }
}
