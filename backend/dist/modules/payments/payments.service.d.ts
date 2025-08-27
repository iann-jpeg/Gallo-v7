export declare class PaymentsService {
    createPayment(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            id: number;
            userId: number | null;
            description: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            claimId: number | null;
            quoteId: number | null;
            amount: number;
            currency: string;
            reference: string | null;
            transactionId: string | null;
            method: string | null;
            paymentMethod: string | null;
            clientName: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        };
    }>;
    processPayment(id: string, data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            id: number;
            userId: number | null;
            description: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            claimId: number | null;
            quoteId: number | null;
            amount: number;
            currency: string;
            reference: string | null;
            transactionId: string | null;
            method: string | null;
            paymentMethod: string | null;
            clientName: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
