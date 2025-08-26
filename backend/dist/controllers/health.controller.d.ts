import { PrismaService } from '../prisma/prisma.service';
import { DashboardService } from '../services/dashboard.service';
export declare class HealthController {
    private readonly prisma;
    private readonly dashboardService;
    constructor(prisma: PrismaService, dashboardService: DashboardService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        responseTime: string;
        services: {
            database: {
                status: string;
                connection: boolean;
                queries: boolean;
            };
            dashboard: {
                status: string;
            };
        };
        environment: string;
        version: string;
        error?: undefined;
    } | {
        status: string;
        timestamp: string;
        error: string;
        services: {
            database: {
                status: string;
                connection?: undefined;
                queries?: undefined;
            };
            dashboard: {
                status: string;
            };
        };
        responseTime?: undefined;
        environment?: undefined;
        version?: undefined;
    }>;
    getDeepHealth(): Promise<{
        status: string;
        timestamp: string;
        responseTime: string;
        database: {
            status: string;
            tables: {
                users: number;
                claims: number;
                quotes: number;
                consultations: number;
                payments: number;
            };
        };
        performance: {
            fast: boolean;
            acceptable: boolean;
            slow: boolean;
        };
        error?: undefined;
    } | {
        status: string;
        error: string;
        timestamp: string;
        responseTime?: undefined;
        database?: undefined;
        performance?: undefined;
    }>;
}
