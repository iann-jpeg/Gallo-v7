import { Response } from 'express';
export declare class DocumentsController {
    viewClaimDocument(filename: string, res: Response): Promise<void>;
    viewQuoteDocument(filename: string, res: Response): Promise<void>;
    viewDocumentById(id: string, res: Response): Promise<void>;
}
