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
const public_decorator_1 = require("../middleware/public.decorator");
const admin_service_1 = require("../services/admin.service");
const base_controller_1 = require("./base.controller");
let AdminController = class AdminController extends base_controller_1.BaseController {
    async getAllUsers(page, limit) {
        var _a, _b, _c, _d;
        try {
            const result = await this.adminService.getAllUsers(page ? +page : 1, limit ? +limit : 50);
            if (!result.success) {
                return this.handleError(new Error(result.message || 'Failed to fetch users'));
            }
            return this.handleSuccess({
                data: (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.users) !== null && _b !== void 0 ? _b : [],
                pagination: (_d = (_c = result.data) === null || _c === void 0 ? void 0 : _c.pagination) !== null && _d !== void 0 ? _d : {}
            }, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getAllNotifications(page, limit) {
        try {
            const notifications = [];
            const pagination = { page: page ? +page : 1, limit: limit ? +limit : 50, total: 0 };
            return this.handleSuccess({
                data: notifications,
                pagination
            }, 'Notifications retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getAllOutsourcing(page, limit) {
        var _a, _b, _c, _d;
        try {
            const result = await this.adminService.getAllOutsourcingRequests(page ? +page : 1, limit ? +limit : 50);
            if (!result.success) {
                return this.handleError(new Error(result.message || 'Failed to fetch outsourcing requests'));
            }
            return this.handleSuccess({
                data: (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.requests) !== null && _b !== void 0 ? _b : [],
                pagination: (_d = (_c = result.data) === null || _c === void 0 ? void 0 : _c.pagination) !== null && _d !== void 0 ? _d : {}
            }, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getOutsourcingStats() {
        try {
            const total = 0;
            const breakdown = {};
            return this.handleSuccess({ total, breakdown }, 'Outsourcing stats retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getSystemStats() {
        try {
            const result = await this.adminService.getDashboardStats();
            if (!result || !result.success || !result.data) {
                return this.handleSuccess({
                    totalUsers: 0,
                    totalClaims: 0,
                    totalQuotes: 0,
                    totalConsultations: 0,
                    totalOutsourcingRequests: 0,
                    totalDiasporaRequests: 0,
                    pendingClaims: 0,
                    pendingConsultations: 0
                }, 'No system stats available');
            }
            return this.handleSuccess(result.data, result.message || 'System stats retrieved successfully');
        }
        catch (error) {
            return this.handleSuccess({
                totalUsers: 0,
                totalClaims: 0,
                totalQuotes: 0,
                totalConsultations: 0,
                totalOutsourcingRequests: 0,
                totalDiasporaRequests: 0,
                pendingClaims: 0,
                pendingConsultations: 0
            }, 'No system stats available');
        }
    }
    async getAllClaims(page, limit, status, search) {
        var _a, _b, _c, _d;
        try {
            const result = await this.adminService.getAllClaims(page ? +page : 1, limit ? +limit : 50, status, search);
            if (!result.success) {
                return this.handleError(new Error(result.message || 'Failed to fetch claims'));
            }
            return this.handleSuccess({
                data: (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.claims) !== null && _b !== void 0 ? _b : [],
                pagination: (_d = (_c = result.data) === null || _c === void 0 ? void 0 : _c.pagination) !== null && _d !== void 0 ? _d : {}
            }, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getClaimById(id) {
        try {
            const result = await this.adminService.getClaimById(+id);
            if (!result.success) {
                return this.handleError(new Error(result.error));
            }
            return this.handleSuccess(result.data, 'Claim retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async updateClaimStatus(id, status) {
        try {
            const result = await this.adminService.updateClaimStatus(+id, status);
            if (!result.success) {
                return this.handleError(new Error(result.error));
            }
            return this.handleSuccess(result.data, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async deleteClaim(id) {
        try {
            const result = await this.adminService.deleteClaim(+id);
            if (!result.success) {
                return this.handleError(new Error(result.error));
            }
            return this.handleSuccess(null, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async exportClaims(format) {
        try {
            const result = await this.adminService.exportClaimsData(format);
            if (!result.success) {
                return this.handleError(new Error(result.error || 'Export failed'));
            }
            return this.handleSuccess(result.data, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    constructor(adminService) {
        super();
        this.adminService = adminService;
    }
    async getAllDiasporaRequests(page, limit, status, search) {
        try {
            const result = await this.adminService.getAllDiasporaRequests(page ? +page : 1, limit ? +limit : 50, status, search);
            if (!result.success) {
                return this.handleError(new Error(result.message || 'Failed to fetch diaspora requests'));
            }
            return this.handleSuccess({
                data: result.data.diasporaRequests,
                pagination: result.data.pagination
            }, result.message);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getAllQuotes(page, limit, status, search) {
        var _a, _b, _c, _d;
        try {
            const result = await this.adminService.getAllQuotes(page ? +page : 1, limit ? +limit : 50, status, search);
            return this.handleSuccess({
                data: (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.quotes) !== null && _b !== void 0 ? _b : [],
                pagination: (_d = (_c = result.data) === null || _c === void 0 ? void 0 : _c.pagination) !== null && _d !== void 0 ? _d : {}
            }, result.success ? 'Quotes retrieved successfully' : result.message);
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
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllNotifications", null);
__decorate([
    (0, common_1.Get)('outsourcing'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllOutsourcing", null);
__decorate([
    (0, common_1.Get)('outsourcing/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOutsourcingStats", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSystemStats", null);
__decorate([
    (0, common_1.Get)('claims'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllClaims", null);
__decorate([
    (0, common_1.Get)('claims/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getClaimById", null);
__decorate([
    (0, common_1.Put)('claims/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateClaimStatus", null);
__decorate([
    (0, common_1.Delete)('claims/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteClaim", null);
__decorate([
    (0, common_1.Get)('claims/export/:format'),
    __param(0, (0, common_1.Param)('format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "exportClaims", null);
__decorate([
    (0, common_1.Get)('diaspora'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllDiasporaRequests", null);
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
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map