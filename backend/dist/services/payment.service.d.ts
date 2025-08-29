import { CreatePaymentDto, PaymentCallbackDto } from '../config/payment.dto';
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
                id: number;
                email: string;
            } | null;
        } & {
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
            id: number;
            email: string;
        } | null;
    } & {
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
    }>;
    create(data: CreatePaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            transactionId: string | null;
            status: string;
            amount: number;
            paymentMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue;
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
    initiateMpesaStkPush(phone: string, amount: number, transactionId: string): Promise<{
        success: boolean;
        message: string;
        mpesaCheckoutId: any;
        merchantRequestId: any;
        response: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        mpesaCheckoutId?: undefined;
        merchantRequestId?: undefined;
        response?: undefined;
    }>;
    processPayment(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
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
    private simulatePaymentProcessing;
    handleMpesaCallback(callbackData: PaymentCallbackDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
    handlePaypalCallback(callbackData: PaymentCallbackDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
    handleCardCallback(callbackData: PaymentCallbackDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
    private handlePaymentCallback;
    getPaymentStatus(id: number): Promise<{
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        transactionId: string | null;
        paymentMethod: string | null;
    }>;
}
