import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from '../config/auth.dto';
export declare class AuthService {
    private prisma;
    private readonly JWT_SECRET;
    private readonly REFRESH_TOKEN_SECRET;
    constructor(prisma: PrismaService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            createdAt: Date;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    registerAdmin(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            createdAt: Date;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        data: {
            access_token: string;
            refresh_token: string;
            user: {
                id: number;
                createdAt: Date;
                name: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            };
        };
    }>;
    logout(user: any): Promise<{
        success: boolean;
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        success: boolean;
        data: {
            access_token: string;
            user: {
                id: number;
                name: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            };
        };
    }>;
    getProfile(userId: number): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    verifyToken(token: string): Promise<any>;
    createInitialAdmin(dto: RegisterDto, setupKey?: string): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            createdAt: Date;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    promoteUserToAdmin(userId: number, currentAdminId: number): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            updatedAt: Date;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    isAdmin(userId: number): Promise<boolean>;
}
