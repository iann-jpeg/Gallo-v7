"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../db/prisma");
let DashboardService = class DashboardService {
    async getStats() {
        const [totalClaims, totalQuotes, totalConsultations, totalOutsourcingRequests, totalPayments, totalDiasporaRequests, totalUsers, pendingClaims, activePolicies, monthlyRevenue, conversionRate, claims, outsourcing, consultations, payments, diaspora,] = await Promise.all([
            prisma_1.prisma.claim.count(),
            prisma_1.prisma.quote.count(),
            prisma_1.prisma.consultation.count(),
            prisma_1.prisma.outsourcingRequest.count(),
            prisma_1.prisma.payment.count(),
            prisma_1.prisma.diasporaRequest.count(),
            prisma_1.prisma.user.count(),
            prisma_1.prisma.claim.count({ where: { status: 'pending' } }),
            prisma_1.prisma.policy.count({ where: { status: 'active' } }),
            prisma_1.prisma.payment.aggregate({ _sum: { amount: true } }).then((r) => r._sum.amount || 0),
            Promise.resolve(12),
            prisma_1.prisma.claim.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
            prisma_1.prisma.outsourcingRequest.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
            prisma_1.prisma.consultation.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
            prisma_1.prisma.payment.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
            prisma_1.prisma.diasporaRequest.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
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
    async getActivities() {
        const activities = await prisma_1.prisma.claim.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' },
        });
        return activities;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map