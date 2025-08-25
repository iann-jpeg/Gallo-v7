"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./middleware/jwt-auth.guard");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./routes/auth.module");
const users_module_1 = require("./routes/users.module");
const products_module_1 = require("./routes/products.module");
const claims_module_1 = require("./routes/claims.module");
const quotes_module_1 = require("./routes/quotes.module");
const consultations_module_1 = require("./routes/consultations.module");
const diaspora_module_1 = require("./routes/diaspora.module");
const health_module_1 = require("./routes/health.module");
const dashboard_module_1 = require("./routes/dashboard.module");
const documents_module_1 = require("./routes/documents.module");
const outsourcing_module_1 = require("./routes/outsourcing.module");
const payment_module_1 = require("./routes/payment.module");
const resource_module_1 = require("./routes/resource.module");
const static_files_module_1 = require("./routes/static-files.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            claims_module_1.ClaimsModule,
            quotes_module_1.QuotesModule,
            consultations_module_1.ConsultationsModule,
            diaspora_module_1.DiasporaModule,
            health_module_1.HealthModule,
            dashboard_module_1.DashboardModule,
            documents_module_1.DocumentsModule,
            outsourcing_module_1.OutsourcingModule,
            payment_module_1.PaymentModule,
            resource_module_1.ResourceModule,
            static_files_module_1.StaticFilesModule,
            admin_module_1.AdminModule,
        ],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
        exports: [prisma_service_1.PrismaService],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map