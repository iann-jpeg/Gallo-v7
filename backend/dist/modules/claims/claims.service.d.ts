export declare class ClaimsService {
    createClaim(formData: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        claim: {
            description: string;
            status: string;
            id: number;
            userId: number | null;
            policyNumber: string;
            claimType: string;
            incidentDate: Date;
            estimatedLoss: number;
            createdAt: Date;
            updatedAt: Date;
            submitterEmail: string | null;
            submitterName: string | null;
            submitterPhone: string | null;
        };
    }>;
    getClaims(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
        claims: {
            description: string;
            status: string;
            id: number;
            userId: number | null;
            policyNumber: string;
            claimType: string;
            incidentDate: Date;
            estimatedLoss: number;
            createdAt: Date;
            updatedAt: Date;
            submitterEmail: string | null;
            submitterName: string | null;
            submitterPhone: string | null;
        }[];
        total: number;
    }>;
    getClaim(id: string): Promise<{
        description: string;
        status: string;
        id: number;
        userId: number | null;
        policyNumber: string;
        claimType: string;
        incidentDate: Date;
        estimatedLoss: number;
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
            description: string;
            status: string;
            id: number;
            userId: number | null;
            policyNumber: string;
            claimType: string;
            incidentDate: Date;
            estimatedLoss: number;
            createdAt: Date;
            updatedAt: Date;
            submitterEmail: string | null;
            submitterName: string | null;
            submitterPhone: string | null;
        };
    }>;
}
