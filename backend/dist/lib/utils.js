"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
exports.handlePrismaError = handlePrismaError;
exports.log = log;
function paginate(page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    return { take, skip };
}
function handlePrismaError(error) {
    if (error.code === 'P2025') {
        return { success: false, message: 'Not found' };
    }
    return { success: false, message: error.message || 'Unknown error' };
}
function log(...args) {
    if (process.env.NODE_ENV !== 'production') {
        console.log('[LOG]', ...args);
    }
}
//# sourceMappingURL=utils.js.map