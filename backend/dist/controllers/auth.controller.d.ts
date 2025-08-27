import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../config/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            name: string;
            id: number;
            createdAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    registerAdmin(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            name: string;
            id: number;
            createdAt: Date;
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
                name: string;
                id: number;
                createdAt: Date;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            };
        };
    }>;
    logout(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        success: boolean;
        data: {
            access_token: string;
            user: {
                name: string;
                id: number;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            };
        };
    }>;
    setupInitialAdmin(body: RegisterDto & {
        setupKey: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            name: string;
            id: number;
            createdAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    promoteUser(userId: number, req: any): Promise<{
        success: boolean;
        message: string;
        user: {
            name: string;
            id: number;
            updatedAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
}
