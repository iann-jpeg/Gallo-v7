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
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const email_service_1 = require("./email.service");
const prisma = new client_1.PrismaClient();
let ClaimsService = class ClaimsService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async findAll({ page = 1, limit = 10 }) {
        try {
            const skip = (page - 1) * limit;
            const [claims, total] = await Promise.all([
                prisma.claim.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.claim.count()
            ]);
            return {
                data: claims,
                meta: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch claims: ' + error.message);
        }
    }
    async findOne(id) {
        try {
            const claim = await prisma.claim.findUnique({ where: { id } });
            if (!claim)
                throw new common_1.BadRequestException('Claim not found');
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch claim: ' + error.message);
        }
    }
    async create(data) {
        try {
            const claim = await prisma.claim.create({ data });
            const adminMessage = `New claim submitted:\n\n` +
                `Policy Number: ${data.policyNumber}\n` +
                `Claim Type: ${data.claimType}\n` +
                `Date of Incident: ${data.incidentDate}\n` +
                `Estimated Loss: ${data.estimatedLoss}\n` +
                `Description: ${data.description}\n` +
                `Document Path: ${data.documentPath || 'No document attached'}`;
            await Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, 'New Claim Submission', adminMessage)
            ]);
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create claim: ' + error.message);
        }
    }
    async update(id, data) {
        try {
            const claim = await prisma.claim.update({
                where: { id },
                data
            });
            await Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, 'Claim Updated', `Claim #${id} has been updated.\nUpdated fields: ${Object.keys(data).join(', ')}`)
            ]);
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update claim: ' + error.message);
        }
    }
    async remove(id) {
        try {
            await prisma.claim.delete({ where: { id } });
            await Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, 'Claim Deleted', `Claim #${id} has been deleted from the system.`)
            ]);
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete claim: ' + error.message);
        }
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], ClaimsService);
//# sourceMappingURL=claims.service.new.js.map