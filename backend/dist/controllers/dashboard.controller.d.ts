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
                        id: number;
                        createdAt: Date;
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
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    status: string;
                    userId: number | null;
                    policyNumber: string;
                    claimType: string;
                    incidentDate: Date;
                    estimatedLoss: number;
                    submitterEmail: string | null;
                    submitterName: string | null;
                    submitterPhone: string | null;
                })[];
                outsourcing: {
                    id: number;
                    email: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: string;
                    userId: number | null;
                    location: string;
                    organizationName: string;
                    coreFunctions: string | null;
                    address: string | null;
                    services: string[];
                    natureOfOutsourcing: string;
                    budgetRange: string;
                }[];
                consultations: {
                    id: number;
                    name: string;
                    email: string;
                    createdAt: Date;
                    updatedAt: Date;
                    message: string;
                    status: string;
                    userId: number | null;
                    phone: string;
                    country: string | null;
                    timezone: string | null;
                    scheduledAt: Date | null;
                    company: string | null;
                    consultationDate: string;
                    consultationTime: string;
                    serviceType: string;
                    duration: number | null;
                    meetingLink: string | null;
                    meetingType: string | null;
                    notes: string | null;
                }[];
                payments: {
                    id: number;
                    email: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: string;
                    amount: number;
                    userId: number | null;
                    policyNumber: string | null;
                    clientName: string;
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
                    id: number;
                    name: string;
                    email: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: string;
                    userId: number | null;
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
        data: ({
            type: string;
            id: number;
            createdAt: Date;
            status: string;
            policyNumber: string;
            claimType: string;
            estimatedLoss: number;
            submitterEmail: string | null;
            submitterName: string | null;
        } | {
            type: string;
            id: number;
            email: string;
            createdAt: Date;
            status: string;
            organizationName: string;
            services: string[];
            budgetRange: string;
        } | {
            type: string;
            id: number;
            name: string;
            email: string;
            createdAt: Date;
            status: string;
            consultationDate: string;
            serviceType: string;
        } | {
            type: string;
            id: number;
            createdAt: Date;
            status: string;
            amount: number;
            clientName: string;
            paymentMethod: string;
        } | {
            type: string;
            id: number;
            name: string;
            email: string;
            createdAt: Date;
            status: string;
            country: string;
        })[];
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
