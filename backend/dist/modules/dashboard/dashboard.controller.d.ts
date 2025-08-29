import { DashboardService } from './dashboard.service';
import { Response } from 'express';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(realtime?: string): Promise<import("../../types/api.types").DashboardStats>;
    getActivities(): Promise<any[]>;
    exportPDF(res: Response): Promise<void>;
}
