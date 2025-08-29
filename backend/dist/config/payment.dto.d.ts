export declare class CreatePaymentDto {
    policyNumber?: string;
    clientName: string;
    amount: number;
    paymentMethod: string;
    phoneNumber?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    email: string;
    billingPhone?: string;
    metadata?: any;
}
export declare class UpdatePaymentDto {
    transactionId?: string;
    status?: string;
    metadata?: any;
}
export declare class PaymentCallbackDto {
    transactionId: string;
    status: string;
    reference?: string;
    amount?: number;
    metadata?: any;
}
