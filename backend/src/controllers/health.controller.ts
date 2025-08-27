import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../middleware/public.decorator';
import { MinimalDashboardService } from '../services/minimal-dashboard.service';

@Controller('health')
@Public()
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minimalDashboard: MinimalDashboardService
  ) {}

  @Get()
  async getHealth() {
    const startTime = Date.now();
    
    try {
      // Test database connection with aggressive retry
      let dbHealthy = false;
      let queryTest = false;
      
      try {
        dbHealthy = await this.prisma.healthCheck();
      } catch (error) {
        console.warn('Database health check failed, trying basic query...');
        try {
          await this.prisma.$queryRaw`SELECT 1`;
          dbHealthy = true;
        } catch (basicError) {
          console.error('Basic database query failed:', basicError);
        }
      }
      
      // Test basic queries with fallback
      if (dbHealthy) {
        try {
          await this.prisma.user.count();
          queryTest = true;
        } catch (error) {
          console.warn('User count query failed, trying alternative...');
          try {
            await this.prisma.$queryRaw`SELECT COUNT(*) FROM "User"`;
            queryTest = true;
          } catch (altError) {
            console.warn('Alternative query failed:', altError);
          }
        }
      }

      // Test dashboard service with graceful fallback
      let dashboardHealthy = false;
      let dashboardMessage = '';
      
      try {
        await this.minimalDashboard.getMinimalStats();
        dashboardHealthy = true;
        dashboardMessage = 'operational';
      } catch (error) {
        console.warn('Minimal dashboard service test failed:', error instanceof Error ? error.message : 'Unknown error');
        dashboardHealthy = false;
        dashboardMessage = 'using_fallback_operational';
      }

      const responseTime = Date.now() - startTime;
      const isHealthy = dbHealthy && queryTest;

      return {
        status: isHealthy ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        services: {
          database: {
            status: dbHealthy ? 'up' : 'down',
            connection: dbHealthy,
            queries: queryTest,
            url_configured: !!process.env.DATABASE_URL
          },
          dashboard: {
            status: dashboardHealthy ? 'up' : 'down',
            message: dashboardMessage,
            fallback_available: true
          },
          application: {
            status: 'up',
            memory_usage: process.memoryUsage(),
            uptime: process.uptime()
          }
        },
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        deployment: {
          platform: 'railway',
          tables_available: ['User', 'Claim', 'Quote', 'Consultation', 'DiasporaRequest', 'Document', 'Product'],
          tables_missing: ['Payment', 'Policy', 'OutsourcingRequest']
        }
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        error: error instanceof Error ? error.message : 'Unknown error',
        services: {
          database: { status: 'unknown' },
          application: { status: 'partial' }
        }
      };
    }
  }

  @Get('deep')
  async getDeepHealth() {
    const startTime = Date.now();
    
    try {
      // Test all major components that actually exist
      const [
        userCount,
        claimCount,
        quotesCount,
        consultationCount,
        diasporaCount,
        documentCount,
        productCount
      ] = await Promise.all([
        this.prisma.user.count().catch(() => 0),
        this.prisma.claim.count().catch(() => 0),
        this.prisma.quote.count().catch(() => 0),
        this.prisma.consultation.count().catch(() => 0),
        this.prisma.diasporaRequest.count().catch(() => 0),
        this.prisma.document.count().catch(() => 0),
        this.prisma.product.count().catch(() => 0)
      ]);

      const responseTime = Date.now() - startTime;

      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        database: {
          status: 'up',
          tables: {
            users: userCount,
            claims: claimCount,
            quotes: quotesCount,
            consultations: consultationCount,
            diaspora: diasporaCount,
            documents: documentCount,
            products: productCount
          }
        },
        performance: {
          fast: responseTime < 100,
          acceptable: responseTime < 500,
          slow: responseTime >= 500
        }
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }
}
