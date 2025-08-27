import { ClaimsService } from './claims.service';
export declare class ClaimsController {
    private readonly claimsService;
    constructor(claimsService: ClaimsService);
    createClaim(file: Express.Multer.File, body: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        claim: {
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
    getClaims(): Promise<{
        success: boolean;
        message: any;
    } | {
        claims: {
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
        }[];
        total: number;
    }>;
    getClaim(id: string): Promise<{
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
    } | {
        success: boolean;
        message: any;
    }>;
    updateClaimStatus(id: string, status: string): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        claim: {
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
}
