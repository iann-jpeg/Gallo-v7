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
    getQuotes(): Promise<{
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
