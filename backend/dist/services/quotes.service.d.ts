import { EmailService } from './email.service';
import { CreateQuoteDto, UpdateQuoteDto } from '../config/quote.dto';
export declare class QuotesService {
    private readonly emailService;
    createWithDocuments(data: CreateQuoteDto, documents?: Express.Multer.File[]): Promise<{
        success: boolean;
        data: ({
            documents: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                path: string;
                claimId: number | null;
                quoteId: number | null;
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
        } & {
            id: number;
            userId: number | null;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            location: string | null;
            product: string;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        }) | null;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    constructor(emailService: EmailService);
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
            id: number;
            userId: number | null;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            location: string | null;
            product: string;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        id: number;
        userId: number | null;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        location: string | null;
        product: string;
        budget: string | null;
        coverage: string | null;
        details: string | null;
        contactMethod: string;
        bestTime: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreateQuoteDto): Promise<{
        id: number;
        userId: number | null;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        location: string | null;
        product: string;
        budget: string | null;
        coverage: string | null;
        details: string | null;
        contactMethod: string;
        bestTime: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, data: UpdateQuoteDto): Promise<{
        id: number;
        userId: number | null;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        location: string | null;
        product: string;
        budget: string | null;
        coverage: string | null;
        details: string | null;
        contactMethod: string;
        bestTime: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number | null;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        location: string | null;
        product: string;
        budget: string | null;
        coverage: string | null;
        details: string | null;
        contactMethod: string;
        bestTime: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
