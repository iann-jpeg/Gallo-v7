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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../services/payment.service");
const payment_dto_1 = require("../config/payment.dto");
const jwt_auth_guard_1 = require("../middleware/jwt-auth.guard");
const roles_guard_1 = require("../middleware/roles.guard");
const roles_decorator_1 = require("../middleware/roles.decorator");
const public_decorator_1 = require("../middleware/public.decorator");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async findAll(page = 1, limit = 10, status) {
        return this.paymentService.findAll(+page, +limit, status);
    }
    async findOne(id, req) {
        return this.paymentService.findOne(+id, req.user);
    }
    async create(createPaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }
    async initiatePayment(createPaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }
    async processPayment(id) {
        return this.paymentService.processPayment(+id);
    }
    async mpesaCallback(callbackData) {
        return this.paymentService.handleMpesaCallback(callbackData);
    }
    async paypalCallback(callbackData) {
        return this.paymentService.handlePaypalCallback(callbackData);
    }
    async cardCallback(callbackData) {
        return this.paymentService.handleCardCallback(callbackData);
    }
    async paystackCallback(callbackData, req) {
        const signature = req.headers['x-paystack-signature'];
        return this.paymentService.handlePaystackCallback(callbackData, signature);
    }
    async verifyPayment(reference) {
        return this.paymentService.verifyPaystackPayment(reference);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('initiate'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initiatePayment", null);
__decorate([
    (0, common_1.Post)('process/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "processPayment", null);
__decorate([
    (0, common_1.Post)('callback/mpesa'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentCallbackDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "mpesaCallback", null);
__decorate([
    (0, common_1.Post)('callback/paypal'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentCallbackDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "paypalCallback", null);
__decorate([
    (0, common_1.Post)('callback/card'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentCallbackDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "cardCallback", null);
__decorate([
    (0, common_1.Post)('callback/paystack'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "paystackCallback", null);
__decorate([
    (0, common_1.Get)('verify/:reference'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verifyPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map