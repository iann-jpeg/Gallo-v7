export declare class DiasporaService {
    createDiasporaRequest(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        diaspora: {
            name: string;
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            country: string;
            timezone: string;
            serviceInterest: string;
            scheduledAt: Date | null;
        };
    }>;
    getDiasporaRequests(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
        diaspora: {
            name: string;
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            country: string;
            timezone: string;
            serviceInterest: string;
            scheduledAt: Date | null;
        }[];
        total: number;
    }>;
}
