import { OutsourcingService } from '../services/outsourcing.service';
import { CreateOutsourcingRequestDto, UpdateOutsourcingRequestDto } from '../config/outsourcing.dto';
export declare class OutsourcingController {
    private readonly outsourcingService;
    constructor(outsourcingService: OutsourcingService);
    findAll(page?: number, limit?: number, status?: string): Promise<{
        data: ({
            document: {
                path: string;
                filename: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                originalName: string;
                mimeType: string;
                size: number;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
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
        document: {
            path: string;
            filename: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            originalName: string;
            mimeType: string;
            size: number;
            claimId: number | null;
            quoteId: number | null;
            outsourcingId: number | null;
            content: Uint8Array | null;
        }[];
        user: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
        description: string;
        status: string;
        id: number;
        userId: number | null;
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
                path: string;
                filename: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                originalName: string;
                mimeType: string;
                size: number;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
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
            document: {
                path: string;
                filename: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                originalName: string;
                mimeType: string;
                size: number;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
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
            description: string;
            status: string;
            id: number;
            userId: number | null;
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
