export declare class OutsourcingService {
    createOutsourcingRequest(data: any): Promise<{
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
    getOutsourcingRequests(page?: number, limit?: number): Promise<{
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
