import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
export declare class DocumentsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    viewClaimDocument(filename: string, res: Response): Promise<void>;
    viewQuoteDocument(filename: string, res: Response): Promise<void>;
    viewDocumentById(id: string, res: Response): Promise<void>;
}
