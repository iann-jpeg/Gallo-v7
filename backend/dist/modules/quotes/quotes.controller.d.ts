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
            location: string | null;
            details: string | null;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            product: string;
            firstName: string;
            lastName: string;
            budget: string | null;
            coverage: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
    }>;
    getQuotes(): Promise<{
        success: boolean;
        message: any;
    } | {
        quotes: {
            location: string | null;
            details: string | null;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            product: string;
            firstName: string;
            lastName: string;
            budget: string | null;
            coverage: string | null;
            contactMethod: string;
            bestTime: string | null;
        }[];
        total: number;
    }>;
}
