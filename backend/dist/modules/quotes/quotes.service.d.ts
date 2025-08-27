export declare class QuotesService {
    createQuote(formData: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        quote: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            product: string;
            firstName: string;
            lastName: string;
            location: string | null;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
    }>;
    getQuotes(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
        quotes: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            product: string;
            firstName: string;
            lastName: string;
            location: string | null;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
        }[];
        total: number;
    }>;
}
