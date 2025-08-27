import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MinimalDashboardService {
  constructor(private prisma: PrismaService) {}

  async getMinimalStats() {
    try {
      const [
        totalUsers,
        totalClaims,
        totalQuotes,
        totalConsultations,
        totalDiaspora,
        totalDocuments,
        totalProducts
      ] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.claim.count(),
        this.prisma.quote.count(),
        this.prisma.consultation.count(),
        this.prisma.diasporaRequest.count(),
        this.prisma.document.count(),
        this.prisma.product.count()
      ]);

      return {
        status: 'operational',
        totalUsers,
        totalClaims,
        totalQuotes,
        totalConsultations,
        totalDiaspora,
        totalDocuments,
        totalProducts,
        message: 'Dashboard operational with existing database tables',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Dashboard service error:', error);
      return {
        status: 'degraded',
        message: 'Dashboard service experiencing issues',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }
}
