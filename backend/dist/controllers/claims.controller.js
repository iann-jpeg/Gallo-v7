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
exports.ClaimsController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../middleware/public.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const claims_service_1 = require("../services/claims.service");
const claim_dto_1 = require("../config/claim.dto");
let ClaimsController = class ClaimsController {
    constructor(claimsService) {
        this.claimsService = claimsService;
    }
    async findAll(page, limit) {
        try {
            const claims = await this.claimsService.findAll({ page, limit });
            return {
                success: true,
                data: claims
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to fetch claims');
        }
    }
    async findOne(id) {
        try {
            const claim = await this.claimsService.findOne(+id);
            return {
                success: true,
                data: claim
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to fetch claim');
        }
    }
    async getClaimDocuments(id) {
        try {
            const claim = await this.claimsService.findOne(+id);
            return {
                success: true,
                data: claim.document
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to fetch claim documents');
        }
    }
    async create(data, documents) {
        try {
            let documentPaths = [];
            let documentDetails = [];
            if (documents && documents.length > 0) {
                documentPaths = documents.map(file => file.filename);
                documentDetails = documents.map(file => ({
                    filename: file.filename,
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    path: file.path
                }));
            }
            const claimData = Object.assign(Object.assign({}, data), { documentDetails: documentDetails });
            const claim = await this.claimsService.create(claimData);
            return {
                success: true,
                message: 'Claim submitted successfully',
                data: claim
            };
        }
        catch (error) {
            console.error('Claim creation error:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to submit claim');
        }
    }
    async update(id, data) {
        try {
            const claim = await this.claimsService.update(+id, data);
            return {
                success: true,
                message: 'Claim updated successfully',
                data: claim
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update claim');
        }
    }
    async updateStatus(id, body) {
        try {
            const claim = await this.claimsService.updateStatus(+id, body.status);
            return {
                success: true,
                message: 'Claim status updated successfully',
                data: claim
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update claim status');
        }
    }
    async remove(id) {
        try {
            await this.claimsService.remove(+id);
            return {
                success: true,
                message: 'Claim deleted successfully'
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to delete claim');
        }
    }
};
exports.ClaimsController = ClaimsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/documents'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getClaimDocuments", null);
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('documents', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/claims',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `claim-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(pdf|jpg|jpeg|png|doc|docx)$/)) {
                return callback(new common_1.BadRequestException('Only PDF, JPG, PNG, and DOC files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_dto_1.CreateClaimDto, Array]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, claim_dto_1.UpdateClaimDto]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "remove", null);
exports.ClaimsController = ClaimsController = __decorate([
    (0, common_1.Controller)('claims'),
    __metadata("design:paramtypes", [claims_service_1.ClaimsService])
], ClaimsController);
//# sourceMappingURL=claims.controller.js.map