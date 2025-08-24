import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto, PaymentCallbackDto } from '../config/payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
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
    findOne(id: string, req: any): Promise<{
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
    create(createPaymentDto: CreatePaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            transactionId: string | null;
            status: string;
            amount: number;
            paymentMethod: string;
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
            paymentMethod: string;
            metadata: import("@prisma/client/runtime/library").JsonValue;
        } | null;
    }>;
    processPayment(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    mpesaCallback(callbackData: PaymentCallbackDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    paypalCallback(callbackData: PaymentCallbackDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    cardCallback(callbackData: PaymentCallbackDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
