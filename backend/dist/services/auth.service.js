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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
        this.JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
        this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret';
    }
    async register(dto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email }
            });
            if (existingUser) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(dto.password, 12);
            const userCount = await this.prisma.user.count();
            const role = userCount === 0 ? client_1.Role.ADMIN : client_1.Role.USER;
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email.toLowerCase(),
                    password: hashedPassword,
                    role
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            return {
                success: true,
                message: `Account created successfully${role === client_1.Role.ADMIN ? ' with admin privileges' : ''}`,
                user
            };
        }
        catch (error) {
            console.error('Registration error:', error);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error('Registration failed');
        }
    }
    async registerAdmin(dto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email }
            });
            if (existingUser) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(dto.password, 12);
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email.toLowerCase(),
                    password: hashedPassword,
                    role: client_1.Role.ADMIN
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            return {
                success: true,
                message: 'Admin account created successfully',
                user
            };
        }
        catch (error) {
            console.error('Admin registration error:', error);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error('Admin registration failed');
        }
    }
    async login(dto) {
        try {
            console.log('🔍 Login attempt for:', dto.email.toLowerCase());
            const user = await this.prisma.user.findUnique({
                where: { email: dto.email.toLowerCase() },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    role: true,
                    createdAt: true
                }
            });
            if (!user) {
                console.log('❌ User not found:', dto.email.toLowerCase());
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            console.log('✅ User found:', {
                id: user.id,
                email: user.email,
                role: user.role,
                hasPassword: !!user.password
            });
            const passwordValid = await bcrypt.compare(dto.password, user.password);
            console.log('🔑 Password validation result:', passwordValid);
            if (!passwordValid) {
                console.log('❌ Password invalid for user:', user.email);
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const tokenPayload = {
                userId: user.id,
                sub: user.id,
                role: user.role,
                email: user.email
            };
            const accessToken = jwt.sign(tokenPayload, this.JWT_SECRET, { expiresIn: '24h' });
            const refreshToken = jwt.sign({ sub: user.id, role: user.role }, this.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                success: true,
                data: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    user: userWithoutPassword,
                },
            };
        }
        catch (error) {
            console.error('Login error:', error);
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Login failed');
        }
    }
    async logout(user) {
        return {
            success: true,
            message: 'Logged out successfully'
        };
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw new common_1.UnauthorizedException('Refresh token required');
            }
            const payload = jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET);
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const tokenPayload = {
                userId: user.id,
                sub: user.id,
                role: user.role,
                email: user.email
            };
            const accessToken = jwt.sign(tokenPayload, this.JWT_SECRET, { expiresIn: '24h' });
            return {
                success: true,
                data: {
                    access_token: accessToken,
                    user
                }
            };
        }
        catch (error) {
            console.error('Token refresh error:', error);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async getProfile(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                success: true,
                data: user,
            };
        }
        catch (error) {
            console.error('Get profile error:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error('Failed to get profile');
        }
    }
    async verifyToken(token) {
        try {
            const payload = jwt.verify(token, this.JWT_SECRET);
            return payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async createInitialAdmin(dto, setupKey) {
        try {
            const expectedSetupKey = process.env.ADMIN_SETUP_KEY || 'galloways-admin-2025';
            if (setupKey !== expectedSetupKey) {
                throw new common_1.UnauthorizedException('Invalid setup key');
            }
            const adminCount = await this.prisma.user.count({
                where: { role: client_1.Role.ADMIN }
            });
            if (adminCount > 0) {
                throw new common_1.ConflictException('Admin user already exists. Use regular registration.');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email.toLowerCase() }
            });
            if (existingUser) {
                const updatedUser = await this.prisma.user.update({
                    where: { id: existingUser.id },
                    data: { role: client_1.Role.ADMIN },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                        updatedAt: true
                    }
                });
                return {
                    success: true,
                    message: 'Existing user upgraded to admin successfully',
                    user: updatedUser
                };
            }
            const hashedPassword = await bcrypt.hash(dto.password, 12);
            const admin = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email.toLowerCase(),
                    password: hashedPassword,
                    role: client_1.Role.ADMIN
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            return {
                success: true,
                message: 'Initial admin account created successfully',
                user: admin
            };
        }
        catch (error) {
            console.error('Initial admin creation error:', error);
            if (error instanceof common_1.ConflictException || error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new Error('Initial admin creation failed');
        }
    }
    async promoteUserToAdmin(userId, currentAdminId) {
        try {
            const currentAdmin = await this.prisma.user.findUnique({
                where: { id: currentAdminId },
                select: { role: true }
            });
            if ((currentAdmin === null || currentAdmin === void 0 ? void 0 : currentAdmin.role) !== client_1.Role.ADMIN) {
                throw new common_1.UnauthorizedException('Only admins can promote users');
            }
            const targetUser = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, name: true, email: true, role: true }
            });
            if (!targetUser) {
                throw new common_1.NotFoundException('User not found');
            }
            if (targetUser.role === client_1.Role.ADMIN) {
                throw new common_1.ConflictException('User is already an admin');
            }
            const promotedUser = await this.prisma.user.update({
                where: { id: userId },
                data: { role: client_1.Role.ADMIN },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    updatedAt: true
                }
            });
            return {
                success: true,
                message: `User ${promotedUser.name} promoted to admin successfully`,
                user: promotedUser
            };
        }
        catch (error) {
            console.error('User promotion error:', error);
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error('User promotion failed');
        }
    }
    async isAdmin(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { role: true }
            });
            return (user === null || user === void 0 ? void 0 : user.role) === client_1.Role.ADMIN;
        }
        catch (error) {
            console.error('Admin check error:', error);
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map