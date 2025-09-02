import { AdminService } from '../services/admin.service';
import { BaseController } from './base.controller';
export declare class AdminController extends BaseController {
    private readonly adminService;
    getAllUsers(page?: number, limit?: number): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getAllNotifications(page?: number, limit?: number): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getAllOutsourcing(page?: number, limit?: number): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getOutsourcingStats(): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getSystemStats(): Promise<{
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getAllClaims(page?: number, limit?: number, status?: string, search?: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getClaimById(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    updateClaimStatus(id: string, status: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    deleteClaim(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    exportClaims(format: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    constructor(adminService: AdminService);
    getAllDiasporaRequests(page?: number, limit?: number, status?: string, search?: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getAllQuotes(page?: number, limit?: number, status?: string, search?: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getQuoteById(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    updateQuoteStatus(id: string, status: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    deleteQuote(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    exportQuotes(format: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getComprehensiveStats(): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getSystemHealth(): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
}
