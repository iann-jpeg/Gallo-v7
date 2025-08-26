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
            status: string;
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            policyNumber: string | null;
            clientName: string;
            amount: number;
            paymentMethod: string;
            phoneNumber: string | null;
            cardNumber: string | null;
            expiryDate: string | null;
            cvv: string | null;
            billingPhone: string | null;
            transactionId: string | null;
        };
    }>;
    processPayment(id: string, body: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        payment: {
            status: string;
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number | null;
            policyNumber: string | null;
            clientName: string;
            amount: number;
            paymentMethod: string;
            phoneNumber: string | null;
            cardNumber: string | null;
            expiryDate: string | null;
            cvv: string | null;
            billingPhone: string | null;
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
