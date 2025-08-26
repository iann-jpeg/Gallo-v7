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
exports.ResourceController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../middleware/public.decorator");
const base_controller_1 = require("./base.controller");
let ResourceController = class ResourceController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.mockResources = [
            {
                id: 'brochure-2024',
                name: 'Company Brochure 2024',
                type: 'brochure',
                description: 'Comprehensive overview of Galloways services and capabilities',
                downloadCount: 245,
                fileSize: '2.5 MB',
                format: 'PDF',
                createdAt: new Date('2024-01-01')
            },
            {
                id: 'service-catalog',
                name: 'Service Catalog',
                type: 'catalog',
                description: 'Detailed catalog of all services offered',
                downloadCount: 189,
                fileSize: '3.2 MB',
                format: 'PDF',
                createdAt: new Date('2024-01-15')
            },
            {
                id: 'case-studies',
                name: 'Case Studies Collection',
                type: 'case-studies',
                description: 'Success stories and project case studies',
                downloadCount: 156,
                fileSize: '4.1 MB',
                format: 'PDF',
                createdAt: new Date('2024-02-01')
            }
        ];
    }
    async getAllResources() {
        try {
            return this.handleSuccess(this.mockResources, 'Resources retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getResourceById(id) {
        try {
            const resource = this.mockResources.find(r => r.id === id);
            if (!resource) {
                throw new common_1.NotFoundException(`Resource with ID ${id} not found`);
            }
            return this.handleSuccess(resource, 'Resource retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async downloadResource(data) {
        try {
            if (!data.resourceType) {
                throw new common_1.BadRequestException('Resource type is required');
            }
            const resource = this.mockResources.find(r => r.type === data.resourceType || r.id === data.resourceType);
            if (!resource) {
                throw new common_1.BadRequestException(`Resource type '${data.resourceType}' not found`);
            }
            const downloadRef = `DL-${Date.now().toString().slice(-8)}`;
            console.log('Resource download requested:', {
                downloadRef,
                resourceId: resource.id,
                resourceName: resource.name,
                userEmail: data.email,
                company: data.company,
                purpose: data.purpose,
                timestamp: new Date()
            });
            resource.downloadCount += 1;
            const downloadData = {
                downloadRef,
                resourceId: resource.id,
                resourceName: resource.name,
                fileSize: resource.fileSize,
                format: resource.format,
                downloadUrl: `/api/resources/file/${resource.id}/${downloadRef}`,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                metadata: {
                    downloadCount: resource.downloadCount,
                    userInfo: {
                        email: data.email,
                        company: data.company,
                        purpose: data.purpose
                    }
                }
            };
            return this.handleSuccess(downloadData, `${resource.name} download prepared successfully`);
        }
        catch (error) {
            console.error('Resource download error:', error);
            return this.handleError(error);
        }
    }
    async getResourceFile(resourceId, downloadRef) {
        try {
            const resource = this.mockResources.find(r => r.id === resourceId);
            if (!resource) {
                throw new common_1.NotFoundException('Resource not found');
            }
            return this.handleSuccess({
                resourceId,
                downloadRef,
                fileName: `${resource.name.replace(/\s+/g, '_')}.pdf`,
                contentType: 'application/pdf',
                fileSize: resource.fileSize,
                message: 'File download would start here in a real implementation'
            }, 'File download initiated');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async createResourceRequest(data) {
        try {
            const requestRef = `REQ-${Date.now().toString().slice(-8)}`;
            console.log('Resource request created:', Object.assign(Object.assign({ requestRef }, data), { status: 'PENDING', createdAt: new Date() }));
            return this.handleSuccess(Object.assign(Object.assign({ requestRef, status: 'PENDING' }, data), { message: 'Resource request submitted successfully' }), 'Resource request created successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getDownloadAnalytics() {
        try {
            const analytics = {
                totalDownloads: this.mockResources.reduce((sum, r) => sum + r.downloadCount, 0),
                resourceBreakdown: this.mockResources.map(r => ({
                    resourceId: r.id,
                    name: r.name,
                    type: r.type,
                    downloadCount: r.downloadCount,
                    lastUpdated: r.createdAt
                })),
                topResources: this.mockResources
                    .sort((a, b) => b.downloadCount - a.downloadCount)
                    .slice(0, 5),
                downloadTrends: {
                    thisWeek: Math.floor(Math.random() * 50) + 20,
                    lastWeek: Math.floor(Math.random() * 50) + 15,
                    thisMonth: Math.floor(Math.random() * 200) + 100,
                    lastMonth: Math.floor(Math.random() * 200) + 80
                }
            };
            return this.handleSuccess(analytics, 'Download analytics retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
};
exports.ResourceController = ResourceController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getAllResources", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getResourceById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('download'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "downloadResource", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('file/:resourceId/:downloadRef'),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Param)('downloadRef')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getResourceFile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "createResourceRequest", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('analytics/downloads'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getDownloadAnalytics", null);
exports.ResourceController = ResourceController = __decorate([
    (0, common_1.Controller)('resources')
], ResourceController);
//# sourceMappingURL=resources.controller.js.map