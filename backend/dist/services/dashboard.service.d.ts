import { AdminStatsQueryDto } from '../config/dashboard.dto';
export declare class DashboardService {
    getDashboardStats(query?: AdminStatsQueryDto): Promise<{
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
        allSubmissions: {
            claims: ({
                documents: {
                    createdAt: Date;
                    id: number;
                    updatedAt: Date;
                    filename: string;
                    originalName: string;
                    mimeType: string;
                    size: number;
                    path: string;
                    claimId: number | null;
                    quoteId: number | null;
                    outsourcingId: number | null;
                    content: Uint8Array | null;
                }[];
            } & {
                createdAt: Date;
                status: string;
                id: number;
                userId: number | null;
                policyNumber: string;
                claimType: string;
                incidentDate: Date;
                estimatedLoss: number;
                description: string;
                updatedAt: Date;
                submitterEmail: string | null;
                submitterName: string | null;
                submitterPhone: string | null;
            })[];
            outsourcing: {
                createdAt: Date;
                status: string;
                id: number;
                userId: number | null;
                updatedAt: Date;
                organizationName: string;
                coreFunctions: string | null;
                location: string;
                address: string | null;
                email: string;
                services: string[];
                natureOfOutsourcing: string;
                budgetRange: string;
            }[];
            consultations: {
                createdAt: Date;
                status: string;
                id: number;
                userId: number | null;
                updatedAt: Date;
                name: string;
                email: string;
                phone: string;
                country: string;
                timezone: string;
                serviceInterest: string;
                serviceType: string;
                scheduledAt: Date | null;
                meetingLink: string | null;
                duration: number;
                notes: string | null;
            }[];
            payments: {
                createdAt: Date;
                status: string;
                id: number;
                userId: number | null;
                description: string | null;
                updatedAt: Date;
                amount: number;
                currency: string;
                paymentMethod: string;
                reference: string | null;
                transactionId: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
            diaspora: {
                createdAt: Date;
                status: string;
                id: number;
                userId: number | null;
                updatedAt: Date;
                name: string;
                email: string;
                phone: string;
                country: string;
                timezone: string;
                serviceInterest: string;
                scheduledAt: Date | null;
            }[];
        };
        totalSubmissions: number;
        submissionsThisMonth: number;
    }>;
    getActivities(limit?: number): Promise<({
        id: string;
        type: string;
        createdAt: Date;
        status: string;
        policyNumber: string;
        claimType: string;
        estimatedLoss: number;
        submitterEmail: string | null;
        submitterName: string | null;
    } | {
        id: string;
        type: string;
        createdAt: Date;
        status: string;
        organizationName: string;
        email: string;
        services: string[];
        budgetRange: string;
    } | {
        id: string;
        type: string;
        createdAt: Date;
        status: string;
        name: string;
        email: string;
        serviceType: string;
    } | {
        id: string;
        type: string;
        createdAt: Date;
        status: string;
        amount: number;
        paymentMethod: string;
    } | {
        id: string;
        type: string;
        createdAt: Date;
        status: string;
        name: string;
        email: string;
        country: string;
    })[]>;
    getTopStats(): Promise<{
        thisMonthClaims: number;
        thisMonthOutsourcing: number;
        thisMonthConsultations: number;
        thisMonthPayments: number;
        totalRevenue: number;
    }>;
}
