import { AdminService } from '../services/admin.service';
import { BaseController } from './base.controller';
export declare class AdminController extends BaseController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
