import { ClaimsService } from '../services/claims.service';
import { CreateClaimDto, UpdateClaimDto } from '../config/claim.dto';
export declare class ClaimsController {
    private readonly claimsService;
    constructor(claimsService: ClaimsService);
    findAll(page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
            data: any[];
            meta: {
                total: number;
                page: number;
                limit: number;
                totalPages: number;
            };
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    create(data: CreateClaimDto, document?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    update(id: string, data: UpdateClaimDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
