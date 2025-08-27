import { EmailService } from './email.service';
import { CreateClaimDto } from '../config/claim.dto';
export declare class ClaimsService {
    private readonly emailService;
    constructor(emailService: EmailService);
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: any[];
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
        document: {
            id: number;
            createdAt: Date;
            filename: string;
            originalName: string;
            mimeType: string;
            size: number;
        }[];
        id: number;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        submitterEmail: string | null;
        submitterName: string | null;
        submitterPhone: string | null;
    }>;
    getClaimDocuments(id: number): Promise<any[]>;
    create(data: CreateClaimDto & {
        documentDetails?: any[];
    }): Promise<{
        id: number;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        submitterEmail: string | null;
        submitterName: string | null;
        submitterPhone: string | null;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        submitterEmail: string | null;
        submitterName: string | null;
        submitterPhone: string | null;
    }>;
    remove(id: number): Promise<boolean>;
}
