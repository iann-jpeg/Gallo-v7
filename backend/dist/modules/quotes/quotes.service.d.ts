export declare class QuotesService {
    createQuote(formData: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        quote: {
            location: string | null;
            details: string | null;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            product: string;
            userId: number | null;
            firstName: string;
            lastName: string;
            phone: string;
            budget: string | null;
            coverage: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
    }>;
    getQuotes(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
        quotes: {
            location: string | null;
            details: string | null;
            status: string;
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            product: string;
            userId: number | null;
            firstName: string;
            lastName: string;
            phone: string;
            budget: string | null;
            coverage: string | null;
            contactMethod: string;
            bestTime: string | null;
        }[];
        total: number;
    }>;
}
