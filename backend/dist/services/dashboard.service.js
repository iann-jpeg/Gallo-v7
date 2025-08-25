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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats(query) {
        try {
            let startDate;
            let endDate;
            if (query === null || query === void 0 ? void 0 : query.startDate) {
                startDate = new Date(query.startDate);
            }
            if (query === null || query === void 0 ? void 0 : query.endDate) {
                endDate = new Date(query.endDate);
                endDate.setHours(23, 59, 59, 999);
            }
            const dateFilter = startDate && endDate
                ? { createdAt: { gte: startDate, lte: endDate } }
                : {};
            const [totalClaims, totalQuotes, totalConsultations, totalOutsourcingRequests, totalPayments, totalDiasporaRequests, totalUsers, pendingClaims, activePolicies, recentClaims, recentOutsourcing, recentConsultations, recentPayments, recentDiaspora] = await Promise.all([
                this.prisma.claim.count({ where: dateFilter }),
                this.prisma.quote.count({ where: dateFilter }),
                this.prisma.consultation.count({ where: dateFilter }),
                this.prisma.outsourcingRequest.count({ where: dateFilter }),
                this.prisma.payment.count({ where: dateFilter }),
                this.prisma.diasporaRequest.count({ where: dateFilter }),
                this.prisma.user.count(),
                this.prisma.claim.count({
                    where: Object.assign({ status: { in: ['filed', 'under_review', 'pending'] } }, dateFilter)
                }),
                this.prisma.policy.count({
                    where: Object.assign({ status: 'active' }, dateFilter)
                }),
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
            const monthlyRevenue = recentPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
            const totalRequests = totalClaims + totalQuotes + totalConsultations + totalOutsourcingRequests;
            const conversionRate = totalRequests > 0 ? Math.round((activePolicies / totalRequests) * 100) : 0;
            return {
                totalClaims: totalClaims || 0,
                totalQuotes: totalQuotes || 0,
                totalConsultations: totalConsultations || 0,
                totalOutsourcingRequests: totalOutsourcingRequests || 0,
                totalPayments: totalPayments || 0,
                totalDiasporaRequests: totalDiasporaRequests || 0,
                totalUsers: totalUsers || 0,
                pendingClaims: pendingClaims || 0,
                activePolicies: activePolicies || 0,
                monthlyRevenue: Math.round(monthlyRevenue) || 0,
                conversionRate: conversionRate || 0,
                allSubmissions: {
                    claims: recentClaims || [],
                    outsourcing: recentOutsourcing || [],
                    consultations: recentConsultations || [],
                    payments: recentPayments || [],
                    diaspora: recentDiaspora || []
                },
                totalSubmissions: totalRequests,
                submissionsThisMonth: totalRequests
            };
        }
        catch (error) {
            console.error('Dashboard stats error:', error);
            throw new common_1.BadRequestException('Failed to fetch dashboard statistics: ' + (error instanceof Error ? error.message : String(error)));
        }
    }
    async getActivities(limit = 50) {
        try {
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
            const activities = [
                ...claims.map(item => (Object.assign(Object.assign({}, item), { type: 'claim' }))),
                ...outsourcing.map(item => (Object.assign(Object.assign({}, item), { type: 'outsourcing' }))),
                ...consultations.map(item => (Object.assign(Object.assign({}, item), { type: 'consultation' }))),
                ...payments.map(item => (Object.assign(Object.assign({}, item), { type: 'payment' }))),
                ...diaspora.map(item => (Object.assign(Object.assign({}, item), { type: 'diaspora' })))
            ];
            activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return activities.slice(0, limit);
        }
        catch (error) {
            console.error('Activities error:', error);
            throw new common_1.BadRequestException('Failed to fetch activities: ' + (error instanceof Error ? error.message : String(error)));
        }
    }
    async getTopStats() {
        try {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const [thisMonthClaims, thisMonthOutsourcing, thisMonthConsultations, thisMonthPayments, totalRevenue] = await Promise.all([
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
        }
        catch (error) {
            console.error('Top stats error:', error);
            throw new common_1.BadRequestException('Failed to fetch top statistics: ' + (error instanceof Error ? error.message : String(error)));
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map