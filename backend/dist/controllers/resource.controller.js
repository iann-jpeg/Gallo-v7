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
const platform_express_1 = require("@nestjs/platform-express");
const resource_service_1 = require("../services/resource.service");
const resource_dto_1 = require("../config/resource.dto");
const jwt_auth_guard_1 = require("../middleware/jwt-auth.guard");
const roles_guard_1 = require("../middleware/roles.guard");
const roles_decorator_1 = require("../middleware/roles.decorator");
const public_decorator_1 = require("../middleware/public.decorator");
const multer_1 = require("multer");
const path_1 = require("path");
let ResourceController = class ResourceController {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async findAll(page = 1, limit = 10, category, adminOnly) {
        return this.resourceService.findAll(+page, +limit, category, adminOnly);
    }
    async findPublicResources(category) {
        return this.resourceService.findPublicResources(category);
    }
    async findOne(id) {
        return this.resourceService.findOne(+id);
    }
    async downloadResource(id, res) {
        return this.resourceService.downloadResource(+id, res);
    }
    async serveFile(filename, res) {
        return this.resourceService.serveFile(filename, res);
    }
    async create(createResourceDto, file) {
        return this.resourceService.create(createResourceDto, file);
    }
    async update(id, updateResourceDto) {
        return this.resourceService.update(+id, updateResourceDto);
    }
    async remove(id) {
        return this.resourceService.remove(+id);
    }
};
exports.ResourceController = ResourceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('adminOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Boolean]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('public'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "findPublicResources", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('download/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "downloadResource", null);
__decorate([
    (0, common_1.Get)('serve/:filename'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "serveFile", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/resources',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `resource-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            const allowedTypes = /\.(pdf|jpg|jpeg|png|doc|docx|xls|xlsx|zip)$/;
            if (allowedTypes.test(file.originalname.toLowerCase())) {
                callback(null, true);
            }
            else {
                callback(new common_1.BadRequestException('Invalid file type'), false);
            }
        },
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resource_dto_1.CreateResourceDto, Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resource_dto_1.UpdateResourceDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "remove", null);
exports.ResourceController = ResourceController = __decorate([
    (0, common_1.Controller)('resources'),
    __metadata("design:paramtypes", [resource_service_1.ResourceService])
], ResourceController);
