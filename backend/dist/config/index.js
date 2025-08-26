"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.config = {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'production',
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    corsOrigins: ((_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['*'],
    elasticEmailApiKey: process.env.ELASTIC_EMAIL_API_KEY,
    elasticEmailFrom: process.env.ELASTIC_EMAIL_FROM,
};
//# sourceMappingURL=index.js.map