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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let OutsourcingService = class OutsourcingService {
    async findAll(page = 1, limit = 10, status) {
        try {
            const skip = (page - 1) * limit;
            const where = status ? { status } : {};
            const [requests, total] = await Promise.all([
                prisma.outsourcingRequest.findMany({
                    skip,
                    take: limit,
                    where,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: { id: true, name: true, email: true }
                        },
                        documents: true
                    }
                }),
                prisma.outsourcingRequest.count({ where })
            ]);
            return {
                data: requests,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            console.error('Error fetching outsourcing requests:', error);
            throw new common_1.BadRequestException('Failed to fetch outsourcing requests');
        }
    }
    async findOne(id) {
        try {
            const request = await prisma.outsourcingRequest.findUnique({
                where: { id },
                include: {
                    user: {
                        select: { id: true, name: true, email: true }
                    },
                    documents: true
                }
            });
            if (!request) {
                throw new common_1.NotFoundException(`Outsourcing request with ID ${id} not found`);
            }
            return request;
        }
        catch (error) {
            console.error('Error fetching outsourcing request:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch outsourcing request');
        }
    }
    async create(data, document) {
        var _a, _b;
        try {
            const request = await prisma.outsourcingRequest.create({
                data: Object.assign(Object.assign({}, data), { services: data.services || [] }),
                include: {
                    documents: true
                }
            });
            if (document) {
                await prisma.document.create({
                    data: {
                        filename: document.filename,
                        originalName: document.originalname,
                        mimeType: document.mimetype,
                        size: document.size,
                        path: document.path,
                        outsourcingId: request.id
                    }
                });
            }
            const adminMessage = `New outsourcing request received:

Organization: ${data.organizationName}
Email: ${data.email}
Location: ${data.location}
Services: ${(_a = data.services) === null || _a === void 0 ? void 0 : _a.join(', ')}
Nature: ${data.natureOfOutsourcing}
Budget: ${data.budgetRange}
Company Size: ${data.companySize || 'Not provided'}
Phone: ${data.phone || 'Not provided'}

Created At: ${new Date().toISOString()}`;
            const clientMessage = `Dear ${data.organizationName},

Thank you for your outsourcing inquiry. We have received your request for the following services:

${(_b = data.services) === null || _b === void 0 ? void 0 : _b.map(service => `• ${service}`).join('\n')}

Our consultants will review your requirements and contact you within 24-48 hours to discuss your needs in detail.

Best regards,
Galloways Insurance Team`;
            console.log('Admin notification:', adminMessage);
            console.log('Client confirmation:', clientMessage);
            return {
                success: true,
                message: 'Outsourcing request submitted successfully',
                data: request
            };
        }
        catch (error) {
            console.error('Error creating outsourcing request:', error);
            throw new common_1.BadRequestException('Failed to create outsourcing request');
        }
    }
    async update(id, data) {
        try {
            const existingRequest = await prisma.outsourcingRequest.findUnique({
                where: { id }
            });
            if (!existingRequest) {
                throw new common_1.NotFoundException(`Outsourcing request with ID ${id} not found`);
            }
            const updatedRequest = await prisma.outsourcingRequest.update({
                where: { id },
                data: Object.assign(Object.assign({}, data), { services: data.services || existingRequest.services }),
                include: {
                    user: {
                        select: { id: true, name: true, email: true }
                    },
                    documents: true
                }
            });
            return {
                success: true,
                message: 'Outsourcing request updated successfully',
                data: updatedRequest
            };
        }
        catch (error) {
            console.error('Error updating outsourcing request:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update outsourcing request');
        }
    }
    async remove(id) {
        try {
            const existingRequest = await prisma.outsourcingRequest.findUnique({
                where: { id }
            });
            if (!existingRequest) {
                throw new common_1.NotFoundException(`Outsourcing request with ID ${id} not found`);
            }
            await prisma.outsourcingRequest.delete({
                where: { id }
            });
            return {
                success: true,
                message: 'Outsourcing request deleted successfully'
            };
        }
        catch (error) {
            console.error('Error deleting outsourcing request:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete outsourcing request');
        }
    }
    async updateStatus(id, status) {
        try {
            const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                throw new common_1.BadRequestException('Invalid status provided');
            }
            const updatedRequest = await prisma.outsourcingRequest.update({
                where: { id },
                data: { status },
                include: {
                    user: {
                        select: { id: true, name: true, email: true }
                    }
                }
            });
            return {
                success: true,
                message: 'Status updated successfully',
                data: updatedRequest
            };
        }
        catch (error) {
            console.error('Error updating status:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update status');
        }
    }
};
exports.OutsourcingService = OutsourcingService;
exports.OutsourcingService = OutsourcingService = __decorate([
    (0, common_1.Injectable)()
], OutsourcingService);
//# sourceMappingURL=outsourcing.service.js.map