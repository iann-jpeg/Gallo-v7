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
                document: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    claimId: number | null;
                    quoteId: number | null;
                    filename: string;
                    originalName: string;
                    mimeType: string;
                    size: number;
                    path: string;
                    outsourcingId: number | null;
                    content: Uint8Array | null;
                }[];
            } & {
                status: string;
                id: number;
                userId: number | null;
                policyNumber: string;
                claimType: string;
                incidentDate: Date;
                estimatedLoss: number;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                submitterEmail: string | null;
                submitterName: string | null;
                submitterPhone: string | null;
            })[];
            outsourcing: {
                status: string;
                id: number;
                userId: number | null;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                category: string;
                email: string | null;
                organizationName: string | null;
                services: string[];
                budgetRange: string | null;
                budget: number | null;
                timeline: string | null;
            }[];
            consultations: {
                status: string;
                id: number;
                userId: number | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                phone: string;
                country: string | null;
                timezone: string | null;
                serviceInterest: string;
                serviceType: string | null;
                company: string | null;
                scheduledAt: Date | null;
                consultationDate: Date | null;
                meetingLink: string | null;
                duration: number | null;
                notes: string | null;
            }[];
            payments: {
                status: string;
                amount: number;
                id: number;
                userId: number | null;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                currency: string;
                reference: string | null;
                transactionId: string | null;
                method: string | null;
                paymentMethod: string | null;
                clientName: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                claimId: number | null;
                quoteId: number | null;
            }[];
            diaspora: {
                status: string;
                id: number;
                userId: number | null;
                createdAt: Date;
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
    getActivities(limit?: number): Promise<any[]>;
    getTopStats(): Promise<{
        thisMonthClaims: number;
        thisMonthOutsourcing: number;
        thisMonthConsultations: number;
        thisMonthPayments: number;
        totalRevenue: number;
    }>;
}
