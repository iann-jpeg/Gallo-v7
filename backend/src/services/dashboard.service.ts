import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardStatsDto, AdminStatsQueryDto } from '../config/dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(query?: AdminStatsQueryDto) {
    try {
      // Get date range for filtering
      let startDate: Date | undefined;
      let endDate: Date | undefined;
      
      if (query?.startDate) {
        startDate = new Date(query.startDate);
      }
      if (query?.endDate) {
        endDate = new Date(query.endDate);
        endDate.setHours(23, 59, 59, 999);
      }

      const dateFilter = startDate && endDate 
        ? { createdAt: { gte: startDate, lte: endDate } }
        : {};

      // Get all data in parallel
      const [
        totalClaims,
        totalQuotes, 
        totalConsultations,
        totalOutsourcingRequests,
        totalPayments,
        totalDiasporaRequests,
        totalUsers,
        pendingClaims,
        activePolicies,
        recentClaims,
        recentOutsourcing,
        recentConsultations,
        recentPayments,
        recentDiaspora
      ] = await Promise.all([
        this.prisma.claim.count({ where: dateFilter }),
        this.prisma.quote.count({ where: dateFilter }),
        this.prisma.consultation.count({ where: dateFilter }),
        this.prisma.outsourcingRequest.count({ where: dateFilter }),
        this.prisma.payment.count({ where: dateFilter }),
        this.prisma.diasporaRequest.count({ where: dateFilter }),
        this.prisma.user.count(),
        this.prisma.claim.count({ 
          where: { status: { in: ['filed', 'under_review', 'pending'] }, ...dateFilter }
        }),
        this.prisma.policy.count({ 
          where: { status: 'active', ...dateFilter }
        }),
        
        // Recent submissions with full details
        this.prisma.claim.findMany({
          take: 20,
          orderBy: { createdAt: 'desc' },
          where: dateFilter,
          include: {
            documents: true
          }
        }),
        
        this.prisma.outsourcingRequest.findMany({
          take: 20,
          orderBy: { createdAt: 'desc' },
          where: dateFilter
        }),
        
        this.prisma.consultation.findMany({
          take: 20,
          orderBy: { createdAt: 'desc' },
          where: dateFilter
        }),
        
        this.prisma.payment.findMany({
          take: 20,
          orderBy: { createdAt: 'desc' },
          where: dateFilter
        }),
        
        this.prisma.diasporaRequest.findMany({
          take: 20,
          orderBy: { createdAt: 'desc' },
          where: dateFilter
        })
      ]);

      // Calculate monthly revenue
      const monthlyRevenue = recentPayments.reduce((sum: number, payment: any) => sum + (payment.amount || 0), 0);
      const totalRequests = totalClaims + totalQuotes + totalConsultations + totalOutsourcingRequests;
      const conversionRate = totalRequests > 0 ? Math.round((activePolicies / totalRequests) * 100) : 0;

      return {
        // Core statistics
        totalClaims: totalClaims || 0,
        totalQuotes: totalQuotes || 0, 
        totalConsultations: totalConsultations || 0,
        totalOutsourcingRequests: totalOutsourcingRequests || 0,
        totalPayments: totalPayments || 0,
        totalDiasporaRequests: totalDiasporaRequests || 0,
        totalUsers: totalUsers || 0,
        
        // Status counts
        pendingClaims: pendingClaims || 0,
        activePolicies: activePolicies || 0,
        monthlyRevenue: Math.round(monthlyRevenue) || 0,
        conversionRate: conversionRate || 0,
        
        // All submissions with full details for admin dashboard
        allSubmissions: {
          claims: recentClaims || [],
          outsourcing: recentOutsourcing || [],
          consultations: recentConsultations || [],
          payments: recentPayments || [],
          diaspora: recentDiaspora || []
        },
        
        // Summary
        totalSubmissions: totalRequests,
        submissionsThisMonth: totalRequests // Can be refined with date filtering
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw new BadRequestException('Failed to fetch dashboard statistics: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  // Get activities for the admin dashboard
  async getActivities(limit: number = 50) {
    try {
      // Get recent activities from all tables
      const [claims, outsourcing, consultations, payments, diaspora] = await Promise.all([
        this.prisma.claim.findMany({
          take: limit / 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            policyNumber: true,
            claimType: true,
            status: true,
            submitterName: true,
            submitterEmail: true,
            estimatedLoss: true,
            createdAt: true
          }
        }),
        
        this.prisma.outsourcingRequest.findMany({
          take: limit / 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            organizationName: true,
            email: true,
            services: true,
            budgetRange: true,
            status: true,
            createdAt: true
          }
        }),
        
        this.prisma.consultation.findMany({
          take: limit / 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            serviceType: true,
            status: true,
            consultationDate: true,
            createdAt: true
          }
        }),
        
        this.prisma.payment.findMany({
          take: limit / 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            clientName: true,
            amount: true,
            paymentMethod: true,
            status: true,
            createdAt: true
          }
        }),
        
        this.prisma.diasporaRequest.findMany({
          take: limit / 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            country: true,
            status: true,
            createdAt: true
          }
        })
      ]);

      // Combine all activities with type labels
      const activities = [
        ...claims.map(item => ({ ...item, type: 'claim' })),
        ...outsourcing.map(item => ({ ...item, type: 'outsourcing' })),
        ...consultations.map(item => ({ ...item, type: 'consultation' })),
        ...payments.map(item => ({ ...item, type: 'payment' })),
        ...diaspora.map(item => ({ ...item, type: 'diaspora' }))
      ];

      // Sort by creation date
      activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return activities.slice(0, limit);
    } catch (error) {
      console.error('Activities error:', error);
      throw new BadRequestException('Failed to fetch activities: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  // Get top statistics for quick overview
  async getTopStats() {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      const [
        thisMonthClaims,
        thisMonthOutsourcing,
        thisMonthConsultations,
        thisMonthPayments,
        totalRevenue
      ] = await Promise.all([
        this.prisma.claim.count({ where: { createdAt: { gte: startOfMonth } } }),
        this.prisma.outsourcingRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
        this.prisma.consultation.count({ where: { createdAt: { gte: startOfMonth } } }),
        this.prisma.payment.count({ where: { createdAt: { gte: startOfMonth } } }),
        this.prisma.payment.aggregate({
          _sum: { amount: true },
          where: { createdAt: { gte: startOfMonth } }
        })
      ]);

      return {
        thisMonthClaims: thisMonthClaims || 0,
        thisMonthOutsourcing: thisMonthOutsourcing || 0,
        thisMonthConsultations: thisMonthConsultations || 0,
        thisMonthPayments: thisMonthPayments || 0,
        totalRevenue: totalRevenue._sum.amount || 0
      };
    } catch (error) {
      console.error('Top stats error:', error);
      throw new BadRequestException('Failed to fetch top statistics: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
}
