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
const auth_module_1 = require("../auth/auth.module");
const dashboard_module_1 = require("../modules/dashboard/dashboard.module");
const claims_module_1 = require("../modules/claims/claims.module");
const consultations_module_1 = require("../modules/consultations/consultations.module");
const outsourcing_module_1 = require("../modules/outsourcing/outsourcing.module");
const payments_module_1 = require("../modules/payments/payments.module");
const quotes_module_1 = require("../modules/quotes/quotes.module");
const diaspora_module_1 = require("../modules/diaspora/diaspora.module");
const resources_module_1 = require("../modules/resources/resources.module");
const notifications_module_1 = require("../modules/notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            claims_module_1.ClaimsModule,
            consultations_module_1.ConsultationsModule,
            outsourcing_module_1.OutsourcingModule,
            payments_module_1.PaymentsModule,
            quotes_module_1.QuotesModule,
            diaspora_module_1.DiasporaModule,
            resources_module_1.ResourcesModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map