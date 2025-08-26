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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../admin/admin.guard");
const admin_service_1 = require("../services/admin.service");
const base_controller_1 = require("./base.controller");
let AdminController = class AdminController extends base_controller_1.BaseController {
    constructor(adminService) {
        super();
        this.adminService = adminService;
    }
    async getAllQuotes(page = 1, limit = 50, status, search) {
        try {
            const result = await this.adminService.getAllQuotes(+page, +limit, status, search);
            return this.handleSuccess(result.data, result.success ? 'Quotes retrieved successfully' : result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getQuoteById(id) {
        try {
            const result = await this.adminService.getQuoteById(+id);
            if (!result.success) {
                return this.handleError(new Error(result.error));
            }
            return this.handleSuccess(result.data, 'Quote retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async updateQuoteStatus(id, status) {
        try {
            const result = await this.adminService.updateQuoteStatus(+id, status);
            if (!result.success) {
                return this.handleError(new Error(result.error));
            }
            return this.handleSuccess(result.data, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async deleteQuote(id) {
        try {
            const result = await this.adminService.deleteQuote(+id);
            if (!result.success) {
                return this.handleError(new Error(result.error));
            }
            return this.handleSuccess(null, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async exportQuotes(format) {
        try {
            const result = await this.adminService.exportQuotesData(format);
            if (!result.success) {
                return this.handleError(new Error(result.error || 'Export failed'));
            }
            return this.handleSuccess(result.data, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getComprehensiveStats() {
        try {
            const result = await this.adminService.getDashboardData();
            return this.handleSuccess(result.data, 'Dashboard stats retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getSystemHealth() {
        try {
            const result = await this.adminService.getSystemHealth();
            return this.handleSuccess(result, 'System health retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('quotes'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllQuotes", null);
__decorate([
    (0, common_1.Get)('quotes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getQuoteById", null);
__decorate([
    (0, common_1.Put)('quotes/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateQuoteStatus", null);
__decorate([
    (0, common_1.Delete)('quotes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteQuote", null);
__decorate([
    (0, common_1.Get)('quotes/export/:format'),
    __param(0, (0, common_1.Param)('format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "exportQuotes", null);
__decorate([
    (0, common_1.Get)('dashboard/comprehensive'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getComprehensiveStats", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSystemHealth", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map