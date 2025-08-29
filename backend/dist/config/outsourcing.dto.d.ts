export declare class CreateOutsourcingRequestDto {
    organizationName: string;
    companySize?: string;
    location: string;
    phone?: string;
    email: string;
    services: string[];
    natureOfOutsourcing: string;
    budgetRange: string;
}
export declare class UpdateOutsourcingRequestDto {
    organizationName?: string;
    coreFunctions?: string;
    location?: string;
    address?: string;
    email?: string;
    services?: string[];
    natureOfOutsourcing?: string;
    budgetRange?: string;
    status?: string;
}
