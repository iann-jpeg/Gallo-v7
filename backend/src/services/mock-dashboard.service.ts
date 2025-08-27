import { Injectable } from '@nestjs/common';

@Injectable()
export class MockDashboardService {
  async getDashboardStats(filters: any = {}) {
    return {
      totalUsers: 0,
      totalClaims: 0,
      totalQuotes: 0,
      totalConsultations: 0,
      totalPayments: 0, // Mock value since Payment table doesn't exist
      monthlyRevenue: 0,
      recentActivity: [],
      mockData: true,
      warning: 'Using mock data - Payment table not found'
    };
  }

  async getAnalytics() {
    return {
      userGrowth: [],
      revenueGrowth: [],
      claimStats: [],
      mockData: true
    };
  }

  async getRecentActivity() {
    return {
      activities: [],
      mockData: true
    };
  }
}
