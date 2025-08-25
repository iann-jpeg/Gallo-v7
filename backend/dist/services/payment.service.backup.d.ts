import { CreatePaymentDto } from '../config/payment.dto';
export declare class PaymentService {
    handlePaystackCallback(callbackData: any, signature?: string): Promise<{
        success: boolean;
        message: string;
        event: any;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id: number;
            transactionId: string | null;
            status: string;
        };
        event?: undefined;
    }>;
    findAll(page?: number, limit?: number, status?: string): Promise<{
        data: ({
            user: {
                name: string;
                email: string;
                id: number;
            } | null;
        } & {
            policyNumber: string | null;
            clientName: string;
            amount: number;
            paymentMethod: string;
            phoneNumber: string | null;
            cardNumber: string | null;
            expiryDate: string | null;
            cvv: string | null;
            email: string;
            billingPhone: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            transactionId: string | null;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number, user?: any): Promise<{
        user: {
            name: string;
            email: string;
            id: number;
        } | null;
    } & {
        policyNumber: string | null;
        clientName: string;
        amount: number;
        paymentMethod: string;
        phoneNumber: string | null;
        cardNumber: string | null;
        expiryDate: string | null;
        cvv: string | null;
        email: string;
        billingPhone: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        transactionId: string | null;
        status: string;
        id: number;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreatePaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            transactionId: string | null;
            status: string;
            amount: number;
            paymentMethod: string;
        } | null;
    }>;
    initiatePaystackPayment(amount: number, transactionId: string, email: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        authorization_url: any;
        access_code: any;
        reference: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        authorization_url?: undefined;
        access_code?: undefined;
        reference?: undefined;
    }>;
    verifyPaystackPayment(reference: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        status?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
        status: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        status?: undefined;
    }>;
}
