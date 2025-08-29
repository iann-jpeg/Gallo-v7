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
exports.QuotesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const quotes_service_1 = require("../services/quotes.service");
const quote_dto_1 = require("../config/quote.dto");
const base_controller_1 = require("./base.controller");
const public_decorator_1 = require("../middleware/public.decorator");
let QuotesController = class QuotesController extends base_controller_1.BaseController {
    constructor(quotesService) {
        super();
        this.quotesService = quotesService;
    }
    async findAll(page, limit) {
        try {
            const quotes = await this.quotesService.findAll({ page, limit });
            return this.handleSuccess(quotes, 'Quotes retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const quote = await this.quotesService.findOne(+id);
            if (!quote) {
                throw new common_1.BadRequestException('Quote not found');
            }
            return this.handleSuccess(quote, 'Quote retrieved successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async create(data, documents) {
        try {
            const quote = await this.quotesService.createWithDocuments(data, documents);
            return this.handleSuccess(quote, 'Quote created successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async update(id, data) {
        try {
            const quote = await this.quotesService.update(+id, data);
            if (!quote) {
                throw new common_1.BadRequestException('Quote not found');
            }
            return this.handleSuccess(quote, 'Quote updated successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async remove(id) {
        try {
            const quote = await this.quotesService.remove(+id);
            if (!quote) {
                throw new common_1.BadRequestException('Quote not found');
            }
            return this.handleSuccess(null, 'Quote deleted successfully');
        }
        catch (error) {
            return this.handleError(error);
        }
    }
};
exports.QuotesController = QuotesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('document', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/quotes',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `quote-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(pdf|jpg|jpeg|png|doc|docx)$/)) {
                return callback(new common_1.BadRequestException('Only PDF, JPG, PNG, and DOC files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quote_dto_1.CreateQuoteDto, Array]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, quote_dto_1.UpdateQuoteDto]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "remove", null);
exports.QuotesController = QuotesController = __decorate([
    (0, common_1.Controller)('quotes'),
    __metadata("design:paramtypes", [quotes_service_1.QuotesService])
], QuotesController);
//# sourceMappingURL=quotes.controller.js.map