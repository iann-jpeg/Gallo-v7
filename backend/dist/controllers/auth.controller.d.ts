import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../config/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            role: import(".prisma/client").$Enums.Role;
            id: number;
            name: string;
            email: string;
            createdAt: Date;
        };
    }>;
    registerAdmin(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user: {
            role: import(".prisma/client").$Enums.Role;
            id: number;
            name: string;
            email: string;
            createdAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        data: {
            access_token: string;
            refresh_token: string;
            user: {
                role: import(".prisma/client").$Enums.Role;
                id: number;
                name: string;
                email: string;
                createdAt: Date;
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
                role: import(".prisma/client").$Enums.Role;
                id: number;
                name: string;
                email: string;
            };
        };
    }>;
    setupInitialAdmin(body: RegisterDto & {
        setupKey: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            role: import(".prisma/client").$Enums.Role;
            id: number;
            name: string;
            email: string;
            createdAt: Date;
        };
    }>;
    promoteUser(userId: number, req: any): Promise<{
        success: boolean;
        message: string;
        user: {
            role: import(".prisma/client").$Enums.Role;
            id: number;
            name: string;
            email: string;
            updatedAt: Date;
        };
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            role: import(".prisma/client").$Enums.Role;
            id: number;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
