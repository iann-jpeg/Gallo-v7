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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
            const [claims, total] = await Promise.all([
                prisma.claim.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                        documents: {
                            select: {
                                id: true,
                                filename: true,
                                originalName: true,
                                mimeType: true,
                                size: true,
                                createdAt: true,
                            },
                        },
                    },
                }),
                prisma.claim.count()
            ]);
            const claimsWithUrls = claims.map(claim => (Object.assign(Object.assign({}, claim), { documentUrls: claim.documents.map(doc => `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/view/${doc.id}`) })));
            return {
                data: claimsWithUrls,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch claims');
        }
    }
    async findOne(id) {
        try {
            const claim = await prisma.claim.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    documents: {
                        select: {
                            id: true,
                            filename: true,
                            originalName: true,
                            mimeType: true,
                            size: true,
                            createdAt: true,
                        },
                    },
                }
            });
            if (!claim)
                throw new common_1.BadRequestException('Claim not found');
            const claimWithUrls = Object.assign(Object.assign({}, claim), { documentUrls: claim.documents.map(doc => `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/view/${doc.id}`) });
            return claimWithUrls;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch claim: ' + error.message);
        }
    }
    async create(data) {
        try {
            const { documentPath, documentDetails, documents, firstName, lastName, email, phone } = data, databaseFields = __rest(data, ["documentPath", "documentDetails", "documents", "firstName", "lastName", "email", "phone"]);
            const finalData = {
                policyNumber: data.policyNumber,
                claimType: data.claimType,
                incidentDate: new Date(data.incidentDate),
                estimatedLoss: Number(data.estimatedLoss),
                description: data.description,
                submitterName: firstName && lastName ? `${firstName} ${lastName}` : undefined,
                submitterEmail: email,
                submitterPhone: phone
            };
            const claim = await prisma.claim.create({ data: finalData });
            if (documentDetails && documentDetails.length > 0) {
                await Promise.all(documentDetails.map(async (doc) => {
                    let content = undefined;
                    if (doc.path) {
                        try {
                            const fs = require('fs').promises;
                            const path = require('path');
                            const fullPath = path.join(process.cwd(), 'uploads', 'claims', doc.filename);
                            content = await fs.readFile(fullPath);
                        }
                        catch (error) {
                            console.error('Error reading file:', error);
                        }
                    }
                    const documentData = {
                        filename: doc.filename,
                        originalName: doc.originalName,
                        mimeType: doc.mimeType,
                        size: doc.size,
                        path: doc.path || doc.filename,
                        claimId: claim.id,
                    };
                    if (content) {
                        documentData.content = content;
                    }
                    return prisma.document.create({
                        data: documentData
                    });
                }));
            }
            const claimNotificationData = {
                policyNumber: data.policyNumber,
                claimType: data.claimType,
                incidentDate: data.incidentDate,
                estimatedLoss: data.estimatedLoss,
                description: data.description,
                submitterName: finalData.submitterName || 'Not provided',
                submitterEmail: email || 'Not provided',
                submitterPhone: phone || 'Not provided',
                documentCount: (documentDetails === null || documentDetails === void 0 ? void 0 : documentDetails.length) || 0,
                documentLinks: (documentDetails === null || documentDetails === void 0 ? void 0 : documentDetails.map(doc => `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/claims/${doc.filename}`).join('\n')) || 'No documents uploaded'
            };
            const customerNotificationData = Object.assign(Object.assign({}, claimNotificationData), { claimId: claim.id });
            await Promise.allSettled([
                this.emailService.sendClaimNotification(process.env.ADMIN_EMAIL, claimNotificationData),
                email ? this.emailService.sendClaimConfirmation(email, customerNotificationData) : Promise.resolve()
            ]);
            return claim;
        }
        catch (error) {
            console.error('Claim creation error:', error);
            throw new common_1.BadRequestException('Failed to create claim: ' + error.message);
        }
    }
    async update(id, data) {
        try {
            const claim = await prisma.claim.update({
                where: { id },
                data: Object.assign({ updatedAt: new Date() }, data)
            });
            const fullClaim = await prisma.claim.findUnique({
                where: { id }
            });
            const updatedFields = Object.keys(data).join(', ');
            await Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, `Claim Updated - #${id}`, `Claim #${id} has been updated.\n\nUpdated fields: ${updatedFields}\n\nView in dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/resources`),
            ]);
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update claim: ' + error.message);
        }
    }
    async updateStatus(id, status) {
        try {
            const claim = await prisma.claim.update({
                where: { id },
                data: {
                    status: status,
                    updatedAt: new Date()
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                }
            });
            await Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, `Claim Status Updated - #${id}`, `Claim #${id} status has been updated to: ${status}\n\nView in dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin`),
                claim.submitterEmail ? this.emailService.sendMail(claim.submitterEmail, `Claim Status Update - Reference #${id}`, `Dear Customer,\n\nYour claim (Reference #${id}) status has been updated to: ${status}\n\nFor questions, contact us at claims@galloways.co.ke\n\nBest regards,\nGalloways Insurance`) : Promise.resolve()
            ]);
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update claim status: ' + error.message);
        }
    }
    async remove(id) {
        try {
            await prisma.claim.delete({ where: { id } });
            await Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, `Claim Deleted - #${id}`, `Claim #${id} has been permanently deleted from the system.\n\nDeleted on: ${new Date().toLocaleString()}`)
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
//# sourceMappingURL=claims.service.js.map