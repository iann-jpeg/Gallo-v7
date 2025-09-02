import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    getClaimById(id: number): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                email: string;
            } | null;
            documents: {
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
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    deleteClaim(id: number): Promise<{
        success: boolean;
        data: null;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
        message?: undefined;
    }>;
    exportClaimsData(format: 'csv' | 'json'): Promise<{
        success: boolean;
        data: {
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
        }[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        data: string;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
        message?: undefined;
    }>;
    constructor(prisma: PrismaService);
    getQuoteById(id: number): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                email: string;
            } | null;
            documents: {
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
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            location: string | null;
            product: string;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    deleteQuote(id: number): Promise<{
        success: boolean;
        data: null;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
        message?: undefined;
    }>;
    exportQuotesData(format: 'csv' | 'json'): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            location: string | null;
            product: string;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
        }[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        data: string;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
        message?: undefined;
    }>;
    getDashboardData(): Promise<{
        success: boolean;
        data: {
            totalUsers: number;
            totalClaims: number;
            totalQuotes: number;
            totalConsultations: number;
            totalOutsourcingRequests: number;
            totalDiasporaRequests: number;
            pendingClaims: number;
            pendingConsultations: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getSystemHealth(): Promise<{
        healthy: boolean;
        message: any;
    }>;
    getDashboardStats(): Promise<{
        success: boolean;
        data: {
            totalUsers: number;
            totalClaims: number;
            totalQuotes: number;
            totalConsultations: number;
            totalOutsourcingRequests: number;
            totalDiasporaRequests: number;
            pendingClaims: number;
            pendingConsultations: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllUsers(page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
            users: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateUserStatus(userId: number, status: string): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllClaims(page?: number, limit?: number, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            claims: ({
                user: {
                    name: string;
                    email: string;
                } | null;
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
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateClaimStatus(claimId: number, status: string, adminId?: number): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllConsultations(page?: number, limit?: number, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            consultations: {
                id: number;
                userId: number | null;
                status: string;
                createdAt: Date;
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
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateConsultationStatus(consultationId: number, status: string, adminId?: number): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllQuotes(page?: number, limit?: number, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            quotes: ({
                user: {
                    name: string;
                    email: string;
                } | null;
                documents: {
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
                status: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                location: string | null;
                product: string;
                budget: string | null;
                coverage: string | null;
                details: string | null;
                contactMethod: string;
                bestTime: string | null;
            })[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateQuoteStatus(quoteId: number, status: string, adminId?: number): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            location: string | null;
            product: string;
            budget: string | null;
            coverage: string | null;
            details: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllOutsourcingRequests(page?: number, limit?: number, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            requests: ({
                user: {
                    name: string;
                    email: string;
                } | null;
            } & {
                id: number;
                userId: number | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                location: string;
                organizationName: string;
                coreFunctions: string | null;
                address: string | null;
                services: string[];
                natureOfOutsourcing: string;
                budgetRange: string;
            })[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getOutsourcingStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            pending: number;
            inProgress: number;
            completed: number;
            rejected: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateOutsourcingRequestStatus(requestId: number, status: string, notes?: string | number, adminId?: number): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            location: string;
            organizationName: string;
            coreFunctions: string | null;
            address: string | null;
            services: string[];
            natureOfOutsourcing: string;
            budgetRange: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getComprehensiveDashboardStats(): Promise<{
        success: boolean;
        data: {
            totalUsers: number;
            totalClaims: number;
            totalQuotes: number;
            totalConsultations: number;
            totalOutsourcingRequests: number;
            totalDiasporaRequests: number;
            pendingClaims: number;
            pendingConsultations: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getRecentActivities(limit?: number): Promise<{
        success: boolean;
        data: {
            activities: {
                id: string;
                type: string;
                createdAt: any;
                raw: any;
            }[];
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    scheduleConsultationMeeting(id: number, meetingData: any): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getUserStats(): Promise<{
        success: boolean;
        data: {
            total: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteUser(id: number): Promise<{
        success: boolean;
        data: null;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getClaimsStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            pending: number;
            approved: number;
            rejected: number;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    downloadDocumentById(id: number, res: any): Promise<any>;
    getConsultationById(id: number): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
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
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    scheduleMeeting(id: number, meetingData: any): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    sendWhatsAppMeetingDetails(id: number, data: any): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    getAllPayments(page?: number, limit?: number, search?: string): Promise<{
        success: boolean;
        data: {
            payments: {
                id: number;
                userId: number | null;
                description: string | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                amount: number;
                currency: string;
                paymentMethod: string;
                reference: string | null;
                transactionId: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getPaymentStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            pending: number;
            completed: number;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updatePaymentStatus(id: number, status: string): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            description: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            currency: string;
            paymentMethod: string;
            reference: string | null;
            transactionId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getNotifications(limit?: number): Promise<{
        success: boolean;
        data: {
            notifications: any[];
        };
        message: string;
    }>;
    createNotification(note: any): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    markNotificationAsRead(id: number): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    deleteNotification(id: number): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    getContentStats(): Promise<{
        success: boolean;
        data: {
            resources: number;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAnalytics(period?: string): Promise<{
        success: boolean;
        data: {
            period: string;
            metrics: {};
        };
        message: string;
    }>;
    getOutsourcingRequestById(id: number): Promise<{
        success: boolean;
        error: string;
        data?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        data: {
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            } | null;
            documents: {
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
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            location: string;
            organizationName: string;
            coreFunctions: string | null;
            address: string | null;
            services: string[];
            natureOfOutsourcing: string;
            budgetRange: string;
        };
        error?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteOutsourcingRequest(id: number): Promise<{
        success: boolean;
        data: null;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    exportOutsourcingData(format: 'csv' | 'json'): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            location: string;
            organizationName: string;
            coreFunctions: string | null;
            address: string | null;
            services: string[];
            natureOfOutsourcing: string;
            budgetRange: string;
        }[];
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: string;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getSystemSettings(): Promise<{
        success: boolean;
        data: {};
    }>;
    updateSystemSettings(settings: any): Promise<{
        success: boolean;
        data: any;
    }>;
    testEmailSettings(email?: string): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    testNotifications(): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    createSystemBackup(): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    restoreSystemBackup(backupId: string): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    listBackups(): Promise<{
        success: boolean;
        data: never[];
    }>;
    clearSystemCache(): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    restartServices(): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
    getSystemStatus(): Promise<{
        success: boolean;
        data: {
            healthy: boolean;
        };
    }>;
    setMaintenanceMode(enabled: boolean): Promise<{
        success: boolean;
        data: {
            maintenance: boolean;
        };
    }>;
    getActivities(limit?: number): Promise<{
        success: boolean;
        data: {
            activities: {
                id: string;
                type: string;
                createdAt: any;
                raw: any;
            }[];
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getDiasporaRequestById(id: number): Promise<{
        success: boolean;
        data: {
            diasporaRequest: {
                user: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    email: string;
                    password: string;
                    role: import(".prisma/client").$Enums.Role;
                } | null;
            } & {
                id: number;
                userId: number | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                phone: string;
                country: string;
                timezone: string;
                serviceInterest: string;
                scheduledAt: Date | null;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllDiasporaRequests(page?: number, limit?: number, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            diasporaRequests: ({
                user: {
                    name: string;
                    email: string;
                } | null;
            } & {
                id: number;
                userId: number | null;
                status: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                phone: string;
                country: string;
                timezone: string;
                serviceInterest: string;
                scheduledAt: Date | null;
            })[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            diasporaRequests: never[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
        message: string;
        error: any;
    }>;
    updateDiasporaRequestStatus(requestId: number, status: string, adminId?: number): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            phone: string;
            country: string;
            timezone: string;
            serviceInterest: string;
            scheduledAt: Date | null;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
