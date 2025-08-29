"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
const axios_1 = require("axios");
let NotificationsService = class NotificationsService {
    async notifyAdmin(subject, html) {
        try {
            const response = await axios_1.default.post('https://api.elasticemail.com/v2/email/send', null, {
                params: {
                    apikey: config_1.config.elasticEmailApiKey,
                    from: config_1.config.elasticEmailFrom,
                    to: config_1.config.elasticEmailFrom,
                    subject,
                    bodyHtml: html,
                },
            });
            return { success: true, response: response.data };
        }
        catch (error) {
            return { success: false, error: (error instanceof Error ? error.message : String(error)) };
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map