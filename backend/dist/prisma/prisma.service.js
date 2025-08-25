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
            log: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'info'] : ['error', 'warn'],
            errorFormat: 'minimal',
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
    }
    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ Database connected successfully with optimized settings');
        }
        catch (error) {
            console.error('❌ Database connection failed:', error.message || 'Unknown error');
            console.log('⚠️  Server will continue without database connection');
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        console.log('🔌 Database connection closed');
    }
    async enableShutdownHooks(app) {
        process.on('beforeExit', async () => {
            console.log('📤 Gracefully shutting down database connections...');
            await this.$disconnect();
        });
    }
    async healthCheck() {
        try {
            await this.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            console.error('Database health check failed:', error);
            return false;
        }
    }
    async executeTransaction(operations, maxRetries = 3) {
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                return await this.$transaction(operations);
            }
            catch (error) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw error;
                }
                console.warn(`Transaction attempt ${attempt} failed, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
        throw new Error('Max transaction retries exceeded');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map