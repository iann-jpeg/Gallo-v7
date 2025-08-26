"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../db/prisma");
const utils_1 = require("../../lib/utils");
let ClaimsService = class ClaimsService {
    async createClaim(formData) {
        try {
            const claim = await prisma_1.prisma.claim.create({
                data: Object.assign(Object.assign({}, formData), { status: 'pending' }),
            });
            return { success: true, claim };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async getClaims(page = 1, limit = 20) {
        try {
            const { take, skip } = (0, utils_1.paginate)(page, limit);
            const [claims, total] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.claim.findMany({
                    take,
                    skip,
                    orderBy: { createdAt: 'desc' },
                }),
                prisma_1.prisma.claim.count(),
            ]);
            return { claims, total };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async getClaim(id) {
        try {
            const claim = await prisma_1.prisma.claim.findUnique({
                where: { id: Number(id) },
            });
            if (!claim)
                return { success: false, message: 'Not found' };
            return claim;
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async updateClaimStatus(id, status) {
        try {
            const claim = await prisma_1.prisma.claim.update({
                where: { id: Number(id) },
                data: { status },
            });
            return { success: true, claim };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)()
], ClaimsService);
//# sourceMappingURL=claims.service.js.map