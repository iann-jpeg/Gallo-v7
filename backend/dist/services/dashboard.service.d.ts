import { PrismaService } from '../prisma/prisma.service';
import { AdminStatsQueryDto } from '../config/dashboard.dto';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
                id: number;
                userId: number | null;
                policyNumber: string;
                claimType: string;
                incidentDate: Date;
                estimatedLoss: number;
                description: string;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                submitterEmail: string | null;
                submitterName: string | null;
                submitterPhone: string | null;
            })[];
            outsourcing: {
                id: number;
                userId: number | null;
                description: string;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                category: string;
                budget: number | null;
                title: string;
                organizationName: string | null;
                services: string[];
                timeline: string | null;
            }[];
            consultations: {
                name: string;
                id: number;
                userId: number | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                phone: string;
                country: string | null;
                timezone: string | null;
                serviceInterest: string;
                serviceType: string | null;
                scheduledAt: Date | null;
                consultationDate: Date | null;
                meetingLink: string | null;
                duration: number | null;
                notes: string | null;
            }[];
            payments: {
                id: number;
                userId: number | null;
                description: string | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                claimId: number | null;
                quoteId: number | null;
                amount: number;
                currency: string;
                reference: string | null;
                transactionId: string | null;
                method: string | null;
                paymentMethod: string | null;
                clientName: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
            diaspora: {
                name: string;
                id: number;
                userId: number | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
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
