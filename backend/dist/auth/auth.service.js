"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../db/prisma");
const bcrypt = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
let AuthService = class AuthService {
    async ensureDefaultAdmin() {
        const email = 'admin@galloways.co.ke';
        const password = 'admin123';
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!existing) {
            const hash = await bcrypt.hash(password, 10);
            await prisma_1.prisma.user.create({
                data: {
                    name: 'Admin',
                    email,
                    password: hash,
                    role: 'ADMIN',
                },
            });
        }
    }
    async validateUser(email, password) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user || user.role !== 'ADMIN')
            return null;
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return null;
        return { id: String(user.id), name: user.name, email: user.email, role: user.role };
    }
    async login(email, password) {
        await this.ensureDefaultAdmin();
        const user = await this.validateUser(email, password);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid email or password');
        const token = (0, jsonwebtoken_1.sign)({ sub: user.id, role: user.role }, config_1.config.jwtSecret, { expiresIn: '1d' });
        return { token, user };
    }
    async adminLogin(email, password) {
        try {
            const admin = await prisma_1.prisma.user.findUnique({ where: { email } });
            if (!admin || admin.role !== 'ADMIN') {
                return { success: false, message: 'Invalid credentials' };
            }
            const valid = await bcrypt.compare(password, admin.password);
            if (!valid) {
                return { success: false, message: 'Invalid credentials' };
            }
            const token = (0, jsonwebtoken_1.sign)({ sub: admin.id, role: admin.role }, config_1.config.jwtSecret, { expiresIn: '1d' });
            return {
                success: true,
                token,
                adminUser: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                },
            };
        }
        catch (err) {
            return { success: false, message: 'Authentication error' };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map