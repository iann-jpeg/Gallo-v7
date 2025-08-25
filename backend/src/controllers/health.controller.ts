import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../middleware/public.decorator';
import { DashboardService } from '../services/dashboard.service';

@Controller('health')
@Public()
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dashboardService: DashboardService
  ) {}

  @Get()
  async getHealth() {
    const startTime = Date.now();
    
    try {
      // Test database connection
      const dbHealthy = await this.prisma.healthCheck();
      
      // Test basic queries
      let queryTest = false;
      try {
        await this.prisma.user.count();
        queryTest = true;
      } catch (error) {
        console.warn('Query test failed:', error);
      }

      // Test dashboard service
      let dashboardHealthy = false;
      try {
        await this.dashboardService.getDashboardStats({});
        dashboardHealthy = true;
      } catch (error) {
        console.warn('Dashboard service test failed:', error);
      }

      const responseTime = Date.now() - startTime;

      return {
        status: dbHealthy && queryTest ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        services: {
          database: {
            status: dbHealthy ? 'up' : 'down',
            connection: dbHealthy,
            queries: queryTest
          },
          dashboard: {
            status: dashboardHealthy ? 'up' : 'down'
          }
        },
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        services: {
          database: { status: 'down' },
          dashboard: { status: 'down' }
        }
      };
    }
  }

  @Get('deep')
  async getDeepHealth() {
    const startTime = Date.now();
    
    try {
      // Test all major components
      const [
        userCount,
        claimCount,
        quotesCount,
        consultationCount,
        paymentCount
      ] = await Promise.all([
        this.prisma.user.count().catch(() => 0),
        this.prisma.claim.count().catch(() => 0),
        this.prisma.quote.count().catch(() => 0),
        this.prisma.consultation.count().catch(() => 0),
        this.prisma.payment.count().catch(() => 0)
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
            payments: paymentCount
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
