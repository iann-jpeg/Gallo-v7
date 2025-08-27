import { DiasporaService } from './diaspora.service';
export declare class DiasporaController {
    private readonly diasporaService;
    constructor(diasporaService: DiasporaService);
    createDiasporaRequest(body: any): Promise<{
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
    getDiasporaRequests(): Promise<{
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
