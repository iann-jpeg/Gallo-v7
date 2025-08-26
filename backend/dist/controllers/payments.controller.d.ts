import { BaseController } from './base.controller';
interface STKPushRequest {
    phone: string;
    amount: number;
    description: string;
}
interface ConsultationPaymentRequest {
    name: string;
    phone: string;
    amount: number;
    consultationType: string;
    consultationDate: string;
    consultationTime: string;
}
export declare class PaymentsController extends BaseController {
    initiateSTKPush(data: STKPushRequest): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    checkPaymentStatus(checkoutRequestId: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    payForConsultation(data: ConsultationPaymentRequest): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    createPayment(data: any): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
}
export {};
