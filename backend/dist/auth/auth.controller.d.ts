import { AuthService } from './auth.service';
import { AuthLoginRequest, AuthLoginResponse, AuthUser } from '../types/api.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: AuthLoginRequest): Promise<AuthLoginResponse>;
    getProfile(req: any): Promise<AuthUser>;
}
