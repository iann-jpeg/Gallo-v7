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
        message: string | undefined;
        data: any;
        timestamp: string;
    } | {
        success: boolean;
        message: string;
        data: null;
    }>;
    getRecentActivities(query: any): Promise<{
        success: boolean;
        data: ({
            type: string;
            status: string;
            id: number;
            createdAt: Date;
            policyNumber: string;
            claimType: string;
            estimatedLoss: number;
            submitterEmail: string | null;
            submitterName: string | null;
        } | {
            type: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            organizationName: string;
            services: string[];
            budgetRange: string;
        } | {
            type: string;
            name: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            consultationDate: string;
            serviceType: string;
        } | {
            type: string;
            status: string;
            id: number;
            createdAt: Date;
            clientName: string;
            amount: number;
            paymentMethod: string;
        } | {
            type: string;
            name: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            country: string;
        })[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data: null;
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
