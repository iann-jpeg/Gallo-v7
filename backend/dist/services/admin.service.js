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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    async getClaimById(id) {
        try {
            const claim = await this.prisma.claim.findUnique({
                where: { id },
                include: {
                    user: { select: { name: true, email: true } },
                    documents: true
                }
            });
            if (!claim) {
                return { success: false, error: 'Claim not found' };
            }
            return { success: true, data: claim };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    async deleteClaim(id) {
        try {
            await this.prisma.claim.delete({ where: { id } });
            return { success: true, data: null, message: 'Claim deleted successfully' };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    async exportClaimsData(format) {
        try {
            const claims = await this.prisma.claim.findMany();
            if (format === 'json') {
                return { success: true, data: claims, message: 'Claims exported as JSON' };
            }
            const csv = [
                Object.keys(claims[0] || {}).join(','),
                ...claims.map(c => Object.values(c).join(','))
            ].join('\n');
            return { success: true, data: csv, message: 'Claims exported as CSV' };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getQuoteById(id) {
        try {
            const quote = await this.prisma.quote.findUnique({
                where: { id },
                include: {
                    user: { select: { name: true, email: true } },
                    documents: true
                }
            });
            if (!quote) {
                return { success: false, error: 'Quote not found' };
            }
            return { success: true, data: quote };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    async deleteQuote(id) {
        try {
            await this.prisma.quote.delete({ where: { id } });
            return { success: true, data: null, message: 'Quote deleted successfully' };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    async exportQuotesData(format) {
        try {
            const quotes = await this.prisma.quote.findMany();
            if (format === 'json') {
                return { success: true, data: quotes, message: 'Quotes exported as JSON' };
            }
            const csv = [
                Object.keys(quotes[0] || {}).join(','),
                ...quotes.map(q => Object.values(q).join(','))
            ].join('\n');
            return { success: true, data: csv, message: 'Quotes exported as CSV' };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    async getDashboardData() {
        return this.getDashboardStats();
    }
    async getSystemHealth() {
        try {
            await this.prisma.user.count();
            return { healthy: true, message: 'System is healthy' };
        }
        catch (error) {
            return { healthy: false, message: error.message || 'System error' };
        }
    }
    async getDashboardStats() {
        try {
            const [totalUsers, totalClaims, totalQuotes, totalConsultations, totalOutsourcingRequests, totalDiasporaRequests, pendingClaims, pendingConsultations] = await Promise.all([
                this.prisma.user.count(),
                this.prisma.claim.count(),
                this.prisma.quote.count(),
                this.prisma.consultation.count(),
                this.prisma.outsourcingRequest.count(),
                this.prisma.diasporaRequest.count(),
                this.prisma.claim.count({ where: { status: 'pending' } }),
                this.prisma.consultation.count({ where: { status: 'pending' } })
            ]);
            return {
                success: true,
                data: {
                    totalUsers,
                    totalClaims,
                    totalQuotes,
                    totalConsultations,
                    totalOutsourcingRequests,
                    totalDiasporaRequests,
                    pendingClaims,
                    pendingConsultations
                },
                message: 'Dashboard stats retrieved successfully'
            };
        }
        catch (error) {
            console.error('Dashboard stats error:', error);
            return {
                success: false,
                message: 'Failed to fetch dashboard stats',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getAllUsers(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [users, total] = await Promise.all([
                this.prisma.user.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }),
                this.prisma.user.count()
            ]);
            return {
                success: true,
                data: {
                    users,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit)
                    }
                },
                message: 'Users retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get users error:', error);
            return {
                success: false,
                message: 'Failed to retrieve users',
                error: error.message || 'Unknown error'
            };
        }
    }
    async updateUserStatus(userId, status) {
        try {
            const user = await this.prisma.user.update({
                where: { id: userId },
                data: { role: status }
            });
            return {
                success: true,
                data: user,
                message: 'User status updated successfully'
            };
        }
        catch (error) {
            console.error('Update user status error:', error);
            return {
                success: false,
                message: 'Failed to update user status',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getAllClaims(page = 1, limit = 10, status, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (status)
                where.status = status;
            if (search) {
                where.OR = [
                    { description: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                    { policyNumber: { contains: search, mode: 'insensitive' } }
                ];
            }
            const [claims, total] = await Promise.all([
                this.prisma.claim.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    where,
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }),
                this.prisma.claim.count({ where })
            ]);
            return {
                success: true,
                data: {
                    claims,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit)
                    }
                },
                message: 'Claims retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get claims error:', error);
            return {
                success: false,
                message: 'Failed to retrieve claims',
                error: error.message || 'Unknown error'
            };
        }
    }
    async updateClaimStatus(claimId, status, adminId) {
        try {
            const claim = await this.prisma.claim.update({
                where: { id: claimId },
                data: { status }
            });
            return {
                success: true,
                data: claim,
                message: 'Claim status updated successfully'
            };
        }
        catch (error) {
            console.error('Update claim status error:', error);
            return {
                success: false,
                message: 'Failed to update claim status',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getAllConsultations(page = 1, limit = 10, status, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (status)
                where.status = status;
            if (search) {
                where.OR = [
                    { description: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                    { name: { contains: search, mode: 'insensitive' } }
                ];
            }
            const [consultations, total] = await Promise.all([
                this.prisma.consultation.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    where
                }),
                this.prisma.consultation.count({ where })
            ]);
            return {
                success: true,
                data: {
                    consultations,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit)
                    }
                },
                message: 'Consultations retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get consultations error:', error);
            return {
                success: false,
                message: 'Failed to retrieve consultations',
                error: error.message || 'Unknown error'
            };
        }
    }
    async updateConsultationStatus(consultationId, status, adminId) {
        try {
            const consultation = await this.prisma.consultation.update({
                where: { id: consultationId },
                data: { status }
            });
            return {
                success: true,
                data: consultation,
                message: 'Consultation status updated successfully'
            };
        }
        catch (error) {
            console.error('Update consultation status error:', error);
            return {
                success: false,
                message: 'Failed to update consultation status',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getAllQuotes(page = 1, limit = 10, status, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (status)
                where.status = status;
            if (search) {
                where.OR = [
                    { product: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } }
                ];
            }
            const [quotes, total] = await Promise.all([
                this.prisma.quote.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    where,
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        },
                        documents: true
                    }
                }),
                this.prisma.quote.count({ where })
            ]);
            return {
                success: true,
                data: {
                    quotes,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit)
                    }
                },
                message: 'Quotes retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get quotes error:', error);
            return {
                success: false,
                message: 'Failed to retrieve quotes',
                error: error.message || 'Unknown error'
            };
        }
    }
    async updateQuoteStatus(quoteId, status, adminId) {
        try {
            const quote = await this.prisma.quote.update({
                where: { id: quoteId },
                data: { status }
            });
            return {
                success: true,
                data: quote,
                message: 'Quote status updated successfully'
            };
        }
        catch (error) {
            console.error('Update quote status error:', error);
            return {
                success: false,
                message: 'Failed to update quote status',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getAllOutsourcingRequests(page = 1, limit = 10, status, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (status)
                where.status = status;
            if (search) {
                where.OR = [
                    { organizationName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { services: { contains: search, mode: 'insensitive' } }
                ];
            }
            const [requests, total] = await Promise.all([
                this.prisma.outsourcingRequest.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    where,
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }),
                this.prisma.outsourcingRequest.count({ where })
            ]);
            return {
                success: true,
                data: {
                    requests,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit)
                    }
                },
                message: 'Outsourcing requests retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get outsourcing requests error:', error);
            return {
                success: false,
                message: 'Failed to retrieve outsourcing requests',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getOutsourcingStats() {
        try {
            const total = await this.prisma.outsourcingRequest.count();
            const breakdown = await Promise.all([
                this.prisma.outsourcingRequest.count({ where: { status: 'pending' } }),
                this.prisma.outsourcingRequest.count({ where: { status: 'in_progress' } }),
                this.prisma.outsourcingRequest.count({ where: { status: 'completed' } }),
                this.prisma.outsourcingRequest.count({ where: { status: 'rejected' } })
            ]);
            return {
                success: true,
                data: {
                    total,
                    pending: breakdown[0] || 0,
                    inProgress: breakdown[1] || 0,
                    completed: breakdown[2] || 0,
                    rejected: breakdown[3] || 0
                },
                message: 'Outsourcing stats retrieved successfully'
            };
        }
        catch (error) {
            console.error('Outsourcing stats error:', error);
            return { success: false, message: 'Failed to fetch outsourcing stats', error: error.message || 'Unknown error' };
        }
    }
    async updateOutsourcingRequestStatus(requestId, status, notes, adminId) {
        try {
            const request = await this.prisma.outsourcingRequest.update({
                where: { id: requestId },
                data: Object.assign({ status }, (typeof notes === 'string' ? { natureOfOutsourcing: notes } : {}))
            });
            return {
                success: true,
                data: request,
                message: 'Outsourcing request status updated successfully'
            };
        }
        catch (error) {
            console.error('Update outsourcing request status error:', error);
            return {
                success: false,
                message: 'Failed to update outsourcing request status',
                error: error.message || 'Unknown error'
            };
        }
    }
    async getComprehensiveDashboardStats() {
        return this.getDashboardStats();
    }
    async getRecentActivities(limit = 20) {
        try {
            const [claims, outsourcing, consultations, payments, diaspora, quotes] = await Promise.all([
                this.prisma.claim.findMany({ take: limit, orderBy: { createdAt: 'desc' } }),
                this.prisma.outsourcingRequest.findMany({ take: limit, orderBy: { createdAt: 'desc' } }),
                this.prisma.consultation.findMany({ take: limit, orderBy: { createdAt: 'desc' } }),
                this.prisma.payment.findMany({ take: limit, orderBy: { createdAt: 'desc' } }),
                this.prisma.diasporaRequest.findMany({ take: limit, orderBy: { createdAt: 'desc' } }),
                this.prisma.quote.findMany({ take: limit, orderBy: { createdAt: 'desc' } })
            ]);
            const mapItem = (item, type) => ({ id: String(item.id), type, createdAt: item.createdAt, raw: item });
            const activities = [
                ...claims.map(c => mapItem(c, 'claim')),
                ...outsourcing.map(o => mapItem(o, 'outsourcing')),
                ...consultations.map(c => mapItem(c, 'consultation')),
                ...payments.map(p => mapItem(p, 'payment')),
                ...diaspora.map(d => mapItem(d, 'diaspora')),
                ...quotes.map(q => mapItem(q, 'quote'))
            ].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, limit);
            return { success: true, data: { activities }, message: 'Recent activities retrieved' };
        }
        catch (error) {
            console.error('Get recent activities error:', error);
            return { success: false, message: 'Failed to fetch activities', error: error.message || 'Unknown error' };
        }
    }
    async scheduleConsultationMeeting(id, meetingData) {
        return this.scheduleMeeting(id, meetingData);
    }
    async getUserStats() {
        try {
            const total = await this.prisma.user.count();
            return { success: true, data: { total }, message: 'User stats retrieved' };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch user stats', error: error.message || 'Unknown error' };
        }
    }
    async deleteUser(id) {
        try {
            await this.prisma.user.delete({ where: { id } });
            return { success: true, data: null, message: 'User deleted' };
        }
        catch (error) {
            return { success: false, message: 'Failed to delete user', error: error.message || 'Unknown error' };
        }
    }
    async getClaimsStats() {
        try {
            const total = await this.prisma.claim.count();
            const pending = await this.prisma.claim.count({ where: { status: 'pending' } });
            const approved = await this.prisma.claim.count({ where: { status: 'approved' } });
            const rejected = await this.prisma.claim.count({ where: { status: 'rejected' } });
            return { success: true, data: { total, pending, approved, rejected } };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch claim stats', error: error.message || 'Unknown error' };
        }
    }
    async downloadDocumentById(id, res) {
        try {
            const doc = await this.prisma.document.findUnique({ where: { id } });
            if (!doc)
                return res.status(404).send('Document not found');
            if (!doc.path)
                return res.status(404).send('File not found');
            return res.download(doc.path, doc.originalName || doc.filename);
        }
        catch (error) {
            console.error('Download document error:', error);
            return res.status(500).send('Download failed');
        }
    }
    async getConsultationById(id) {
        try {
            const consultation = await this.prisma.consultation.findUnique({ where: { id } });
            if (!consultation)
                return { success: false, error: 'Consultation not found' };
            return { success: true, data: consultation };
        }
        catch (error) {
            return { success: false, error: error.message || 'Unknown error' };
        }
    }
    async scheduleMeeting(id, meetingData) {
        var _a, _b;
        try {
            const updated = await this.prisma.consultation.update({ where: { id }, data: { meetingLink: meetingData.meetingLink || null, scheduledAt: meetingData.meetingDate ? new Date(meetingData.meetingDate) : undefined, duration: (_a = meetingData.duration) !== null && _a !== void 0 ? _a : undefined, notes: (_b = meetingData.notes) !== null && _b !== void 0 ? _b : undefined } });
            return { success: true, data: updated, message: 'Meeting scheduled' };
        }
        catch (error) {
            return { success: false, message: 'Failed to schedule meeting', error: error.message || 'Unknown error' };
        }
    }
    async sendWhatsAppMeetingDetails(id, data) {
        return { success: true, data: null, message: 'WhatsApp details queued' };
    }
    async getAllPayments(page = 1, limit = 10, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (search) {
                where.OR = [{ reference: { contains: search } }, { transactionId: { contains: search } }, { description: { contains: search } }];
            }
            const [payments, total] = await Promise.all([
                this.prisma.payment.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' }, where }),
                this.prisma.payment.count({ where })
            ]);
            return { success: true, data: { payments, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch payments', error: error.message || 'Unknown error' };
        }
    }
    async getPaymentStats() {
        try {
            const total = await this.prisma.payment.count();
            const pending = await this.prisma.payment.count({ where: { status: 'pending' } });
            const completed = await this.prisma.payment.count({ where: { status: 'completed' } });
            return { success: true, data: { total, pending, completed } };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch payment stats', error: error.message || 'Unknown error' };
        }
    }
    async updatePaymentStatus(id, status) {
        try {
            const payment = await this.prisma.payment.update({ where: { id }, data: { status } });
            return { success: true, data: payment };
        }
        catch (error) {
            return { success: false, message: 'Failed to update payment', error: error.message || 'Unknown error' };
        }
    }
    async getNotifications(limit = 50) {
        const notifications = [];
        return { success: true, data: { notifications }, message: 'Notifications retrieved' };
    }
    async createNotification(note) {
        return { success: true, data: note, message: 'Notification created (placeholder)' };
    }
    async markNotificationAsRead(id) {
        return { success: true, data: null, message: 'Marked read (placeholder)' };
    }
    async deleteNotification(id) {
        return { success: true, data: null, message: 'Notification deleted (placeholder)' };
    }
    async getContentStats() {
        try {
            const resources = await this.prisma.resource.count();
            return { success: true, data: { resources } };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch content stats', error: error.message || 'Unknown error' };
        }
    }
    async getAnalytics(period = '30d') {
        return { success: true, data: { period, metrics: {} }, message: 'Analytics retrieved' };
    }
    async getOutsourcingRequestById(id) {
        try {
            const r = await this.prisma.outsourcingRequest.findUnique({ where: { id }, include: { documents: true, user: true } });
            if (!r)
                return { success: false, error: 'Not found' };
            return { success: true, data: r };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch request', error: error.message || 'Unknown error' };
        }
    }
    async deleteOutsourcingRequest(id) {
        try {
            await this.prisma.outsourcingRequest.delete({ where: { id } });
            return { success: true, data: null, message: 'Deleted' };
        }
        catch (error) {
            return { success: false, message: 'Failed to delete', error: error.message || 'Unknown error' };
        }
    }
    async exportOutsourcingData(format) {
        try {
            const data = await this.prisma.outsourcingRequest.findMany();
            if (format === 'json')
                return { success: true, data };
            const csv = [Object.keys(data[0] || {}).join(','), ...data.map((r) => Object.values(r).join(','))].join('\n');
            return { success: true, data: csv };
        }
        catch (error) {
            return { success: false, message: 'Export failed', error: error.message || 'Unknown error' };
        }
    }
    async getSystemSettings() { return { success: true, data: {} }; }
    async updateSystemSettings(settings) { return { success: true, data: settings }; }
    async testEmailSettings(email) { return { success: true, data: null, message: 'Test email sent (placeholder)' }; }
    async testNotifications() { return { success: true, data: null, message: 'Test notification sent (placeholder)' }; }
    async createSystemBackup() { return { success: true, data: null, message: 'Backup created (placeholder)' }; }
    async restoreSystemBackup(backupId) { return { success: true, data: null, message: 'Restore started (placeholder)' }; }
    async listBackups() { return { success: true, data: [] }; }
    async clearSystemCache() { return { success: true, data: null, message: 'Cache cleared (placeholder)' }; }
    async restartServices() { return { success: true, data: null, message: 'Services restarted (placeholder)' }; }
    async getSystemStatus() { return { success: true, data: { healthy: true } }; }
    async setMaintenanceMode(enabled) { return { success: true, data: { maintenance: enabled } }; }
    async getActivities(limit = 50) { return this.getRecentActivities(limit); }
    async getDiasporaRequestById(id) {
        try {
            const r = await this.prisma.diasporaRequest.findUnique({ where: { id }, include: { user: true } });
            if (!r)
                return { success: false, error: 'Not found', message: 'Diaspora request not found' };
            return { success: true, data: { diasporaRequest: r }, message: 'Diaspora request retrieved' };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch diaspora request', error: error.message || 'Unknown error' };
        }
    }
    async getAllDiasporaRequests(page = 1, limit = 10, status, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (status)
                where.status = status;
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                    { country: { contains: search, mode: 'insensitive' } },
                    { serviceInterest: { contains: search, mode: 'insensitive' } }
                ];
            }
            const [diasporaRequests, total] = await Promise.all([
                this.prisma.diasporaRequest.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    where,
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }),
                this.prisma.diasporaRequest.count({ where })
            ]);
            return {
                success: true,
                data: {
                    diasporaRequests: diasporaRequests || [],
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages: Math.ceil(total / limit)
                    }
                },
                message: 'Diaspora requests retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get diaspora requests error:', error);
            return {
                success: false,
                data: {
                    diasporaRequests: [],
                    pagination: { page, limit, total: 0, totalPages: 1 }
                },
                message: 'Failed to retrieve diaspora requests',
                error: error.message || 'Unknown error'
            };
        }
    }
    async updateDiasporaRequestStatus(requestId, status, adminId) {
        try {
            const request = await this.prisma.diasporaRequest.update({
                where: { id: requestId },
                data: { status }
            });
            return {
                success: true,
                data: request,
                message: 'Diaspora request status updated successfully'
            };
        }
        catch (error) {
            console.error('Update diaspora request status error:', error);
            return {
                success: false,
                message: 'Failed to update diaspora request status',
                error: error.message || 'Unknown error'
            };
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map