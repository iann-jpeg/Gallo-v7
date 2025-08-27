"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../middleware/public.decorator");
const base_controller_1 = require("./base.controller");
let PaymentsController = class PaymentsController extends base_controller_1.BaseController {
    async initiateSTKPush(data) {
        try {
            // Simulate M-PESA STK Push integration
            // In a real implementation, you would integrate with Safaricom's M-PESA API
            if (!data.phone || !data.amount) {
                throw new common_1.BadRequestException('Phone number and amount are required');
            }
            // Validate phone number format
            const phoneRegex = /^(\+254|254|0)?7\d{8}$/;
            if (!phoneRegex.test(data.phone)) {
                throw new common_1.BadRequestException('Invalid phone number format. Use format: +254712345678');
            }
            // Normalize phone number
            let normalizedPhone = data.phone;
            if (normalizedPhone.startsWith('0')) {
                normalizedPhone = '254' + normalizedPhone.substring(1);
            }
            else if (normalizedPhone.startsWith('+254')) {
                normalizedPhone = normalizedPhone.substring(1);
            }
            // Simulate STK push
            const checkoutRequestId = `STK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            console.log(`M-PESA STK Push initiated for ${normalizedPhone}, Amount: ${data.amount}, Description: ${data.description}`);
            // Simulate async payment processing
            setTimeout(() => {
                console.log(`Payment callback received for ${checkoutRequestId}: SUCCESS`);
            }, 5000);
            return this.handleSuccess({
                checkoutRequestId,
                merchantRequestId: `MERCH_${Date.now()}`,
                responseCode: '0',
                responseDescription: 'Success. Request accepted for processing',
                customerMessage: 'Success. Request accepted for processing'
            }, 'STK Push initiated successfully. Please check your phone and enter your M-PESA PIN.');
        }
        catch (error) {
            console.error('M-PESA STK Push error:', error);
            return this.handleError(error);
        }
    }
    async checkPaymentStatus(checkoutRequestId) {
        try {
            // In a real implementation, you would query M-PESA API for transaction status
            // Simulate successful payment after some time
            const isOldRequest = Date.now() - parseInt(checkoutRequestId.split('_')[1]) > 30000; // 30 seconds
            if (isOldRequest) {
                return this.handleSuccess({
                    resultCode: '0',
                    resultDesc: 'The service request is processed successfully.',
                    callbackMetadata: {
                        amount: 2000,
                        mpesaReceiptNumber: `OEI2AK4Q16`,
                        transactionDate: new Date().toISOString(),
                        phoneNumber: '254712345678'
                    }
                }, 'Payment completed successfully');
            }
            else {
                return this.handleSuccess({
                    resultCode: '1032',
                    resultDesc: 'Request cancelled by user'
                }, 'Payment still pending');
            }
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async payForConsultation(data) {
        try {
            if (!data.name || !data.phone || !data.amount || !data.consultationType || !data.consultationDate || !data.consultationTime) {
                throw new common_1.BadRequestException('All fields are required for consultation payment');
            }
            // First initiate M-PESA payment
            const stkResponse = await this.initiateSTKPush({
                phone: data.phone,
                amount: data.amount,
                description: `Galloways Consultation - ${data.consultationType} on ${data.consultationDate}`
            });
            // Store consultation booking (in real app, save to database)
            const bookingRef = `GC-${Date.now().toString().slice(-8)}`;
            console.log('Consultation booking created:', {
                bookingRef,
                ...data,
                paymentStatus: 'PENDING',
                createdAt: new Date()
            });
            // Simulate booking confirmation after payment
            setTimeout(() => {
                console.log(`Consultation ${bookingRef} confirmed after successful payment`);
            }, 10000);
            return this.handleSuccess({
                bookingRef,
                paymentRequest: stkResponse,
                message: 'Consultation booking created. Please complete M-PESA payment to confirm your booking.'
            }, 'Consultation payment initiated successfully');
        }
        catch (error) {
            console.error('Consultation payment error:', error);
            return this.handleError(error);
        }
    }
    async createPayment(data) {
        try {
            // Generic payment creation for other services
            const paymentRef = `GAL-${Date.now().toString().slice(-8)}`;
            console.log('Generic payment created:', {
                paymentRef,
                ...data,
                status: 'PENDING',
                createdAt: new Date()
            });
            return this.handleSuccess({
                paymentRef,
                status: 'PENDING',
                ...data
            }, 'Payment record created successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('mpesa/stk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initiateSTKPush", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('mpesa/status/:checkoutRequestId'),
    __param(0, (0, common_1.Param)('checkoutRequestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "checkPaymentStatus", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('consultation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "payForConsultation", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createPayment", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments')
], PaymentsController);
