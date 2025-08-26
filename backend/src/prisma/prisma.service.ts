import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
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
      await this.$connect();
      this.logger.log('✅ Aplin PostgreSQL connected successfully');
      
      // Test connection with a simple query
      await this.$queryRaw`SELECT 1 as connection_test`;
      this.logger.log('✅ Database health check passed');
    } catch (error: any) {
      this.logger.error(`❌ Database connection failed: ${error.message}`);
      this.logger.warn('⚠️  Server will continue without database connection');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('📤 Database connection closed');
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1 as health`;
      return true;
    } catch (error: any) {
      this.logger.error(`Database health check failed: ${error.message}`);
      return false;
    }
  }

  async getDatabaseInfo() {
    try {
      const result = await this.$queryRaw`
        SELECT 
          version() as version,
          current_database() as database,
          current_user as user,
          inet_server_addr() as host
      `;
      return result;
    } catch (error: any) {
      this.logger.error(`Failed to get database info: ${error.message}`);
      return null;
    }
  }
}
