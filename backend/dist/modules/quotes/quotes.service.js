"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../db/prisma");
const utils_1 = require("../../lib/utils");
let QuotesService = class QuotesService {
    async createQuote(formData) {
        try {
            const quote = await prisma_1.prisma.quote.create({
                data: Object.assign(Object.assign({}, formData), { status: 'pending' }),
            });
            return { success: true, quote };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async getQuotes(page = 1, limit = 20) {
        try {
            const { take, skip } = (0, utils_1.paginate)(page, limit);
            const [quotes, total] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.quote.findMany({
                    take,
                    skip,
                    orderBy: { createdAt: 'desc' },
                }),
                prisma_1.prisma.quote.count(),
            ]);
            return { quotes, total };
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = __decorate([
    (0, common_1.Injectable)()
], QuotesService);
//# sourceMappingURL=quotes.service.js.map