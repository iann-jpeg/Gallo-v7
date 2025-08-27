"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
class BaseController {
    handleSuccess(data, message) {
        return {
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        };
    }
    handleError(error) {
        const message = error.message || 'An unexpected error occurred';
        throw new common_1.BadRequestException({
            success: false,
            message,
            timestamp: new Date().toISOString()
        });
    }
}
exports.BaseController = BaseController;
