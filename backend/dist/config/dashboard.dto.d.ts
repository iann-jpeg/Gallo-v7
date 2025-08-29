export interface DashboardStatsDto {
    totalClaims: number;
    totalQuotes: number;
    totalConsultations: number;
    totalDiaspora: number;
    totalUsers: number;
    pendingClaims: number;
    pendingQuotes: number;
    monthlyRevenue?: number;
    conversionRate?: number;
    approvedClaims?: number;
    rejectedClaims?: number;
    approvedQuotes?: number;
    thisMonthClaims?: number;
    thisMonthQuotes?: number;
}
export declare class AdminStatsQueryDto {
    startDate?: string;
    endDate?: string;
    period?: string;
}
