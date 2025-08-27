import { PrismaService } from '../prisma/prisma.service';
import { CreateOutsourcingRequestDto, UpdateOutsourcingRequestDto } from '../config/outsourcing.dto';
export declare class OutsourcingService {
    private prisma;
    constructor(prisma: PrismaService);
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
            budgetRange: string | null;
            timeline: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
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
        budgetRange: string | null;
        timeline: string | null;
    }>;
    create(data: CreateOutsourcingRequestDto, document?: Express.Multer.File): Promise<{
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
            budgetRange: string | null;
            timeline: string | null;
        };
    }>;
    update(id: number, data: UpdateOutsourcingRequestDto): Promise<{
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
            budgetRange: string | null;
            timeline: string | null;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    updateStatus(id: number, status: string): Promise<{
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
            budgetRange: string | null;
            timeline: string | null;
        };
    }>;
}
