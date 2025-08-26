"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../db/prisma");
const utils_1 = require("../../lib/utils");
let ResourcesService = class ResourcesService {
    async getResources() {
        try {
            const resources = await prisma_1.prisma.resource.findMany({
                where: { adminOnly: false },
                orderBy: { createdAt: 'desc' },
            });
            return resources;
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
    async downloadResource(id) {
        try {
            const resource = await prisma_1.prisma.resource.findUnique({
                where: { id: Number(id) },
            });
            if (!resource)
                return { success: false, message: 'Not found' };
            return resource;
        }
        catch (error) {
            return (0, utils_1.handlePrismaError)(error);
        }
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)()
], ResourcesService);
//# sourceMappingURL=resources.service.js.map