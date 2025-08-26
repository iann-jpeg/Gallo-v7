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
            location: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            organizationName: string;
            coreFunctions: string | null;
            address: string | null;
            services: string[];
            natureOfOutsourcing: string;
            budgetRange: string;
        };
    }>;
    getOutsourcingRequests(): Promise<{
        success: boolean;
        message: any;
    } | {
        outsourcing: {
            location: string;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            organizationName: string;
            coreFunctions: string | null;
            address: string | null;
            services: string[];
            natureOfOutsourcing: string;
            budgetRange: string;
        }[];
        total: number;
    }>;
}
