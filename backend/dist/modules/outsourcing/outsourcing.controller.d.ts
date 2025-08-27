import { OutsourcingService } from './outsourcing.service';
export declare class OutsourcingController {
    private readonly outsourcingService;
    constructor(outsourcingService: OutsourcingService);
    createOutsourcingRequest(body: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        outsourcing: {
            id: number;
            userId: number | null;
            description: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            category: string;
            budget: number | null;
            title: string;
            organizationName: string | null;
            services: string[];
            timeline: string | null;
        };
    }>;
    getOutsourcingRequests(): Promise<{
        success: boolean;
        message: any;
    } | {
        outsourcing: {
            id: number;
            userId: number | null;
            description: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            category: string;
            budget: number | null;
            title: string;
            organizationName: string | null;
            services: string[];
            timeline: string | null;
        }[];
        total: number;
    }>;
}
