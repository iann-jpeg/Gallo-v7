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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const public_decorator_1 = require("../middleware/public.decorator");
let DocumentsController = class DocumentsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async viewClaimDocument(filename, res) {
        try {
            // Security: validate filename to prevent path traversal
            if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
                throw new common_1.BadRequestException('Invalid filename');
            }
            // Find document in database
            const document = await this.prisma.document.findFirst({
                where: {
                    filename: filename,
                    claimId: { not: null }
                }
            });
            if (!document || !document.content) {
                throw new common_1.NotFoundException('Document not found or no content available');
            }
            // Set appropriate content type based on mimeType
            res.setHeader('Content-Type', document.mimeType);
            res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
            res.setHeader('Content-Length', document.size.toString());
            // Send file content from database
            res.send(Buffer.from(document.content));
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to serve document: ' + error.message);
        }
    }
    async viewQuoteDocument(filename, res) {
        try {
            // Security: validate filename to prevent path traversal
            if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
                throw new common_1.BadRequestException('Invalid filename');
            }
            // Find document in database
            const document = await this.prisma.document.findFirst({
                where: {
                    filename: filename,
                    quoteId: { not: null }
                }
            });
            if (!document || !document.content) {
                throw new common_1.NotFoundException('Document not found or no content available');
            }
            // Set appropriate content type based on mimeType
            res.setHeader('Content-Type', document.mimeType);
            res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
            res.setHeader('Content-Length', document.size.toString());
            // Send file content from database
            res.send(Buffer.from(document.content));
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to serve document: ' + error.message);
        }
    }
    // New endpoint to view document by ID
    async viewDocumentById(id, res) {
        try {
            const documentId = parseInt(id);
            if (isNaN(documentId)) {
                throw new common_1.BadRequestException('Invalid document ID');
            }
            // Find document in database by ID
            const document = await this.prisma.document.findUnique({
                where: { id: documentId }
            });
            if (!document || !document.content) {
                throw new common_1.NotFoundException('Document not found or no content available');
            }
            // Set appropriate content type based on mimeType
            res.setHeader('Content-Type', document.mimeType);
            res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
            res.setHeader('Content-Length', document.size.toString());
            // Send file content from database
            res.send(Buffer.from(document.content));
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to serve document: ' + error.message);
        }
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)('claims/:filename'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "viewClaimDocument", null);
__decorate([
    (0, common_1.Get)('quotes/:filename'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "viewQuoteDocument", null);
__decorate([
    (0, common_1.Get)('view/:id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "viewDocumentById", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsController);
