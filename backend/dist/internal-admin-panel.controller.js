"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelSocketService = void 0;
exports.setupAdminPanelSocket = setupAdminPanelSocket;
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("./prisma/prisma.service");
const mock_data_service_1 = require("./services/mock-data.service");
const common_1 = require("@nestjs/common");
let AdminPanelSocketService = class AdminPanelSocketService {
    constructor() {
        this.prisma = new prisma_service_1.PrismaService();
        this.mockDataService = new mock_data_service_1.MockDataService();
    }
    setupAdminPanelSocket(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.NODE_ENV === 'development'
                    ? ["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"]
                    : ["https://galloways.co.ke", "https://www.galloways.co.ke", "https://app.galloways.co.ke"],
                credentials: true
            }
        });
        this.io.on('connection', (socket) => {
            console.log('Admin client connected:', socket.id);
            this.sendDashboardData(socket);
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
        this.setupPeriodicUpdates();
    }
    setupPeriodicUpdates() {
        setInterval(async () => {
            try {
                await this.broadcastDashboardUpdate();
                await this.broadcastRecentActivity();
            }
            catch (error) {
                console.error('Error broadcasting updates:', error);
            }
        }, 30000);
    }
    async sendDashboardData(socket) {
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
        }
        catch (error) {
            console.error('Database error in sendDashboardData, using mock data:', error);
            socket.emit('dashboard-data', this.mockDataService.getMockDashboardData());
        }
    }
    async sendClaimsData(socket) {
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
        }
        catch (error) {
            console.error('Database error in sendClaimsData, using mock data:', error);
            socket.emit('claims-data', this.mockDataService.getMockClaimsData());
            socket.emit('mock-data-warning', { message: 'Using demonstration data due to database connectivity issues' });
        }
    }
    async sendConsultationsData(socket) {
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
        }
        catch (error) {
            console.error('Database error in sendConsultationsData, using mock data:', error);
            socket.emit('consultations-data', this.mockDataService.getMockConsultationsData());
            socket.emit('mock-data-warning', { message: 'Using demonstration data due to database connectivity issues' });
        }
    }
    async sendUsersData(socket) {
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
        }
        catch (error) {
            console.error('Error sending users data:', error);
            socket.emit('error', { message: 'Failed to fetch users data' });
        }
    }
    async sendPaymentsData(socket) {
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
        }
        catch (error) {
            console.error('Error sending payments data:', error);
            socket.emit('error', { message: 'Failed to fetch payments data' });
        }
    }
    async broadcastDashboardUpdate() {
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
        }
        catch (error) {
            console.error('Database error in broadcastDashboardUpdate, using mock data:', error);
            const mockData = this.mockDataService.getMockDashboardData();
            this.io.emit('dashboard-update', Object.assign(Object.assign({}, mockData), { timestamp: new Date(), isMockData: true }));
        }
    }
    async broadcastRecentActivity() {
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
        }
        catch (error) {
            console.error('Error broadcasting recent activity:', error);
        }
    }
    async notifyDataChange(type, data) {
        this.io.emit('data-change', { type, data, timestamp: new Date() });
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
};
exports.AdminPanelSocketService = AdminPanelSocketService;
exports.AdminPanelSocketService = AdminPanelSocketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AdminPanelSocketService);
function setupAdminPanelSocket(server) {
    const socketService = new AdminPanelSocketService();
    socketService.setupAdminPanelSocket(server);
    return socketService;
}
//# sourceMappingURL=internal-admin-panel.controller.js.map