import { CreateOutsourcingRequestDto, UpdateOutsourcingRequestDto } from '../config/outsourcing.dto';
export declare class OutsourcingService {
    findAll(page?: number, limit?: number, status?: string): Promise<{
        data: ({
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
            documents: {
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
                content: Uint8Array | null;
                outsourcingId: number | null;
            }[];
        } & {
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
        documents: {
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
            content: Uint8Array | null;
            outsourcingId: number | null;
        }[];
    } & {
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
    }>;
    create(data: CreateOutsourcingRequestDto, document?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            documents: {
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
                content: Uint8Array | null;
                outsourcingId: number | null;
            }[];
        } & {
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
    update(id: number, data: UpdateOutsourcingRequestDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
            documents: {
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
                content: Uint8Array | null;
                outsourcingId: number | null;
            }[];
        } & {
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
}
