export declare class MockDataService {
    private readonly logger;
    getMockDashboardData(): {
        stats: {
            totalUsers: number;
            totalClaims: number;
            totalPayments: number;
            totalRevenue: number;
            growthRate: number;
        };
        recentActivity: {
            id: number;
            name: string;
            email: string;
            createdAt: string;
            role: string;
        }[];
    };
    getMockClaimsData(): {
        claims: {
            id: number;
            policyNumber: string;
            claimType: string;
            incidentDate: string;
            estimatedLoss: number;
            description: string;
            status: string;
            createdAt: string;
            user: {
                id: number;
                name: string;
                email: string;
                profile: {
                    phone: string;
                };
            };
            documents: {
                id: number;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                createdAt: string;
            }[];
        }[];
    };
    getMockConsultationsData(): {
        consultations: ({
            id: number;
            name: string;
            email: string;
            phone: string;
            country: string;
            timezone: string;
            company: string;
            serviceType: string;
            consultationDate: string;
            consultationTime: string;
            message: string;
            status: string;
            createdAt: string;
            user: {
                id: number;
                name: string;
                email: string;
                profile: {
                    phone: string;
                };
            };
        } | {
            id: number;
            name: string;
            email: string;
            phone: string;
            country: string;
            timezone: string;
            serviceType: string;
            consultationDate: string;
            consultationTime: string;
            message: string;
            status: string;
            createdAt: string;
            user: {
                id: number;
                name: string;
                email: string;
                profile: {
                    phone: string;
                };
            };
            company?: undefined;
        })[];
    };
    getMockUsers(): {
        users: {
            id: number;
            name: string;
            email: string;
            role: string;
            createdAt: string;
            updatedAt: string;
            _count: {
                payments: number;
                claims: number;
            };
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    getMockPayments(): {
        payments: ({
            id: number;
            clientName: string;
            amount: number;
            paymentMethod: string;
            phoneNumber: string;
            email: string;
            transactionId: string;
            status: string;
            createdAt: string;
            user: {
                name: string;
                email: string;
            };
        } | {
            id: number;
            clientName: string;
            amount: number;
            paymentMethod: string;
            email: string;
            transactionId: string;
            status: string;
            createdAt: string;
            user: {
                name: string;
                email: string;
            };
            phoneNumber?: undefined;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    getMockPaymentStats(): {
        totalRevenue: number;
        monthlyRevenue: number;
        statusBreakdown: {
            status: string;
            _count: number;
        }[];
    };
    getNotifications(): ({
        id: number;
        note: string;
        entityType: string;
        entityId: number;
        createdAt: string;
    } | {
        id: number;
        note: string;
        entityType: string;
        entityId: null;
        createdAt: string;
    })[];
    getPayments(): {
        id: number;
        transactionId: string;
        amount: number;
        status: string;
        method: string;
        email: string;
        createdAt: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }[];
    getMockQuotesData(): {
        quotes: ({
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            product: string;
            vehicleDetails: string;
            status: string;
            createdAt: string;
            user: {
                id: number;
                name: string;
                email: string;
            };
        } | {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            product: string;
            vehicleDetails: null;
            status: string;
            createdAt: string;
            user: {
                id: number;
                name: string;
                email: string;
            };
        })[];
    };
    getMockDiasporaData(): {
        diasporaRequests: {
            id: number;
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            serviceInterest: string;
            message: string;
            preferredContactTime: string;
            status: string;
            createdAt: string;
            user: {
                id: number;
                name: string;
                email: string;
            };
        }[];
    };
}
