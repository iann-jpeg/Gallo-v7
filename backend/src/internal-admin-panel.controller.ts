import { Server } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { MockDataService } from './services/mock-data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminPanelSocketService {
  private io: Server;
  private prisma: PrismaService;
  private mockDataService: MockDataService;

  constructor() {
    this.prisma = new PrismaService();
    this.mockDataService = new MockDataService();
  }

  setupAdminPanelSocket(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === 'development' 
          ? ["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"]
          : ["https://galloways.co.ke", "https://www.galloways.co.ke", "https://app.galloways.co.ke"],
        credentials: true
      }
    });

    this.io.on('connection', (socket) => {
      console.log('Admin client connected:', socket.id);

      // Send initial dashboard data
      this.sendDashboardData(socket);

      // Handle requests for data
      socket.on('request-dashboard-data', () => {
        this.sendDashboardData(socket);
      });

      socket.on('request-claims-data', async () => {
        await this.sendClaimsData(socket);
      });

      socket.on('request-consultations-data', async () => {
        await this.sendConsultationsData(socket);
      });

      socket.on('request-users-data', async () => {
        await this.sendUsersData(socket);
      });

      socket.on('request-payments-data', async () => {
        await this.sendPaymentsData(socket);
      });

      socket.on('disconnect', () => {
        console.log('Admin client disconnected:', socket.id);
      });
    });

    // Setup periodic data broadcasts
    this.setupPeriodicUpdates();
  }

  private setupPeriodicUpdates() {
    // Send updated data every 30 seconds
    setInterval(async () => {
      try {
        await this.broadcastDashboardUpdate();
        await this.broadcastRecentActivity();
      } catch (error) {
        console.error('Error broadcasting updates:', error);
      }
    }, 30000);
  }

  private async sendDashboardData(socket: any) {
    try {
      const [userCount, claimCount, paymentCount, totalRevenue] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.claim.count(),
        this.prisma.payment.count({ where: { status: 'COMPLETED' } }),
        this.prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: 'COMPLETED' }
        })
      ]);

      const recentActivity = await this.prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          role: true
        }
      });

      socket.emit('dashboard-data', {
        stats: {
          totalUsers: userCount,
          totalClaims: claimCount,
          totalPayments: paymentCount,
          totalRevenue: totalRevenue._sum.amount || 0,
          growthRate: 12.5
        },
        recentActivity
      });
    } catch (error) {
      console.error('Database error in sendDashboardData, using mock data:', error);
      socket.emit('dashboard-data', this.mockDataService.getMockDashboardData());
    }
  }

  private async sendClaimsData(socket: any) {
    try {
      const claims = await this.prisma.claim.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  phone: true
                }
              }
            }
          },
          documents: {
            select: {
              id: true,
              filename: true,
              originalName: true,
              mimeType: true,
              size: true,
              createdAt: true
            }
          }
        }
      });

      socket.emit('claims-data', { claims });
    } catch (error) {
      console.error('Database error in sendClaimsData, using mock data:', error);
      socket.emit('claims-data', this.mockDataService.getMockClaimsData());
      socket.emit('mock-data-warning', { message: 'Using demonstration data due to database connectivity issues' });
    }
  }

  private async sendConsultationsData(socket: any) {
    try {
      const consultations = await this.prisma.consultation.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  phone: true
                }
              }
            }
          }
        }
      });

      socket.emit('consultations-data', { consultations });
    } catch (error) {
      console.error('Database error in sendConsultationsData, using mock data:', error);
      socket.emit('consultations-data', this.mockDataService.getMockConsultationsData());
      socket.emit('mock-data-warning', { message: 'Using demonstration data due to database connectivity issues' });
    }
  }

  private async sendUsersData(socket: any) {
    try {
      const users = await this.prisma.user.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              payments: true,
              claims: true
            }
          }
        }
      });

      socket.emit('users-data', { users });
    } catch (error) {
      console.error('Error sending users data:', error);
      socket.emit('error', { message: 'Failed to fetch users data' });
    }
  }

  private async sendPaymentsData(socket: any) {
    try {
      const payments = await this.prisma.payment.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });

      socket.emit('payments-data', { payments });
    } catch (error) {
      console.error('Error sending payments data:', error);
      socket.emit('error', { message: 'Failed to fetch payments data' });
    }
  }

  private async broadcastDashboardUpdate() {
    try {
      const [userCount, claimCount, paymentCount, totalRevenue] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.claim.count(),
        this.prisma.payment.count({ where: { status: 'COMPLETED' } }),
        this.prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: 'COMPLETED' }
        })
      ]);

      this.io.emit('dashboard-update', {
        stats: {
          totalUsers: userCount,
          totalClaims: claimCount,
          totalPayments: paymentCount,
          totalRevenue: totalRevenue._sum.amount || 0,
          growthRate: 12.5
        },
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Database error in broadcastDashboardUpdate, using mock data:', error);
      const mockData = this.mockDataService.getMockDashboardData();
      this.io.emit('dashboard-update', {
        ...mockData,
        timestamp: new Date(),
        isMockData: true
      });
    }
  }

  private async broadcastRecentActivity() {
    try {
      const recentActivity = await this.prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          role: true
        }
      });

      this.io.emit('recent-activity', recentActivity);
    } catch (error) {
      console.error('Error broadcasting recent activity:', error);
    }
  }

  // Method to trigger updates when data changes
  async notifyDataChange(type: 'user' | 'claim' | 'payment' | 'consultation', data: any) {
    this.io.emit('data-change', { type, data, timestamp: new Date() });
    
    // Trigger relevant data updates
    switch (type) {
      case 'user':
        await this.broadcastDashboardUpdate();
        break;
      case 'claim':
        this.io.emit('claim-update', data);
        break;
      case 'payment':
        this.io.emit('payment-update', data);
        break;
    }
  }
}

// Export function for use in main.ts
export function setupAdminPanelSocket(server: any) {
  const socketService = new AdminPanelSocketService();
  socketService.setupAdminPanelSocket(server);
  return socketService;
}
