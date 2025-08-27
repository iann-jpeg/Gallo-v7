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
exports.QuotesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const email_service_1 = require("./email.service");
const prisma = new client_1.PrismaClient();
let QuotesService = class QuotesService {
    async createWithDocuments(data, documents) {
        try {
            // Create the quote first
            const createdQuote = await prisma.quote.create({
                data: {
                    ...data,
                    status: 'pending',
                }
            });
            // Save all uploaded documents and link to quote
            if (documents && documents.length > 0) {
                for (const file of documents) {
                    await prisma.document.create({
                        data: {
                            filename: file.filename,
                            originalName: file.originalname,
                            mimeType: file.mimetype,
                            size: file.size,
                            path: file.path,
                            quoteId: createdQuote.id,
                        }
                    });
                }
            }
            // Send notifications to admin (optional, can be added here)
            return createdQuote;
        }
        catch (error) {
            console.error('Quote creation error:', error);
            throw new common_1.BadRequestException('Failed to create quote: ' + (error.message || 'Unknown error'));
        }
    }
    constructor(emailService) {
        this.emailService = emailService;
    }
    async findAll({ page = 1, limit = 10 }) {
        try {
            const [quotes, total] = await Promise.all([
                prisma.quote.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.quote.count()
            ]);
            return {
                data: quotes,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            console.error('Error fetching quotes:', error);
            throw new common_1.BadRequestException('Failed to fetch quotes: ' + (error.message || 'Unknown error'));
        }
    }
    async findOne(id) {
        try {
            const quote = await prisma.quote.findUnique({ where: { id } });
            if (!quote) {
                throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
            }
            return quote;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error fetching quote:', error);
            throw new common_1.BadRequestException('Failed to fetch quote: ' + (error.message || 'Unknown error'));
        }
    }
    async create(data) {
        try {
            // Remove documentPath from the data before creating the quote
            const { documentPath, ...quoteData } = data;
            let createdQuote;
            if (documentPath) {
                // Create quote first
                createdQuote = await prisma.quote.create({
                    data: {
                        ...quoteData,
                        status: 'pending',
                    }
                });
                // Create document and link to quote
                await prisma.document.create({
                    data: {
                        filename: documentPath.split('/').pop() || documentPath,
                        originalName: documentPath.split('/').pop() || documentPath,
                        mimeType: 'application/octet-stream', // Could be improved by passing actual mime type
                        size: 0, // Could be improved by passing actual file size
                        path: documentPath,
                        quoteId: createdQuote.id,
                    }
                });
            }
            else {
                createdQuote = await prisma.quote.create({
                    data: {
                        ...quoteData,
                        status: 'pending',
                    }
                });
            }
            // Send notifications to admin
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
            const subject = 'New Quote Submission';
            const text = `A new quote has been submitted:\n\n` +
                `Name: ${data.firstName} ${data.lastName}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone}\n` +
                `Product: ${data.product}\n` +
                `Location: ${data.location || 'Not specified'}\n` +
                `Budget: ${data.budget || 'Not specified'}\n` +
                `Coverage: ${data.coverage || 'Not specified'}\n` +
                `Details: ${data.details || 'None provided'}\n` +
                `Preferred Contact: ${data.contactMethod}\n` +
                `Best Time: ${data.bestTime || 'Not specified'}\n` +
                `Document Attached: ${documentPath ? 'Yes' : 'No'}`;
            await Promise.all([
                this.emailService.sendMail(adminEmail, subject, text).catch(error => {
                    console.error('Failed to send admin notification email:', error);
                })
            ]);
            return createdQuote;
        }
        catch (error) {
            console.error('Quote creation error:', error);
            throw new common_1.BadRequestException('Failed to create quote: ' + (error.message || 'Unknown error'));
        }
    }
    async update(id, data) {
        try {
            const quote = await prisma.quote.update({
                where: { id },
                data: {
                    ...data,
                }
            });
            return quote;
        }
        catch (error) {
            if (error instanceof Object && 'code' in error && error.code === 'P2025') {
                throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
            }
            console.error('Quote update error:', error);
            throw new common_1.BadRequestException('Failed to update quote: ' + (error.message || 'Unknown error'));
        }
    }
    async remove(id) {
        try {
            const quote = await prisma.quote.delete({
                where: { id }
            });
            return quote;
        }
        catch (error) {
            if (error instanceof Object && 'code' in error && error.code === 'P2025') {
                throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
            }
            console.error('Quote deletion error:', error);
            throw new common_1.BadRequestException('Failed to delete quote: ' + (error.message || 'Unknown error'));
        }
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], QuotesService);
