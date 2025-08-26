export declare class CreateClaimDto {
    policyNumber: string;
    claimType: string;
    incidentDate: string;
    estimatedLoss: number;
    description: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    documents?: string[];
    documentPath?: string;
}
export declare class UpdateClaimDto {
    policyNumber?: string;
    claimType?: string;
    incidentDate?: string;
    estimatedLoss?: number;
    description?: string;
    documents?: string[];
    status?: string;
    submitterName?: string;
    submitterEmail?: string;
    submitterPhone?: string;
}
