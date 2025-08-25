export declare class DiasporaService {
    createDiasporaRequest(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        diaspora: {
            name: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            phone: string;
            country: string;
            timezone: string;
            scheduledAt: Date | null;
            serviceInterest: string;
        };
    }>;
    getDiasporaRequests(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
        diaspora: {
            name: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            phone: string;
            country: string;
            timezone: string;
            scheduledAt: Date | null;
            serviceInterest: string;
        }[];
        total: number;
    }>;
}
