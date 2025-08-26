import { QuotesService } from '../services/quotes.service';
import { CreateQuoteDto, UpdateQuoteDto } from '../config/quote.dto';
import { BaseController } from './base.controller';
export declare class QuotesController extends BaseController {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    findAll(page?: number, limit?: number): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    findOne(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    create(data: CreateQuoteDto, documents?: Express.Multer.File[]): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    update(id: string, data: UpdateQuoteDto): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    remove(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
}
