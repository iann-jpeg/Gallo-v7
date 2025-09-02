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
            id: string;
            type: string;
            createdAt: Date;
            status: string;
            policyNumber: string;
            claimType: string;
            estimatedLoss: number;
            submitterEmail: string | null;
            submitterName: string | null;
        } | {
            id: string;
            type: string;
            createdAt: Date;
            status: string;
            organizationName: string;
            email: string;
            services: string[];
            budgetRange: string;
        } | {
            id: string;
            type: string;
            createdAt: Date;
            status: string;
            name: string;
            email: string;
            serviceType: string;
        } | {
            id: string;
            type: string;
            createdAt: Date;
            status: string;
            amount: number;
            paymentMethod: string;
        } | {
            id: string;
            type: string;
            createdAt: Date;
            status: string;
            name: string;
            email: string;
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
