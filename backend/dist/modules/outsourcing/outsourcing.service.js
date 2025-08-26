"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutsourcingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../db/prisma");
const utils_1 = require("../../lib/utils");
let OutsourcingService = class OutsourcingService {
    async createOutsourcingRequest(data) {
        try {
            const outsourcing = await prisma_1.prisma.outsourcingRequest.create({
                data: Object.assign(Object.assign({}, data), { status: 'pending' }),
            });
            return { success: true, outsourcing };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async getOutsourcingRequests(page = 1, limit = 20) {
        try {
            const { take, skip } = (0, utils_1.paginate)(page, limit);
            const [outsourcing, total] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.outsourcingRequest.findMany({
                    take,
                    skip,
                    orderBy: { createdAt: 'desc' },
                }),
                prisma_1.prisma.outsourcingRequest.count(),
            ]);
            return { outsourcing, total };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
};
exports.OutsourcingService = OutsourcingService;
exports.OutsourcingService = OutsourcingService = __decorate([
    (0, common_1.Injectable)()
], OutsourcingService);
//# sourceMappingURL=outsourcing.service.js.map