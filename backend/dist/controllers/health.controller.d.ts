import { PrismaService } from '../prisma/prisma.service';
import { MinimalDashboardService } from '../services/minimal-dashboard.service';
export declare class HealthController {
    private readonly prisma;
    private readonly minimalDashboard;
    constructor(prisma: PrismaService, minimalDashboard: MinimalDashboardService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        responseTime: string;
        services: {
            database: {
                status: string;
                connection: boolean;
                queries: boolean;
                url_configured: boolean;
            };
            dashboard: {
                status: string;
                message: string;
                fallback_available: boolean;
            };
            application: {
                status: string;
                memory_usage: NodeJS.MemoryUsage;
                uptime: number;
            };
        };
        environment: string;
        version: string;
        deployment: {
            platform: string;
            tables_available: string[];
            tables_missing: string[];
        };
        error?: undefined;
    } | {
        status: string;
        timestamp: string;
        responseTime: string;
        error: string;
        services: {
            database: {
                status: string;
                connection?: undefined;
                queries?: undefined;
                url_configured?: undefined;
            };
            application: {
                status: string;
                memory_usage?: undefined;
                uptime?: undefined;
            };
            dashboard?: undefined;
        };
        environment?: undefined;
        version?: undefined;
        deployment?: undefined;
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
                diaspora: number;
                documents: number;
                products: number;
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
