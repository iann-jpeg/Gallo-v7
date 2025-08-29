export declare class AdminAuthController {
    login(): Promise<{
        success: boolean;
        token: string;
        adminUser: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
