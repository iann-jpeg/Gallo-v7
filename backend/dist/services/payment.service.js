"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let PaymentService = class PaymentService {
    async handlePaystackCallback(callbackData, signature) {
        try {
            const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;
            if (webhookSecret && signature) {
                const crypto = require('crypto');
                const hash = crypto.createHmac('sha512', webhookSecret).update(JSON.stringify(callbackData)).digest('hex');
                if (hash !== signature) {
                    throw new common_1.BadRequestException('Invalid webhook signature');
                }
            }
            console.log('Paystack callback received:', JSON.stringify(callbackData, null, 2));
            const event = callbackData.event;
            const data = callbackData.data;
            if (event !== 'charge.success' && event !== 'charge.failed') {
                return {
                    success: true,
                    message: 'Event type not handled',
                    event
                };
            }
            const reference = data === null || data === void 0 ? void 0 : data.reference;
            const status = data === null || data === void 0 ? void 0 : data.status;
            if (!reference) {
                throw new common_1.BadRequestException('Missing transaction reference in callback');
            }
            const payment = await prisma.payment.findFirst({
                where: { transactionId: reference }
            });
            if (!payment) {
                console.warn(`Payment not found for reference: ${reference}`);
                throw new common_1.NotFoundException('Payment not found');
            }
            const finalStatus = status === 'success' ? 'completed' : 'failed';
            const updatedPayment = await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: finalStatus,
                    metadata: Object.assign(Object.assign({}, payment.metadata), { paystackCallback: callbackData, callbackReceivedAt: new Date().toISOString(), amount_paid: (data === null || data === void 0 ? void 0 : data.amount) ? data.amount / 100 : null, paystack_reference: data === null || data === void 0 ? void 0 : data.reference, gateway_response: data === null || data === void 0 ? void 0 : data.gateway_response })
                }
            });
            console.log(`Payment ${reference} updated to status: ${finalStatus}`);
            return {
                success: true,
                message: 'Paystack callback processed successfully',
                data: {
                    id: updatedPayment.id,
                    transactionId: updatedPayment.transactionId,
                    status: updatedPayment.status
                }
            };
        }
        catch (error) {
            console.error('Error handling Paystack callback:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to process Paystack callback');
        }
    }
    async findAll(page = 1, limit = 10, status) {
        try {
            const skip = (page - 1) * limit;
            const where = status ? { status } : {};
            const [payments, total] = await Promise.all([
                prisma.payment.findMany({
                    skip,
                    take: limit,
                    where,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: { id: true, name: true, email: true }
                        }
                    }
                }),
                prisma.payment.count({ where })
            ]);
            return {
                data: payments,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            console.error('Error fetching payments:', error);
            throw new common_1.BadRequestException('Failed to fetch payments');
        }
    }
    async findOne(id, user) {
        try {
            const payment = await prisma.payment.findUnique({
                where: { id },
                include: {
                    user: {
                        select: { id: true, name: true, email: true }
                    }
                }
            });
            if (!payment) {
                throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
            }
            if (user && user.role !== 'ADMIN' && payment.userId !== user.id) {
                throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
            }
            return payment;
        }
        catch (error) {
            console.error('Error fetching payment:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch payment');
        }
    }
    async create(data) {
        try {
            const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            let payment;
            if (data.paymentMethod === 'mpesa') {
                const mpesaResult = await this.initiateMpesaStkPush(data.phoneNumber || '', data.amount, transactionId);
                payment = await prisma.payment.create({
                    data: Object.assign(Object.assign({}, data), { transactionId, status: mpesaResult.success ? 'processing' : 'failed', metadata: mpesaResult })
                });
            }
            else if (data.paymentMethod === 'paystack') {
                const paystackResult = await this.initiatePaystackPayment(data.amount, transactionId, data.email);
                payment = await prisma.payment.create({
                    data: Object.assign(Object.assign({}, data), { transactionId, status: paystackResult.success ? 'processing' : 'failed', metadata: paystackResult })
                });
            }
            else {
                payment = await prisma.payment.create({
                    data: Object.assign(Object.assign({}, data), { transactionId, status: 'pending' })
                });
            }
            return {
                success: true,
                message: 'Payment initiated successfully',
                data: payment ? {
                    id: payment.id,
                    transactionId: payment.transactionId,
                    status: payment.status,
                    amount: payment.amount,
                    paymentMethod: payment.paymentMethod,
                    metadata: payment.metadata
                } : null
            };
        }
        catch (error) {
            console.error('Error creating payment:', error);
            throw new common_1.BadRequestException('Failed to initiate payment');
        }
    }
    async initiatePaystackPayment(amount, transactionId, email) {
        var _a, _b, _c;
        const apiUrl = process.env.PAYSTACK_API_URL || 'https://api.paystack.co';
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        const callbackUrl = process.env.PAYSTACK_CALLBACK_URL;
        if (!secretKey) {
            return { success: false, message: 'Paystack secret key not configured', error: 'Missing API credentials' };
        }
        const axios = require('axios');
        try {
            const response = await axios.post(`${apiUrl}/transaction/initialize`, {
                email,
                amount: amount * 100,
                reference: transactionId,
                callback_url: callbackUrl,
                currency: 'USD',
                metadata: {
                    transactionId,
                    custom_fields: [
                        {
                            display_name: "Transaction ID",
                            variable_name: "transaction_id",
                            value: transactionId
                        }
                    ]
                }
            }, {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data && response.data.status) {
                return {
                    success: true,
                    message: 'Paystack payment initialized successfully',
                    data: response.data.data,
                    authorization_url: response.data.data.authorization_url,
                    access_code: response.data.data.access_code,
                    reference: response.data.data.reference
                };
            }
            else {
                return {
                    success: false,
                    message: 'Paystack payment initialization failed',
                    error: response.data.message || 'Unknown error'
                };
            }
        }
        catch (error) {
            console.error('Paystack payment error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            return {
                success: false,
                message: 'Paystack payment failed',
                error: ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message
            };
        }
    }
    async verifyPaystackPayment(reference) {
        var _a, _b, _c;
        const apiUrl = process.env.PAYSTACK_API_URL || 'https://api.paystack.co';
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            return { success: false, message: 'Paystack secret key not configured' };
        }
        const axios = require('axios');
        try {
            const response = await axios.get(`${apiUrl}/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data && response.data.status) {
                return {
                    success: true,
                    message: 'Payment verification successful',
                    data: response.data.data,
                    status: response.data.data.status
                };
            }
            else {
                return {
                    success: false,
                    message: 'Payment verification failed',
                    error: response.data.message || 'Unknown error'
                };
            }
        }
        catch (error) {
            console.error('Paystack verification error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            return {
                success: false,
                message: 'Payment verification failed',
                error: ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message
            };
        }
    }
    async initiateMpesaStkPush(phone, amount, transactionId) {
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        const shortcode = process.env.MPESA_SHORTCODE;
        const passkey = process.env.MPESA_PASSKEY;
        const callbackUrl = process.env.MPESA_CALLBACK_URL;
        const environment = process.env.MPESA_ENVIRONMENT || 'production';
        const axios = require('axios');
        try {
            const oauthUrl = environment === 'production'
                ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
                : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
            const oauthResponse = await axios.get(oauthUrl, {
                auth: {
                    username: consumerKey,
                    password: consumerSecret,
                },
            });
            const accessToken = oauthResponse.data.access_token;
            const timestamp = new Date()
                .toISOString()
                .replace(/[-:TZ.]/g, '')
                .slice(0, 14);
            const passwordStr = (shortcode || '') + (passkey || '') + timestamp;
            const password = Buffer.from(passwordStr).toString('base64');
            const stkPushUrl = environment === 'production'
                ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
                : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
            const payload = {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: shortcode,
                PhoneNumber: phone,
                CallBackURL: callbackUrl,
                AccountReference: transactionId,
                TransactionDesc: 'Payment for services',
            };
            const stkResponse = await axios.post(stkPushUrl, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                message: 'STK Push sent',
                mpesaCheckoutId: stkResponse.data.CheckoutRequestID,
                merchantRequestId: stkResponse.data.MerchantRequestID,
                response: stkResponse.data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'M-PESA STK Push failed',
                error: error.message,
            };
        }
    }
    async processPayment(id) {
        try {
            const payment = await prisma.payment.findUnique({
                where: { id }
            });
            if (!payment) {
                throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
            }
            if (payment.status !== 'pending') {
                throw new common_1.BadRequestException('Payment has already been processed');
            }
            await prisma.payment.update({
                where: { id },
                data: { status: 'processing' }
            });
            const isSuccess = await this.simulatePaymentProcessing(payment.paymentMethod);
            const finalStatus = isSuccess ? 'completed' : 'failed';
            const updatedPayment = await prisma.payment.update({
                where: { id },
                data: {
                    status: finalStatus,
                    metadata: {
                        processedAt: new Date(),
                        simulatedResult: isSuccess ? 'success' : 'failed'
                    }
                }
            });
            return {
                success: true,
                message: `Payment ${finalStatus}`,
                data: updatedPayment
            };
        }
        catch (error) {
            console.error('Error processing payment:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to process payment');
        }
    }
    async simulatePaymentProcessing(paymentMethod) {
        const delay = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        switch (paymentMethod) {
            case 'mpesa':
                return Math.random() > 0.1;
            case 'card':
                return Math.random() > 0.15;
            case 'paystack':
                return Math.random() > 0.05;
            default:
                return Math.random() > 0.2;
        }
    }
    async handleMpesaCallback(callbackData) {
        return this.handlePaymentCallback(callbackData, 'mpesa');
    }
    async handlePaypalCallback(callbackData) {
        return this.handlePaymentCallback(callbackData, 'paypal');
    }
    async handleCardCallback(callbackData) {
        return this.handlePaymentCallback(callbackData, 'card');
    }
    async handlePaymentCallback(callbackData, expectedMethod) {
        try {
            const payment = await prisma.payment.findFirst({
                where: { transactionId: callbackData.transactionId }
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment not found');
            }
            if (payment.paymentMethod !== expectedMethod) {
                throw new common_1.BadRequestException('Payment method mismatch');
            }
            const status = callbackData.status === 'success' ? 'completed' : 'failed';
            const updatedPayment = await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status,
                    metadata: Object.assign(Object.assign({}, payment.metadata), { callbackData, callbackReceivedAt: new Date() })
                }
            });
            return {
                success: true,
                message: 'Callback processed successfully',
                data: updatedPayment
            };
        }
        catch (error) {
            console.error('Error handling payment callback:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to process payment callback');
        }
    }
    async getPaymentStatus(id) {
        try {
            const payment = await prisma.payment.findUnique({
                where: { id },
                select: {
                    id: true,
                    transactionId: true,
                    status: true,
                    amount: true,
                    paymentMethod: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            if (!payment) {
                throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
            }
            return payment;
        }
        catch (error) {
            console.error('Error fetching payment status:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch payment status');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map