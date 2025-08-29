import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto, PaymentCallbackDto } from '../config/payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
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
    findOne(id: string, req: any): Promise<{
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
    create(createPaymentDto: CreatePaymentDto): Promise<{
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
    initiatePayment(createPaymentDto: CreatePaymentDto): Promise<{
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
    processPayment(id: string): Promise<{
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
    mpesaCallback(callbackData: PaymentCallbackDto): Promise<{
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
    paypalCallback(callbackData: PaymentCallbackDto): Promise<{
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
    cardCallback(callbackData: PaymentCallbackDto): Promise<{
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
    paystackCallback(callbackData: any, req: any): Promise<{
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
    verifyPayment(reference: string): Promise<{
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
