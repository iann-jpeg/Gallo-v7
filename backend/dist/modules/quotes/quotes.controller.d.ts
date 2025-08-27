import { QuotesService } from './quotes.service';
export declare class QuotesController {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    createQuote(file: Express.Multer.File, body: any): Promise<{
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
    getQuotes(): Promise<{
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
