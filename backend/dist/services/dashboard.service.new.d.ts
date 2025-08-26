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
                    path: string;
                    filename: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    originalName: string;
                    mimeType: string;
                    size: number;
                    claimId: number | null;
                    quoteId: number | null;
                    content: Uint8Array | null;
                    outsourcingId: number | null;
                }[];
            } & {
                description: string;
                status: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number | null;
                policyNumber: string;
                claimType: string;
                incidentDate: Date;
                estimatedLoss: number;
                submitterEmail: string | null;
                submitterName: string | null;
                submitterPhone: string | null;
            })[];
            outsourcing: {
                location: string;
                status: string;
                id: number;
                email: string;
                createdAt: Date;
                updatedAt: Date;
                userId: number | null;
                organizationName: string;
                coreFunctions: string | null;
                address: string | null;
                services: string[];
                natureOfOutsourcing: string;
                budgetRange: string;
            }[];
            consultations: {
                message: string;
                name: string;
                status: string;
                id: number;
                email: string;
                createdAt: Date;
                updatedAt: Date;
                userId: number | null;
                phone: string;
                country: string | null;
                timezone: string | null;
                scheduledAt: Date | null;
                company: string | null;
                consultationDate: string;
                consultationTime: string;
                serviceType: string;
                duration: number | null;
                meetingLink: string | null;
                meetingType: string | null;
                notes: string | null;
            }[];
            payments: {
                status: string;
                id: number;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                email: string;
                createdAt: Date;
                updatedAt: Date;
                userId: number | null;
                policyNumber: string | null;
                clientName: string;
                amount: number;
                paymentMethod: string;
                phoneNumber: string | null;
                cardNumber: string | null;
                expiryDate: string | null;
                cvv: string | null;
                billingPhone: string | null;
                transactionId: string | null;
            }[];
            diaspora: {
                name: string;
                status: string;
                id: number;
                email: string;
                createdAt: Date;
                updatedAt: Date;
                userId: number | null;
                phone: string;
                country: string;
                timezone: string;
                scheduledAt: Date | null;
                serviceInterest: string;
            }[];
        };
        totalSubmissions: number;
        submissionsThisMonth: number;
    }>;
    getActivities(limit?: number): Promise<({
        type: string;
        status: string;
        id: number;
        createdAt: Date;
        policyNumber: string;
        claimType: string;
        estimatedLoss: number;
        submitterEmail: string | null;
        submitterName: string | null;
    } | {
        type: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        organizationName: string;
        services: string[];
        budgetRange: string;
    } | {
        type: string;
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
        consultationDate: string;
        serviceType: string;
    } | {
        type: string;
        status: string;
        id: number;
        createdAt: Date;
        clientName: string;
        amount: number;
        paymentMethod: string;
    } | {
        type: string;
        name: string;
        status: string;
        id: number;
        email: string;
        createdAt: Date;
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
