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
exports.DiasporaController = void 0;
const common_1 = require("@nestjs/common");
const diaspora_service_1 = require("../services/diaspora.service");
const diaspora_dto_1 = require("../config/diaspora.dto");
const public_decorator_1 = require("../middleware/public.decorator");
let DiasporaController = class DiasporaController {
    constructor(diasporaService) {
        this.diasporaService = diasporaService;
    }
    async findAll(page, limit) {
        return this.diasporaService.findAll({ page, limit });
    }
    async findOne(id) {
        return this.diasporaService.findOne(+id);
    }
    async create(data) {
        return this.diasporaService.create(data);
    }
    async update(id, data) {
        return this.diasporaService.update(+id, data);
    }
    async remove(id) {
        return this.diasporaService.remove(+id);
    }
};
exports.DiasporaController = DiasporaController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DiasporaController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiasporaController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diaspora_dto_1.CreateDiasporaDto]),
    __metadata("design:returntype", Promise)
], DiasporaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, diaspora_dto_1.UpdateDiasporaDto]),
    __metadata("design:returntype", Promise)
], DiasporaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiasporaController.prototype, "remove", null);
exports.DiasporaController = DiasporaController = __decorate([
    (0, common_1.Controller)('diaspora'),
    __metadata("design:paramtypes", [diaspora_service_1.DiasporaService])
], DiasporaController);
//# sourceMappingURL=diaspora.controller.js.map