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
exports.ConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../middleware/public.decorator");
const consultations_service_1 = require("../services/consultations.service");
const consultation_dto_1 = require("../config/consultation.dto");
const base_controller_1 = require("./base.controller");
let ConsultationsController = class ConsultationsController extends base_controller_1.BaseController {
    constructor(consultationsService) {
        super();
        this.consultationsService = consultationsService;
    }
    async findAll(page, limit) {
        try {
            const consultations = await this.consultationsService.findAll({ page, limit });
            return this.handleSuccess(consultations, 'Consultations retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const consultation = await this.consultationsService.findOne(+id);
            if (!consultation) {
                throw new common_1.NotFoundException('Consultation not found');
            }
            return this.handleSuccess(consultation, 'Consultation retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async create(data) {
        try {
            console.log('Received consultation data:', data);
            if (!data.name || !data.email || !data.phone || !data.serviceType || !data.consultationDate || !data.consultationTime || !data.message) {
                throw new common_1.BadRequestException('All required fields must be provided: name, email, phone, serviceType, consultationDate, consultationTime, message');
            }
            const consultation = await this.consultationsService.create(data);
            return this.handleSuccess(consultation, 'Your consultation has been booked successfully. You will receive a confirmation email shortly.');
        }
        catch (error) {
            console.error('Error creating consultation:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error instanceof Error) {
                return this.handleError(new common_1.BadRequestException(error.message));
            }
            return this.handleError(new common_1.BadRequestException('Failed to book consultation. Please try again.'));
        }
    }
    async update(id, data) {
        try {
            const consultation = await this.consultationsService.update(+id, data);
            if (!consultation) {
                throw new common_1.NotFoundException('Consultation not found');
            }
            return this.handleSuccess(consultation, 'Consultation updated successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async remove(id) {
        try {
            const consultation = await this.consultationsService.remove(+id);
            if (!consultation) {
                throw new common_1.NotFoundException('Consultation not found');
            }
            return this.handleSuccess(null, 'Consultation deleted successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
};
exports.ConsultationsController = ConsultationsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, consultation_dto_1.UpdateConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "remove", null);
exports.ConsultationsController = ConsultationsController = __decorate([
    (0, common_1.Controller)('consultations'),
    __metadata("design:paramtypes", [consultations_service_1.ConsultationsService])
], ConsultationsController);
//# sourceMappingURL=consultations.controller.js.map