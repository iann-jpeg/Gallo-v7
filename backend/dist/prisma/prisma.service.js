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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
            errorFormat: 'pretty',
        });
        this.maxRetries = 3;
        this.retryDelay = 5000;
        const dbUrl = process.env.DATABASE_URL || 'Not set';
        console.log('Database URL configuration:', this.maskDatabaseUrl(dbUrl));
    }
    maskDatabaseUrl(url) {
        try {
            const maskedUrl = new URL(url);
            if (maskedUrl.password) {
                maskedUrl.password = '****';
            }
            return maskedUrl.toString();
        }
        catch (e) {
            return 'Invalid database URL';
        }
    }
    async connectWithRetry(attempt = 1) {
        try {
            console.log(`Attempting database connection (attempt ${attempt}/${this.maxRetries})...`);
            await this.$connect();
            console.log('✅ Database connected successfully');
        }
        catch (error) {
            console.error(`❌ Database connection attempt ${attempt} failed:`, {
                message: error.message,
                code: error.code,
                meta: error.meta,
            });
            if (attempt < this.maxRetries) {
                console.log(`⏳ Retrying in ${this.retryDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.connectWithRetry(attempt + 1);
            }
            else {
                console.error('❌ Max retries reached. Could not establish database connection');
                throw error;
            }
        }
    }
    async onModuleInit() {
        var _a;
        if (!process.env.DATABASE_URL) {
            console.warn('⚠️  DATABASE_URL not set — skipping Prisma connection (safe for local testing)');
            return;
        }
        try {
            await this.connectWithRetry();
        }
        catch (error) {
            console.error('❌ Database connection failed after all retries:', (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            console.log('⚠️  Server will continue without database connection');
        }
    }
    async onModuleDestroy() {
        console.log('Disconnecting from database...');
        await this.$disconnect();
        console.log('Database disconnected successfully');
    }
    async enableShutdownHooks(app) {
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map