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
exports.OutsourcingController = void 0;
const common_1 = require("@nestjs/common");
const outsourcing_service_1 = require("./outsourcing.service");
let OutsourcingController = class OutsourcingController {
    constructor(outsourcingService) {
        this.outsourcingService = outsourcingService;
    }
    async createOutsourcingRequest(body) {
        return this.outsourcingService.createOutsourcingRequest(body);
    }
    async getOutsourcingRequests() {
        return this.outsourcingService.getOutsourcingRequests();
    }
};
exports.OutsourcingController = OutsourcingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OutsourcingController.prototype, "createOutsourcingRequest", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutsourcingController.prototype, "getOutsourcingRequests", null);
exports.OutsourcingController = OutsourcingController = __decorate([
    (0, common_1.Controller)('outsourcing'),
    __metadata("design:paramtypes", [outsourcing_service_1.OutsourcingService])
], OutsourcingController);
//# sourceMappingURL=outsourcing.controller.js.map