import { Injectable } from '@nestjs/common';
import { prisma } from '../../db/prisma';
import { DashboardStats } from '../../types/api.types';

@Injectable()
export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    // Aggregate stats from DB
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
      monthlyRevenue,
      conversionRate,
      claims,
      outsourcing,
      consultations,
      payments,
      diaspora,
    ] = await Promise.all([
      prisma.claim.count(),
      prisma.quote.count(),
      prisma.consultation.count(),
      prisma.outsourcingRequest.count(),
      prisma.payment.count(),
      prisma.diasporaRequest.count(),
      prisma.user.count(),
      prisma.claim.count({ where: { status: 'pending' } }),
      prisma.policy.count({ where: { status: 'active' } }),
      prisma.payment.aggregate({ _sum: { amount: true } }).then((r: any) => r._sum.amount || 0),
      Promise.resolve(12), // TODO: Calculate conversion rate
      prisma.claim.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.outsourcingRequest.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.consultation.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.payment.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.diasporaRequest.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
    ]);
    return {
      totalClaims,
      totalQuotes,
      totalConsultations,
      totalOutsourcingRequests,
      totalPayments,
      totalDiasporaRequests,
      totalUsers,
      pendingClaims,
      activePolicies,
      monthlyRevenue,
      conversionRate,
      totalSubmissions: totalClaims + totalQuotes + totalConsultations + totalOutsourcingRequests + totalPayments + totalDiasporaRequests,
      allSubmissions: {
        claims,
        outsourcing,
        consultations,
        payments,
        diaspora,
      },
    };
  }

  async getActivities(): Promise<any[]> {
    // Example: recent claims, payments, etc.
    const activities = await prisma.claim.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });
    return activities;
  }
}
