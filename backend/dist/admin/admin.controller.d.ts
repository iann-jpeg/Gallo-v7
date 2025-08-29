import { Response } from 'express';
import { AdminService } from '../services/admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(): Promise<{
        success: boolean;
        data: {
            stats: {
                totalUsers: number;
                totalClaims: number;
                totalPayments: number;
                totalRevenue: number;
                growthRate: number;
            };
            recentActivity: {
                id: string;
                type: string;
                action: string;
                description: string;
                user: any;
                timestamp: any;
            }[];
        };
    }>;
    getDashboardStats(): Promise<{
        success: boolean;
        data: {
            stats: {
                totalUsers: number;
                totalClaims: number;
                totalPayments: number;
                totalRevenue: number;
                growthRate: number;
            };
            recentActivity: {
                id: string;
                type: string;
                action: string;
                description: string;
                user: any;
                timestamp: any;
            }[];
        };
    }>;
    getComprehensiveDashboardStats(): Promise<{
        success: boolean;
        data: {
            totalUsers: number;
            totalClaims: number;
            totalQuotes: number;
            totalConsultations: number;
            totalOutsourcingRequests: number;
            totalPayments: number;
            totalDiasporaRequests: number;
            pendingClaims: number;
            pendingConsultations: number;
            activePolicies: number;
            monthlyRevenue: number;
            totalRevenue: number;
            avgPaymentAmount: number;
            conversionRate: number;
            userGrowthRate: number;
            claimGrowthRate: number;
            quoteGrowthRate: number;
            consultationGrowthRate: number;
            revenueGrowthRate: number;
            totalSubmissions: number;
            allSubmissions: {
                claims: {
                    id: any;
                    policyNumber: any;
                    clientEmail: any;
                    incidentType: any;
                    claimAmount: any;
                    status: any;
                    createdAt: any;
                }[];
                consultations: {
                    id: any;
                    fullName: any;
                    email: any;
                    serviceType: any;
                    preferredDate: any;
                    status: any;
                    createdAt: any;
                }[];
                outsourcing: {
                    id: any;
                    companyName: any;
                    contactEmail: any;
                    serviceType: any;
                    budgetRange: any;
                    status: any;
                    createdAt: any;
                }[];
                payments: {
                    id: any;
                    policyNumber: any;
                    clientEmail: any;
                    amount: any;
                    paymentMethod: any;
                    status: any;
                    createdAt: any;
                }[];
                diaspora: {
                    id: any;
                    fullName: any;
                    email: any;
                    currentCountry: any;
                    serviceType: any;
                    status: any;
                    createdAt: any;
                }[];
            };
            generatedAt: string;
            isRealTime: boolean;
            isMockData?: undefined;
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            totalUsers: number;
            totalClaims: number;
            totalQuotes: number;
            totalConsultations: number;
            totalOutsourcingRequests: number;
            totalPayments: number;
            totalDiasporaRequests: number;
            pendingClaims: number;
            pendingConsultations: number;
            activePolicies: number;
            monthlyRevenue: number;
            totalRevenue: number;
            avgPaymentAmount: number;
            conversionRate: number;
            userGrowthRate: number;
            claimGrowthRate: number;
            quoteGrowthRate: number;
            consultationGrowthRate: number;
            revenueGrowthRate: number;
            totalSubmissions: number;
            allSubmissions: {
                claims: never[];
                consultations: never[];
                outsourcing: never[];
                payments: never[];
                diaspora: never[];
            };
            generatedAt: string;
            isRealTime: boolean;
            isMockData: boolean;
        };
        message: string;
    }>;
    getSystemHealth(): Promise<{
        success: boolean;
        data: {
            status: string;
            database: string;
            timestamp: string;
            uptime: number;
            error?: undefined;
        };
    } | {
        success: boolean;
        data: {
            status: string;
            database: string;
            timestamp: string;
            error: any;
            uptime?: undefined;
        };
    }>;
    getRecentActivities(limit?: string): Promise<{
        success: boolean;
        data: {
            id: string;
            type: string;
            action: string;
            description: string;
            user: any;
            timestamp: any;
        }[];
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllUsers(page?: string, limit?: string): Promise<{
        success: boolean;
        data: {
            users: {
                name: string;
                id: number;
                _count: {
                    claim: number;
                    quote: number;
                };
                createdAt: Date;
                updatedAt: Date;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            }[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
            };
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            users: never[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
            };
        };
        message: string;
    }>;
    getUserStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            admins: number;
            regular: number;
            recentSignups: number;
            byRole: {
                role: string;
                count: number;
            }[];
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateUserStatus(id: number, status: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
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
    deleteUser(id: number): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    getAllClaims(page?: string, limit?: string, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            claims: ({
                user: {
                    name: string;
                    id: number;
                    email: string;
                } | null;
            } & {
                description: string;
                status: string;
                id: number;
                userId: number | null;
                policyNumber: string;
                claimType: string;
                incidentDate: Date;
                estimatedLoss: number;
                createdAt: Date;
                updatedAt: Date;
                submitterEmail: string | null;
                submitterName: string | null;
                submitterPhone: string | null;
            })[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
                totalPages: number;
            };
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            claims: never[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
    getClaimById(id: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            document: {
                filename: string;
                id: number;
                createdAt: Date;
                originalName: string;
                mimeType: string;
                size: number;
            }[];
            user: {
                name: string;
                id: number;
                email: string;
                profile: {
                    phone: string | null;
                } | null;
            } | null;
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
            policyNumber: string;
            claimType: string;
            incidentDate: Date;
            estimatedLoss: number;
            createdAt: Date;
            updatedAt: Date;
            submitterEmail: string | null;
            submitterName: string | null;
            submitterPhone: string | null;
        };
        message?: undefined;
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
            thisMonth: number;
            approvalRate: number;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateClaimStatus(id: number, status: string): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
            policyNumber: string;
            claimType: string;
            incidentDate: Date;
            estimatedLoss: number;
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
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    downloadDocument(id: number, res: Response): Promise<void>;
    getAllConsultations(page?: string, limit?: string, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            consultations: ({
                user: {
                    name: string;
                    id: number;
                    email: string;
                    profile: {
                        phone: string | null;
                    } | null;
                } | null;
            } & {
                name: string;
                status: string;
                id: number;
                userId: number | null;
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
            })[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                totalPages: number;
            };
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            consultations: never[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
    getConsultationById(id: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
                profile: {
                    phone: string | null;
                } | null;
            } | null;
        } & {
            name: string;
            status: string;
            id: number;
            userId: number | null;
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
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateConsultationStatus(id: number, status: string): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            name: string;
            status: string;
            id: number;
            userId: number | null;
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    scheduleMeeting(id: number, meetingData: {
        meetingDate: string;
        meetingTime: string;
        meetingType: string;
        meetingLink?: string;
        duration: number;
        notes?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            consultation: {
                user: {
                    name: string;
                    id: number;
                    email: string;
                    profile: {
                        phone: string | null;
                    } | null;
                } | null;
            } & {
                name: string;
                status: string;
                id: number;
                userId: number | null;
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
            };
            meetingDetails: {
                date: any;
                time: any;
                type: any;
                link: any;
                duration: any;
                notes: any;
            };
            client: {
                name: string;
                id: number;
                email: string;
                profile: {
                    phone: string | null;
                } | null;
            } | null;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    sendWhatsAppMeetingDetails(id: number, data: {
        message?: string;
        includeLink?: boolean;
    }): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            recipient: string;
            phone: string;
            message: string;
            sentAt: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllQuotes(page?: string, limit?: string, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            quotes: ({
                user: {
                    name: string;
                    id: number;
                    email: string;
                } | null;
            } & {
                location: string | null;
                details: string | null;
                status: string;
                id: number;
                userId: number | null;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                phone: string;
                product: string;
                firstName: string;
                lastName: string;
                budget: string | null;
                coverage: string | null;
                contactMethod: string;
                bestTime: string | null;
            })[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
                totalPages: number;
            };
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            quotes: never[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
    getQuoteById(id: number): Promise<{
        success: boolean;
        data: {
            document: {
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
                outsourcingId: number | null;
                content: Uint8Array | null;
            }[];
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            location: string | null;
            details: string | null;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            product: string;
            firstName: string;
            lastName: string;
            budget: string | null;
            coverage: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    updateQuoteStatus(id: number, status: string): Promise<{
        success: boolean;
        data: {
            location: string | null;
            details: string | null;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            product: string;
            firstName: string;
            lastName: string;
            budget: string | null;
            coverage: string | null;
            contactMethod: string;
            bestTime: string | null;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
        message?: undefined;
    }>;
    getAllDiasporaRequests(page?: string, limit?: string, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            diasporaRequests: ({
                user: {
                    name: string;
                    id: number;
                    email: string;
                } | null;
            } & {
                name: string;
                status: string;
                id: number;
                userId: number | null;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                phone: string;
                country: string;
                timezone: string;
                serviceInterest: string;
                scheduledAt: Date | null;
            })[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
                totalPages: number;
            };
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            diasporaRequests: never[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
                totalPages: number;
            };
        };
        message: string;
    }>;
    getDiasporaRequestById(id: number): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            name: string;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string;
            country: string;
            timezone: string;
            serviceInterest: string;
            scheduledAt: Date | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    updateDiasporaRequestStatus(id: number, status: string): Promise<{
        success: boolean;
        data: {
            name: string;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
        error: any;
        data?: undefined;
        message?: undefined;
    }>;
    getAllPayments(page?: string, limit?: string, search?: string): Promise<{
        success: boolean;
        data: {
            payments: ({
                user: {
                    name: string;
                    id: number;
                    email: string;
                } | null;
            } & {
                method: string | null;
                description: string | null;
                status: string;
                id: number;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                userId: number | null;
                createdAt: Date;
                updatedAt: Date;
                claimId: number | null;
                quoteId: number | null;
                amount: number;
                currency: string;
                reference: string | null;
                transactionId: string | null;
                paymentMethod: string | null;
                clientName: string | null;
            })[];
            pagination: {
                currentPage: number;
                totalPages: number;
                totalItems: number;
                itemsPerPage: number;
            };
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            payments: never[];
            pagination: {
                currentPage: number;
                totalPages: number;
                totalItems: number;
                itemsPerPage: number;
            };
        };
        message: string;
    }>;
    getPaymentStats(): Promise<{
        success: boolean;
        data: {
            totalRevenue: number;
            monthlyRevenue: number;
            totalPayments: number;
            monthlyPayments: number;
            avgPaymentAmount: number;
            generatedAt: string;
        };
        isMockData?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        data: {
            totalRevenue: number;
            monthlyRevenue: number;
            totalPayments: number;
            monthlyPayments: number;
            avgPaymentAmount: number;
            generatedAt: string;
        };
        isMockData: boolean;
        message: string;
    }>;
    getNotifications(): Promise<{
        success: boolean;
        data: {
            notifications: never[];
            totalCount: number;
            unreadCount: number;
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            notifications: never[];
            totalCount: number;
            unreadCount: number;
        };
        message: string;
    }>;
    getContentStats(): Promise<{
        success: boolean;
        data: {
            users: number;
            claims: number;
            quotes: number;
            consultations: number;
            outsourcing: number;
            resources: number;
            payments: number;
            total: number;
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
            userGrowth: {
                date: any;
                users: number;
            }[];
            paymentTrends: {
                date: any;
                amount: number;
                count: number;
            }[];
            topProducts: {
                name: any;
                category: string;
                sales: number;
            }[];
            conversionData: {
                rate: number;
                change: number;
            };
            generatedAt: string;
            isRealTime: boolean;
        };
        isMockData?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        data: {
            period: string;
            userGrowth: {
                date: string;
                users: number;
            }[];
            paymentTrends: {
                date: string;
                amount: number;
            }[];
            topProducts: {
                name: string;
                category: string;
                sales: number;
            }[];
            conversionData: {
                rate: number;
                change: number;
            };
            generatedAt: string;
            isRealTime: boolean;
        };
        isMockData: boolean;
        message: string;
    }>;
    getAllOutsourcingRequests(page?: string, limit?: string, status?: string, search?: string): Promise<{
        success: boolean;
        data: {
            outsourcingRequests: ({
                user: {
                    name: string;
                    id: number;
                    email: string;
                } | null;
            } & {
                description: string;
                status: string;
                id: number;
                userId: number | null;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                category: string;
                budget: number | null;
                title: string;
                organizationName: string | null;
                services: string[];
                timeline: string | null;
            })[];
            totalCount: number;
            totalPages: number;
            currentPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getOutsourcingRequestById(id: number): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            category: string;
            budget: number | null;
            title: string;
            organizationName: string | null;
            services: string[];
            timeline: string | null;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateOutsourcingRequestStatus(id: number, status: string, notes?: string): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
            description: string;
            status: string;
            id: number;
            userId: number | null;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            category: string;
            budget: number | null;
            title: string;
            organizationName: string | null;
            services: string[];
            timeline: string | null;
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
            totalCount: number;
            monthlyCount: number;
            statusStats: Record<string, number>;
            generatedAt: string;
        };
        message?: undefined;
    } | {
        success: boolean;
        data: {
            totalCount: number;
            monthlyCount: number;
            statusStats: {};
            generatedAt: string;
        };
        message: string;
    }>;
    deleteOutsourcingRequest(id: number): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    exportOutsourcingData(format?: 'csv' | 'json'): Promise<{
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
        data: {
            siteName: string;
            supportEmail: string;
            maintenanceMode: boolean;
            allowRegistration: boolean;
            emailNotifications: boolean;
            maxFileSize: number;
            allowedFileTypes: string[];
            backupEnabled: boolean;
            autoBackupInterval: string;
            sessionTimeout: number;
            twoFactorRequired: boolean;
            passwordMinLength: number;
            systemHealth: {
                database: string;
                email: string;
                storage: string;
                api: string;
                realtime: string;
            };
            lastUpdated: string;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateSystemSettings(settings: any): Promise<{
        success: boolean;
        data: any;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    testEmailSettings(email?: string): Promise<{
        success: boolean;
        message: string;
        data: {
            recipient: string;
            sentAt: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    testNotifications(): Promise<{
        success: boolean;
        message: string;
        data: {
            testedAt: string;
            notifications: {
                type: string;
                message: string;
            }[];
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    createBackup(): Promise<{
        success: boolean;
        data: {
            backupId: string;
            createdAt: string;
            size: string;
            type: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    restoreBackup(backupId: string): Promise<{
        success: boolean;
        data: {
            backupId: string;
            restoredAt: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    listBackups(): Promise<{
        success: boolean;
        data: {
            backups: {
                id: string;
                name: string;
                createdAt: string;
                size: string;
                type: string;
            }[];
            totalCount: number;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    clearSystemCache(): Promise<{
        success: boolean;
        data: {
            clearedAt: string;
            cacheSize: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    restartServices(): Promise<{
        success: boolean;
        data: {
            restartedAt: string;
            services: string[];
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getSystemStatus(): Promise<{
        success: boolean;
        data: {
            uptime: string;
            lastRestart: string;
            systemLoad: string;
            memoryUsage: string;
            diskUsage: string;
            activeConnections: number;
            health: {
                database: string;
                email: string;
                storage: string;
                api: string;
                realtime: string;
            };
            timestamp: string;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    setMaintenanceMode(enabled: boolean): Promise<{
        success: boolean;
        data: {
            maintenanceMode: boolean;
            updatedAt: string;
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
