export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'SUPER_ADMIN' | 'USER';
}
export interface AuthLoginRequest {
    email: string;
    password: string;
}
export interface AuthLoginResponse {
    token: string;
    user: AuthUser;
}
export interface DashboardStats {
    totalClaims: number;
    totalQuotes: number;
    totalConsultations: number;
    totalOutsourcingRequests: number;
    totalPayments: number;
    totalDiasporaRequests: number;
    totalUsers: number;
    pendingClaims: number;
    activePolicies: number;
    monthlyRevenue: number;
    conversionRate: number;
    totalSubmissions: number;
    allSubmissions: {
        claims: any[];
        outsourcing: any[];
        consultations: any[];
        payments: any[];
        diaspora: any[];
    };
}
