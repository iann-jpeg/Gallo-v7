export declare class CreateQuoteDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    product: string;
    location?: string;
    budget?: string;
    coverage?: string;
    details?: string;
    contactMethod: string;
    bestTime?: string;
    documentPath?: string;
}
export declare class UpdateQuoteDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    product?: string;
    location?: string;
    budget?: string;
    coverage?: string;
    details?: string;
    contactMethod?: string;
    bestTime?: string;
    status?: string;
}
