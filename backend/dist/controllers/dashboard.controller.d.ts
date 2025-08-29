import { DashboardService } from '../services/dashboard.service';
import { PdfService } from '../services/pdf.service';
import { AdminStatsQueryDto } from '../config/dashboard.dto';
import { BaseController } from './base.controller';
import { Response } from 'express';
export declare class DashboardController extends BaseController {
    private readonly dashboardService;
    private readonly pdfService;
    getAdminMetrics(query: AdminStatsQueryDto): Promise<{
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    } | {
        success: boolean;
        message: string;
        data: null;
    }>;
    constructor(dashboardService: DashboardService, pdfService: PdfService);
    getDashboardStats(query: AdminStatsQueryDto): Promise<{
        success: boolean;
        data: {
            totalClaims: number;
            totalQuotes: number;
            totalConsultations: number;
            totalOutsourcingRequests: number;
            totalPayments: number;
            totalDiasporaRequests: number;
            totalUsers: number;
            pendingClaims: number;
            activePolicies: number;
            monthlyRevenue: number;
            conversionRate: number;
            allSubmissions: {
                claims: ({
                    document: {
                        path: string;
                        filename: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        originalName: string;
                        mimeType: string;
                        size: number;
                        claimId: number | null;
                        quoteId: number | null;
                        outsourcingId: number | null;
                        content: Uint8Array | null;
                    }[];
                } & {
                    description: string;
                    status: string;
                    id: number;
                    userId: number | null;
                    policyNumber: string;
                    claimType: string;
                    incidentDate: Date;
                    estimatedLoss: number;
                    createdAt: Date;
                    updatedAt: Date;
                    submitterEmail: string | null;
                    submitterName: string | null;
                    submitterPhone: string | null;
                })[];
                outsourcing: {
                    description: string;
                    status: string;
                    id: number;
                    userId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string | null;
                    category: string;
                    budget: number | null;
                    title: string;
                    organizationName: string | null;
                    services: string[];
                    timeline: string | null;
                }[];
                consultations: {
                    name: string;
                    status: string;
                    id: number;
                    userId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    phone: string;
                    country: string | null;
                    timezone: string | null;
                    serviceInterest: string;
                    serviceType: string | null;
                    scheduledAt: Date | null;
                    consultationDate: Date | null;
                    meetingLink: string | null;
                    duration: number | null;
                    notes: string | null;
                }[];
                payments: {
                    method: string | null;
                    description: string | null;
                    status: string;
                    id: number;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                    userId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    claimId: number | null;
                    quoteId: number | null;
                    amount: number;
                    currency: string;
                    reference: string | null;
                    transactionId: string | null;
                    paymentMethod: string | null;
                    clientName: string | null;
                }[];
                diaspora: {
                    name: string;
                    status: string;
                    id: number;
                    userId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    phone: string;
                    country: string;
                    timezone: string;
                    serviceInterest: string;
                    scheduledAt: Date | null;
                }[];
            };
            totalSubmissions: number;
            submissionsThisMonth: number;
        };
        message: string;
        isRealTime: boolean;
    } | {
        success: boolean;
        message: string;
        data: null;
        isRealTime: boolean;
    }>;
    getRecentActivities(query: any): Promise<{
        success: boolean;
        data: any[];
        message: string;
        isRealTime: boolean;
    }>;
    exportDashboardPDF(res: Response): Promise<void>;
    getTopStats(): Promise<{
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    } | {
        success: boolean;
        message: string;
        data: null;
    }>;
}
