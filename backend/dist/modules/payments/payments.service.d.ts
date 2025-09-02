export declare class PaymentsService {
    createPayment(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            description: string | null;
            status: string;
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            amount: number;
            currency: string;
            paymentMethod: string;
            reference: string | null;
            transactionId: string | null;
        };
    }>;
    processPayment(id: string, data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            description: string | null;
            status: string;
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            amount: number;
            currency: string;
            paymentMethod: string;
            reference: string | null;
            transactionId: string | null;
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
