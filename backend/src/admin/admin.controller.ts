import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AdminGuard } from './admin.guard';
import { Public } from '../middleware/public.decorator';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ============= DASHBOARD =============
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardData();
  }

  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.adminService.getDashboardData();
  }

  @Get('dashboard/comprehensive')
  async getComprehensiveDashboardStats() {
    return this.adminService.getComprehensiveDashboardStats();
  }

  // ============= SYSTEM HEALTH =============
  @Get('health')
  async getSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  @Get('activities')
  async getRecentActivities(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.adminService.getRecentActivities(limitNum);
  }

  // ============= USER MANAGEMENT =============
  @Get('users')
  async getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllUsers(pageNum, limitNum);
  }

  @Get('users/stats')
  async getUserStats() {
    return this.adminService.getUserStats();
  }

  @Put('users/:id/status')
  async updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string
  ) {
    return this.adminService.updateUserStatus(id, status);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  // ============= CLAIMS MANAGEMENT =============
  @Get('claims')
  async getAllClaims(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllClaims(pageNum, limitNum, status, search);
  }

  @Get('claims/:id')
  async getClaimById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getClaimById(id);
  }

  @Get('claims/stats')
  async getClaimsStats() {
    return this.adminService.getClaimsStats();
  }

  @Put('claims/:id/status')
  async updateClaimStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string
  ) {
    return this.adminService.updateClaimStatus(id, status);
  }

  // ============= DOCUMENTS MANAGEMENT =============
  @Get('documents/:id/download')
  async downloadDocument(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return this.adminService.downloadDocumentById(id, res);
  }

  // ============= CONSULTATIONS MANAGEMENT =============
  @Get('consultations')
  async getAllConsultations(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllConsultations(pageNum, limitNum, status, search);
  }

  @Get('consultations/:id')
  async getConsultationById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getConsultationById(id);
  }

  @Put('consultations/:id/status')
  async updateConsultationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string
  ) {
    return this.adminService.updateConsultationStatus(id, status);
  }

  @Post('consultations/:id/schedule-meeting')
  async scheduleMeeting(
    @Param('id', ParseIntPipe) id: number,
    @Body() meetingData: {
      meetingDate: string;
      meetingTime: string;
      meetingType: string;
      meetingLink?: string;
      duration: number;
      notes?: string;
    }
  ) {
    return this.adminService.scheduleMeeting(id, meetingData);
  }

  @Post('consultations/:id/send-whatsapp-details')
  async sendWhatsAppMeetingDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: {
      message?: string;
      includeLink?: boolean;
    }
  ) {
    return this.adminService.sendWhatsAppMeetingDetails(id, data);
  }

  // ============= QUOTES MANAGEMENT =============
  @Get('quotes')
  async getAllQuotes(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllQuotes(pageNum, limitNum, status, search);
  }

  @Get('quotes/:id')
  async getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getQuoteById(id);
  }

  @Put('quotes/:id/status')
  async updateQuoteStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string
  ) {
    return this.adminService.updateQuoteStatus(id, status);
  }

  // ============= DIASPORA MANAGEMENT =============
  @Get('diaspora')
  async getAllDiasporaRequests(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllDiasporaRequests(pageNum, limitNum, status, search);
  }

  @Get('diaspora/:id')
  async getDiasporaRequestById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getDiasporaRequestById(id);
  }

  @Put('diaspora/:id/status')
  async updateDiasporaRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string
  ) {
    return this.adminService.updateDiasporaRequestStatus(id, status);
  }

  // ============= PAYMENTS MANAGEMENT =============
  @Get('payments')
  async getAllPayments(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllPayments(pageNum, limitNum, search);
  }

  @Get('payments/stats')
  async getPaymentStats() {
    return this.adminService.getPaymentStats();
  }

  // ============= NOTIFICATIONS =============
  @Get('notifications')
  async getNotifications() {
    return this.adminService.getNotifications();
  }

  // ============= CONTENT STATS =============
  @Get('content/stats')
  async getContentStats() {
    return this.adminService.getContentStats();
  }

  // ============= ANALYTICS =============
  @Get('analytics')
  async getAnalytics(@Query('period') period?: string) {
    return this.adminService.getAnalytics(period || '30d');
  }

  // ============= OUTSOURCING MANAGEMENT =============
  @Get('outsourcing')
  async getAllOutsourcingRequests(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.adminService.getAllOutsourcingRequests(pageNum, limitNum, status, search);
  }

  @Get('outsourcing/:id')
  async getOutsourcingRequestById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getOutsourcingRequestById(id);
  }

  @Put('outsourcing/:id/status')
  async updateOutsourcingRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
    @Body('notes') notes?: string
  ) {
    return this.adminService.updateOutsourcingRequestStatus(id, status, notes);
  }

  @Get('outsourcing/stats')
  async getOutsourcingStats() {
    return this.adminService.getOutsourcingStats();
  }

  @Delete('outsourcing/:id')
  async deleteOutsourcingRequest(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteOutsourcingRequest(id);
  }

  @Get('outsourcing/export')
  async exportOutsourcingData(@Query('format') format: 'csv' | 'json' = 'csv') {
    return this.adminService.exportOutsourcingData(format);
  }

  // ============= SYSTEM SETTINGS =============
  @Get('settings')
  async getSystemSettings() {
    return this.adminService.getSystemSettings();
  }

  @Put('settings')
  async updateSystemSettings(@Body() settings: any) {
    return this.adminService.updateSystemSettings(settings);
  }

  @Post('settings/test-email')
  async testEmailSettings(@Body('email') email?: string) {
    return this.adminService.testEmailSettings(email);
  }

  @Post('settings/test-notifications')
  async testNotifications() {
    return this.adminService.testNotifications();
  }

  // ============= BACKUP & MAINTENANCE =============
  @Post('backup/create')
  async createBackup() {
    return this.adminService.createSystemBackup();
  }

  @Post('backup/restore')
  async restoreBackup(@Body('backupId') backupId: string) {
    return this.adminService.restoreSystemBackup(backupId);
  }

  @Get('backup/list')
  async listBackups() {
    return this.adminService.listBackups();
  }

  @Post('system/clear-cache')
  async clearSystemCache() {
    return this.adminService.clearSystemCache();
  }

  @Post('system/restart-services')
  async restartServices() {
    return this.adminService.restartServices();
  }

  @Get('system/status')
  async getSystemStatus() {
    return this.adminService.getSystemStatus();
  }

  @Put('system/maintenance')
  async setMaintenanceMode(@Body('enabled') enabled: boolean) {
    return this.adminService.setMaintenanceMode(enabled);
  }
}
