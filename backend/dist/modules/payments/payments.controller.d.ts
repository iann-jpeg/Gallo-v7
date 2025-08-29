import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPayment(body: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            method: string | null;
            description: string | null;
            status: string;
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            claimId: number | null;
            quoteId: number | null;
            amount: number;
            currency: string;
            reference: string | null;
            transactionId: string | null;
            paymentMethod: string | null;
            clientName: string | null;
        };
    }>;
    processPayment(id: string, body: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            method: string | null;
            description: string | null;
            status: string;
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            claimId: number | null;
            quoteId: number | null;
            amount: number;
            currency: string;
            reference: string | null;
            transactionId: string | null;
            paymentMethod: string | null;
            clientName: string | null;
        };
    }>;
    getPaymentStatus(id: string): Promise<{
        success: boolean;
        message: any;
    } | {
        id: string;
        status: string;
    }>;
}
