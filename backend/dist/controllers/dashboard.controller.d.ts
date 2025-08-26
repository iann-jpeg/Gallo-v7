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
                    documents: {
                        createdAt: Date;
                        id: number;
                        updatedAt: Date;
                        filename: string;
                        originalName: string;
                        mimeType: string;
                        size: number;
                        path: string;
                        claimId: number | null;
                        quoteId: number | null;
                        content: Uint8Array | null;
                        outsourcingId: number | null;
                    }[];
                } & {
                    createdAt: Date;
                    status: string;
                    id: number;
                    userId: number | null;
                    policyNumber: string;
                    claimType: string;
                    incidentDate: Date;
                    estimatedLoss: number;
                    description: string;
                    updatedAt: Date;
                    submitterEmail: string | null;
                    submitterName: string | null;
                    submitterPhone: string | null;
                })[];
                outsourcing: {
                    createdAt: Date;
                    status: string;
                    id: number;
                    userId: number | null;
                    updatedAt: Date;
                    organizationName: string;
                    coreFunctions: string | null;
                    location: string;
                    address: string | null;
                    email: string;
                    services: string[];
                    natureOfOutsourcing: string;
                    budgetRange: string;
                }[];
                consultations: {
                    createdAt: Date;
                    status: string;
                    id: number;
                    userId: number | null;
                    updatedAt: Date;
                    name: string;
                    email: string;
                    phone: string;
                    country: string | null;
                    timezone: string | null;
                    scheduledAt: Date | null;
                    company: string | null;
                    consultationDate: string;
                    consultationTime: string;
                    message: string;
                    serviceType: string;
                    duration: number | null;
                    meetingLink: string | null;
                    meetingType: string | null;
                    notes: string | null;
                }[];
                payments: {
                    createdAt: Date;
                    status: string;
                    id: number;
                    userId: number | null;
                    policyNumber: string | null;
                    updatedAt: Date;
                    email: string;
                    clientName: string;
                    amount: number;
                    paymentMethod: string;
                    phoneNumber: string | null;
                    cardNumber: string | null;
                    expiryDate: string | null;
                    cvv: string | null;
                    billingPhone: string | null;
                    transactionId: string | null;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                }[];
                diaspora: {
                    createdAt: Date;
                    status: string;
                    id: number;
                    userId: number | null;
                    updatedAt: Date;
                    name: string;
                    email: string;
                    phone: string;
                    country: string;
                    timezone: string;
                    scheduledAt: Date | null;
                    serviceInterest: string;
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
