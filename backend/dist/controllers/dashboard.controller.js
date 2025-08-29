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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../middleware/jwt-auth.guard");
const roles_guard_1 = require("../middleware/roles.guard");
const roles_decorator_1 = require("../middleware/roles.decorator");
const public_decorator_1 = require("../middleware/public.decorator");
const dashboard_service_1 = require("../services/dashboard.service");
const pdf_service_1 = require("../services/pdf.service");
const dashboard_dto_1 = require("../config/dashboard.dto");
const base_controller_1 = require("./base.controller");
let DashboardController = class DashboardController extends base_controller_1.BaseController {
    async getAdminMetrics(query) {
        try {
            const stats = await this.dashboardService.getDashboardStats(query);
            return this.handleSuccess(stats, 'Dashboard statistics retrieved successfully');
        }
        catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
                data: null
            };
        }
    }
    constructor(dashboardService, pdfService) {
        super();
        this.dashboardService = dashboardService;
        this.pdfService = pdfService;
    }
    async getDashboardStats(query) {
        try {
            const stats = await this.dashboardService.getDashboardStats(query);
            return {
                success: true,
                data: stats,
                message: 'Dashboard statistics retrieved successfully',
                isRealTime: true
            };
        }
        catch (error) {
            console.error('Dashboard stats error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
                data: null,
                isRealTime: false
            };
        }
    }
    async getRecentActivities(query) {
        try {
            const { limit } = query;
            const activities = await this.dashboardService.getActivities(limit ? parseInt(limit.toString()) : 20);
            return {
                success: true,
                data: activities,
                message: 'Recent activities retrieved successfully',
                isRealTime: true
            };
        }
        catch (error) {
            console.error('Activities fetch error:', error);
            return {
                success: false,
                message: `Failed to fetch recent activities: ${error instanceof Error ? error.message : 'Unknown error'}`,
                data: [],
                isRealTime: false
            };
        }
    }
    async exportDashboardPDF(res) {
        try {
            const stats = await this.dashboardService.getDashboardStats({});
            await this.pdfService.generateDashboardReport(stats, res);
        }
        catch (error) {
            console.error('PDF export error:', error);
            res.status(500).json({
                success: false,
                message: `Failed to generate PDF report: ${error instanceof Error ? error.message : 'Unknown error'}`,
                data: null,
            });
        }
    }
    async getTopStats() {
        try {
            const topStats = await this.dashboardService.getTopStats();
            return this.handleSuccess(topStats, 'Top statistics retrieved successfully');
        }
        catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
                data: null
            };
        }
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('/admin/metrics'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_dto_1.AdminStatsQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAdminMetrics", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_dto_1.AdminStatsQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('activities'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentActivities", null);
__decorate([
    (0, common_1.Get)('export-pdf'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "exportDashboardPDF", null);
__decorate([
    (0, common_1.Get)('top-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTopStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService,
        pdf_service_1.PdfService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map