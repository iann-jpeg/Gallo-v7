import { AuthUser } from '../types/api.types';
export declare class AuthService {
    ensureDefaultAdmin(): Promise<void>;
    validateUser(email: string, password: string): Promise<AuthUser | null>;
    login(email: string, password: string): Promise<{
        token: string;
        user: AuthUser;
    }>;
    adminLogin(email: string, password: string): Promise<{
        success: boolean;
        message: string;
        token?: undefined;
        adminUser?: undefined;
    } | {
        success: boolean;
        token: string;
        adminUser: {
            id: number;
            name: string;
            email: string;
            role: "ADMIN";
        };
        message?: undefined;
    }>;
}
