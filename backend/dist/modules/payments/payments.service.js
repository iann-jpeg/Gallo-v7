"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../db/prisma");
const utils_1 = require("../../lib/utils");
let PaymentsService = class PaymentsService {
    async createPayment(data) {
        try {
            const payment = await prisma_1.prisma.payment.create({
                data: Object.assign(Object.assign({}, data), { status: 'pending' }),
            });
            return { success: true, payment };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async processPayment(id, data) {
        try {
            const payment = await prisma_1.prisma.payment.update({
                where: { id: Number(id) },
                data: Object.assign(Object.assign({}, data), { status: 'completed' }),
            });
            return { success: true, payment };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async getPaymentStatus(id) {
        try {
            const payment = await prisma_1.prisma.payment.findUnique({
                where: { id: Number(id) },
            });
            if (!payment)
                return { success: false, message: 'Not found' };
            return { id, status: payment.status };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)()
], PaymentsService);
//# sourceMappingURL=payments.service.js.map