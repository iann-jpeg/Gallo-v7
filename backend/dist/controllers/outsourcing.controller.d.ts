import { OutsourcingService } from '../services/outsourcing.service';
import { CreateOutsourcingRequestDto, UpdateOutsourcingRequestDto } from '../config/outsourcing.dto';
export declare class OutsourcingController {
    private readonly outsourcingService;
    constructor(outsourcingService: OutsourcingService);
    findAll(page?: number, limit?: number, status?: string): Promise<{
        data: ({
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
            document: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                path: string;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        } | null;
        document: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            filename: string;
            originalName: string;
            mimeType: string;
            size: number;
            path: string;
            claimId: number | null;
            quoteId: number | null;
            outsourcingId: number | null;
            content: Uint8Array | null;
        }[];
    } & {
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
    }>;
    create(createOutsourcingRequestDto: CreateOutsourcingRequestDto, document?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            document: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                path: string;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
        } & {
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
    update(id: string, updateOutsourcingRequestDto: UpdateOutsourcingRequestDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
            document: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                path: string;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
        } & {
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
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
}
