import { EmailService } from './email.service';
import { CreateClaimDto } from '../config/claim.dto';
export declare class ClaimsService {
    private readonly emailService;
    constructor(emailService: EmailService);
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
            documentUrls: string[];
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
            documents: {
                filename: string;
                id: number;
                createdAt: Date;
                originalName: string;
                mimeType: string;
                size: number;
            }[];
            description: string;
            status: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            policyNumber: string;
            claimType: string;
            incidentDate: Date;
            estimatedLoss: number;
            submitterEmail: string | null;
            submitterName: string | null;
            submitterPhone: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        documentUrls: string[];
        user: {
            name: string;
            id: number;
            email: string;
        } | null;
        documents: {
            filename: string;
            id: number;
            createdAt: Date;
            originalName: string;
            mimeType: string;
            size: number;
        }[];
        description: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
        submitterEmail: string | null;
        submitterName: string | null;
        submitterPhone: string | null;
    }>;
    getClaimDocuments(id: number): Promise<{
        url: string;
        filename: string;
        id: number;
        createdAt: Date;
        originalName: string;
        mimeType: string;
        size: number;
    }[]>;
    create(data: CreateClaimDto & {
        documentDetails?: any[];
    }): Promise<{
        description: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
        submitterEmail: string | null;
        submitterName: string | null;
        submitterPhone: string | null;
    }>;
    update(id: number, data: any): Promise<{
        description: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
        submitterEmail: string | null;
        submitterName: string | null;
        submitterPhone: string | null;
    }>;
    remove(id: number): Promise<boolean>;
}
