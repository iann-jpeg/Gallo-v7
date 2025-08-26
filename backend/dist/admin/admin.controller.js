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
const admin_service_1 = require("../services/admin.service");
const admin_guard_1 = require("./admin.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getDashboard() {
        return this.adminService.getDashboardData();
    }
    async getDashboardStats() {
        return this.adminService.getDashboardData();
    }
    async getComprehensiveDashboardStats() {
        return this.adminService.getComprehensiveDashboardStats();
    }
    async getSystemHealth() {
        return this.adminService.getSystemHealth();
    }
    async getRecentActivities(limit) {
        const limitNum = limit ? parseInt(limit, 10) : 20;
        return this.adminService.getRecentActivities(limitNum);
    }
    async getAllUsers(page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllUsers(pageNum, limitNum);
    }
    async getUserStats() {
        return this.adminService.getUserStats();
    }
    async updateUserStatus(id, status) {
        return this.adminService.updateUserStatus(id, status);
    }
    async deleteUser(id) {
        return this.adminService.deleteUser(id);
    }
    async getAllClaims(page, limit, status, search) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllClaims(pageNum, limitNum, status, search);
    }
    async getClaimById(id) {
        return this.adminService.getClaimById(id);
    }
    async getClaimsStats() {
        return this.adminService.getClaimsStats();
    }
    async updateClaimStatus(id, status) {
        return this.adminService.updateClaimStatus(id, status);
    }
    async downloadDocument(id, res) {
        return this.adminService.downloadDocumentById(id, res);
    }
    async getAllConsultations(page, limit, status, search) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllConsultations(pageNum, limitNum, status, search);
    }
    async getConsultationById(id) {
        return this.adminService.getConsultationById(id);
    }
    async updateConsultationStatus(id, status) {
        return this.adminService.updateConsultationStatus(id, status);
    }
    async scheduleMeeting(id, meetingData) {
        return this.adminService.scheduleMeeting(id, meetingData);
    }
    async sendWhatsAppMeetingDetails(id, data) {
        return this.adminService.sendWhatsAppMeetingDetails(id, data);
    }
    async getAllQuotes(page, limit, status, search) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllQuotes(pageNum, limitNum, status, search);
    }
    async getQuoteById(id) {
        return this.adminService.getQuoteById(id);
    }
    async updateQuoteStatus(id, status) {
        return this.adminService.updateQuoteStatus(id, status);
    }
    async getAllDiasporaRequests(page, limit, status, search) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllDiasporaRequests(pageNum, limitNum, status, search);
    }
    async getDiasporaRequestById(id) {
        return this.adminService.getDiasporaRequestById(id);
    }
    async updateDiasporaRequestStatus(id, status) {
        return this.adminService.updateDiasporaRequestStatus(id, status);
    }
    async getAllPayments(page, limit, search) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllPayments(pageNum, limitNum, search);
    }
    async getPaymentStats() {
        return this.adminService.getPaymentStats();
    }
    async getNotifications() {
        return this.adminService.getNotifications();
    }
    async getContentStats() {
        return this.adminService.getContentStats();
    }
    async getAnalytics(period) {
        return this.adminService.getAnalytics(period || '30d');
    }
    async getAllOutsourcingRequests(page, limit, status, search) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 50;
        return this.adminService.getAllOutsourcingRequests(pageNum, limitNum, status, search);
    }
    async getOutsourcingRequestById(id) {
        return this.adminService.getOutsourcingRequestById(id);
    }
    async updateOutsourcingRequestStatus(id, status, notes) {
        return this.adminService.updateOutsourcingRequestStatus(id, status, notes);
    }
    async getOutsourcingStats() {
        return this.adminService.getOutsourcingStats();
    }
    async deleteOutsourcingRequest(id) {
        return this.adminService.deleteOutsourcingRequest(id);
    }
    async exportOutsourcingData(format = 'csv') {
        return this.adminService.exportOutsourcingData(format);
    }
    async getSystemSettings() {
        return this.adminService.getSystemSettings();
    }
    async updateSystemSettings(settings) {
        return this.adminService.updateSystemSettings(settings);
    }
    async testEmailSettings(email) {
        return this.adminService.testEmailSettings(email);
    }
    async testNotifications() {
        return this.adminService.testNotifications();
    }
    async createBackup() {
        return this.adminService.createSystemBackup();
    }
    async restoreBackup(backupId) {
        return this.adminService.restoreSystemBackup(backupId);
    }
    async listBackups() {
        return this.adminService.listBackups();
    }
    async clearSystemCache() {
        return this.adminService.clearSystemCache();
    }
    async restartServices() {
        return this.adminService.restartServices();
    }
    async getSystemStatus() {
        return this.adminService.getSystemStatus();
    }
    async setMaintenanceMode(enabled) {
        return this.adminService.setMaintenanceMode(enabled);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('dashboard/comprehensive'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getComprehensiveDashboardStats", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSystemHealth", null);
__decorate([
    (0, common_1.Get)('activities'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRecentActivities", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('users/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Put)('users/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('claims'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllClaims", null);
__decorate([
    (0, common_1.Get)('claims/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getClaimById", null);
__decorate([
    (0, common_1.Get)('claims/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getClaimsStats", null);
__decorate([
    (0, common_1.Put)('claims/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateClaimStatus", null);
__decorate([
    (0, common_1.Get)('documents/:id/download'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "downloadDocument", null);
__decorate([
    (0, common_1.Get)('consultations'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllConsultations", null);
__decorate([
    (0, common_1.Get)('consultations/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getConsultationById", null);
__decorate([
    (0, common_1.Put)('consultations/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateConsultationStatus", null);
__decorate([
    (0, common_1.Post)('consultations/:id/schedule-meeting'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "scheduleMeeting", null);
__decorate([
    (0, common_1.Post)('consultations/:id/send-whatsapp-details'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendWhatsAppMeetingDetails", null);
__decorate([
    (0, common_1.Get)('quotes'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllQuotes", null);
__decorate([
    (0, common_1.Get)('quotes/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getQuoteById", null);
__decorate([
    (0, common_1.Put)('quotes/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateQuoteStatus", null);
__decorate([
    (0, common_1.Get)('diaspora'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllDiasporaRequests", null);
__decorate([
    (0, common_1.Get)('diaspora/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDiasporaRequestById", null);
__decorate([
    (0, common_1.Put)('diaspora/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateDiasporaRequestStatus", null);
__decorate([
    (0, common_1.Get)('payments'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('payments/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPaymentStats", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('content/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getContentStats", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('outsourcing'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllOutsourcingRequests", null);
__decorate([
    (0, common_1.Get)('outsourcing/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOutsourcingRequestById", null);
__decorate([
    (0, common_1.Put)('outsourcing/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOutsourcingRequestStatus", null);
__decorate([
    (0, common_1.Get)('outsourcing/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOutsourcingStats", null);
__decorate([
    (0, common_1.Delete)('outsourcing/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteOutsourcingRequest", null);
__decorate([
    (0, common_1.Get)('outsourcing/export'),
    __param(0, (0, common_1.Query)('format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "exportOutsourcingData", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSystemSettings", null);
__decorate([
    (0, common_1.Put)('settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateSystemSettings", null);
__decorate([
    (0, common_1.Post)('settings/test-email'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "testEmailSettings", null);
__decorate([
    (0, common_1.Post)('settings/test-notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "testNotifications", null);
__decorate([
    (0, common_1.Post)('backup/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createBackup", null);
__decorate([
    (0, common_1.Post)('backup/restore'),
    __param(0, (0, common_1.Body)('backupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "restoreBackup", null);
__decorate([
    (0, common_1.Get)('backup/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listBackups", null);
__decorate([
    (0, common_1.Post)('system/clear-cache'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "clearSystemCache", null);
__decorate([
    (0, common_1.Post)('system/restart-services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "restartServices", null);
__decorate([
    (0, common_1.Get)('system/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSystemStatus", null);
__decorate([
    (0, common_1.Put)('system/maintenance'),
    __param(0, (0, common_1.Body)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "setMaintenanceMode", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map