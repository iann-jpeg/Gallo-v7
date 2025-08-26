"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDataService = void 0;
const common_1 = require("@nestjs/common");
let MockDataService = MockDataService_1 = class MockDataService {
    constructor() {
        this.logger = new common_1.Logger(MockDataService_1.name);
    }
    getMockDashboardData() {
        this.logger.warn('Using mock data due to database connectivity issues');
        return {
            stats: {
                totalUsers: 125,
                totalClaims: 34,
                totalPayments: 28,
                totalRevenue: 1250000,
                growthRate: 12.5
            },
            recentActivity: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    createdAt: new Date().toISOString(),
                    role: 'USER'
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    role: 'USER'
                },
                {
                    id: 3,
                    name: 'Admin User',
                    email: 'admin@galloways.co.ke',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    role: 'ADMIN'
                }
            ]
        };
    }
    getMockClaimsData() {
        return {
            claims: [
                {
                    id: 1,
                    policyNumber: "POL-2024-001",
                    claimType: "Auto Insurance",
                    incidentDate: "2024-08-15",
                    estimatedLoss: 150000,
                    description: "Vehicle collision on Uhuru Highway. Front-end damage to insured vehicle.",
                    status: "pending",
                    createdAt: "2024-08-16T10:30:00Z",
                    user: {
                        id: 101,
                        name: "James Kariuki",
                        email: "james.kariuki@email.com",
                        profile: {
                            phone: "+254701234567"
                        }
                    },
                    documents: [
                        {
                            id: 1,
                            filename: "accident_report.pdf",
                            originalName: "Police Accident Report.pdf",
                            mimeType: "application/pdf",
                            size: 256780,
                            createdAt: "2024-08-16T10:35:00Z"
                        },
                        {
                            id: 2,
                            filename: "vehicle_photos.jpg",
                            originalName: "Damage Photos.jpg",
                            mimeType: "image/jpeg",
                            size: 1024560,
                            createdAt: "2024-08-16T10:40:00Z"
                        }
                    ]
                },
                {
                    id: 2,
                    policyNumber: "POL-2024-002",
                    claimType: "Health Insurance",
                    incidentDate: "2024-08-10",
                    estimatedLoss: 85000,
                    description: "Emergency surgery at Nairobi Hospital. Pre-authorized medical treatment.",
                    status: "approved",
                    createdAt: "2024-08-12T14:20:00Z",
                    user: {
                        id: 102,
                        name: "Mary Wanjiku",
                        email: "mary.wanjiku@email.com",
                        profile: {
                            phone: "+254712345678"
                        }
                    },
                    documents: [
                        {
                            id: 3,
                            filename: "medical_report.pdf",
                            originalName: "Medical Report.pdf",
                            mimeType: "application/pdf",
                            size: 445120,
                            createdAt: "2024-08-12T14:25:00Z"
                        }
                    ]
                },
                {
                    id: 3,
                    policyNumber: "POL-2024-003",
                    claimType: "Property Insurance",
                    incidentDate: "2024-08-08",
                    estimatedLoss: 320000,
                    description: "Water damage to office property due to burst pipe. Equipment and furniture affected.",
                    status: "processing",
                    createdAt: "2024-08-09T09:15:00Z",
                    user: {
                        id: 103,
                        name: "Peter Ochieng",
                        email: "peter.ochieng@email.com",
                        profile: {
                            phone: "+254723456789"
                        }
                    },
                    documents: [
                        {
                            id: 4,
                            filename: "property_assessment.pdf",
                            originalName: "Property Damage Assessment.pdf",
                            mimeType: "application/pdf",
                            size: 678900,
                            createdAt: "2024-08-09T09:20:00Z"
                        },
                        {
                            id: 5,
                            filename: "repair_estimates.pdf",
                            originalName: "Repair Estimates.pdf",
                            mimeType: "application/pdf",
                            size: 234567,
                            createdAt: "2024-08-09T09:25:00Z"
                        }
                    ]
                }
            ]
        };
    }
    getMockConsultationsData() {
        return {
            consultations: [
                {
                    id: 1,
                    name: "Alice Muthoni",
                    email: "alice.muthoni@email.com",
                    phone: "+254734567890",
                    country: "Kenya",
                    timezone: "Africa/Nairobi",
                    company: "Muthoni Enterprises Ltd",
                    serviceType: "Business Insurance Consultation",
                    consultationDate: "2024-08-25",
                    consultationTime: "10:00 AM",
                    message: "I'm looking for comprehensive business insurance coverage for my manufacturing company. We need coverage for equipment, liability, and worker compensation.",
                    status: "pending",
                    createdAt: "2024-08-20T08:30:00Z",
                    user: {
                        id: 201,
                        name: "Alice Muthoni",
                        email: "alice.muthoni@email.com",
                        profile: {
                            phone: "+254734567890"
                        }
                    }
                },
                {
                    id: 2,
                    name: "David Kimani",
                    email: "david.kimani@email.com",
                    phone: "+254745678901",
                    country: "Kenya",
                    timezone: "Africa/Nairobi",
                    company: "Kimani Transport Services",
                    serviceType: "Vehicle Fleet Insurance",
                    consultationDate: "2024-08-28",
                    consultationTime: "2:00 PM",
                    message: "Need advice on insuring a fleet of 15 commercial vehicles. Looking for cost-effective coverage options.",
                    status: "confirmed",
                    createdAt: "2024-08-18T11:45:00Z",
                    user: {
                        id: 202,
                        name: "David Kimani",
                        email: "david.kimani@email.com",
                        profile: {
                            phone: "+254745678901"
                        }
                    }
                },
                {
                    id: 3,
                    name: "Grace Njeri",
                    email: "grace.njeri@email.com",
                    phone: "+254756789012",
                    country: "Kenya",
                    timezone: "Africa/Nairobi",
                    serviceType: "Personal Life Insurance",
                    consultationDate: "2024-08-30",
                    consultationTime: "11:00 AM",
                    message: "I want to discuss life insurance options for my family. Need guidance on coverage amounts and premium structures.",
                    status: "scheduled",
                    createdAt: "2024-08-19T16:20:00Z",
                    user: {
                        id: 203,
                        name: "Grace Njeri",
                        email: "grace.njeri@email.com",
                        profile: {
                            phone: "+254756789012"
                        }
                    }
                },
                {
                    id: 4,
                    name: "Samuel Otieno",
                    email: "samuel.otieno@email.com",
                    phone: "+254767890123",
                    country: "Kenya",
                    timezone: "Africa/Nairobi",
                    company: "Otieno Real Estate",
                    serviceType: "Property Insurance Review",
                    consultationDate: "2024-08-22",
                    consultationTime: "3:30 PM",
                    message: "I need to review my current property insurance policies and explore additional coverage options for new developments.",
                    status: "completed",
                    createdAt: "2024-08-15T13:10:00Z",
                    user: {
                        id: 204,
                        name: "Samuel Otieno",
                        email: "samuel.otieno@email.com",
                        profile: {
                            phone: "+254767890123"
                        }
                    }
                }
            ]
        };
    }
    getMockUsers() {
        this.logger.warn('Using mock users data due to database connectivity issues');
        return {
            users: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'USER',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    _count: {
                        payments: 3,
                        claims: 1
                    }
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    role: 'USER',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    updatedAt: new Date(Date.now() - 86400000).toISOString(),
                    _count: {
                        payments: 2,
                        claims: 1
                    }
                },
                {
                    id: 3,
                    name: 'Admin User',
                    email: 'admin@galloways.co.ke',
                    role: 'ADMIN',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    updatedAt: new Date(Date.now() - 172800000).toISOString(),
                    _count: {
                        payments: 0,
                        claims: 0
                    }
                }
            ],
            pagination: {
                total: 3,
                page: 1,
                limit: 20,
                totalPages: 1
            }
        };
    }
    getMockPayments() {
        this.logger.warn('Using mock payments data due to database connectivity issues');
        return {
            payments: [
                {
                    id: 1,
                    clientName: 'John Doe',
                    amount: 25000,
                    paymentMethod: 'M-Pesa',
                    phoneNumber: '+254700123456',
                    email: 'john@example.com',
                    transactionId: 'TXN-2024-001',
                    status: 'COMPLETED',
                    createdAt: new Date().toISOString(),
                    user: {
                        name: 'John Doe',
                        email: 'john@example.com'
                    }
                },
                {
                    id: 2,
                    clientName: 'Jane Smith',
                    amount: 35000,
                    paymentMethod: 'Bank Transfer',
                    email: 'jane@example.com',
                    transactionId: 'TXN-2024-002',
                    status: 'COMPLETED',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    user: {
                        name: 'Jane Smith',
                        email: 'jane@example.com'
                    }
                }
            ],
            pagination: {
                total: 2,
                page: 1,
                limit: 20,
                totalPages: 1
            }
        };
    }
    getMockPaymentStats() {
        return {
            totalRevenue: 60000,
            monthlyRevenue: 60000,
            statusBreakdown: [
                { status: 'COMPLETED', _count: 2 },
                { status: 'PENDING', _count: 0 },
                { status: 'FAILED', _count: 0 }
            ]
        };
    }
    getNotifications() {
        this.logger.warn('Using mock notifications data due to database connectivity issues');
        return [
            {
                id: 1,
                note: 'New claim submitted by James Kariuki',
                entityType: 'CLAIM',
                entityId: 1,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                note: 'Payment processed successfully for Mary Wanjiku',
                entityType: 'PAYMENT',
                entityId: 1,
                createdAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
                id: 3,
                note: 'New consultation request from Alice Muthoni',
                entityType: 'CONSULTATION',
                entityId: 1,
                createdAt: new Date(Date.now() - 7200000).toISOString()
            },
            {
                id: 4,
                note: 'System backup completed successfully',
                entityType: 'SYSTEM',
                entityId: null,
                createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 5,
                note: 'New user registration: David Kimani',
                entityType: 'USER',
                entityId: 202,
                createdAt: new Date(Date.now() - 172800000).toISOString()
            }
        ];
    }
    getPayments() {
        this.logger.warn('Using mock payments data due to database connectivity issues');
        return [
            {
                id: 1,
                transactionId: 'TXN-2024-001',
                amount: 25000,
                status: 'COMPLETED',
                method: 'M-Pesa',
                email: 'john@example.com',
                createdAt: new Date().toISOString(),
                user: {
                    id: 101,
                    name: 'John Doe',
                    email: 'john@example.com'
                }
            },
            {
                id: 2,
                transactionId: 'TXN-2024-002',
                amount: 35000,
                status: 'COMPLETED',
                method: 'Bank Transfer',
                email: 'jane@example.com',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                user: {
                    id: 102,
                    name: 'Jane Smith',
                    email: 'jane@example.com'
                }
            },
            {
                id: 3,
                transactionId: 'TXN-2024-003',
                amount: 45000,
                status: 'PENDING',
                method: 'Credit Card',
                email: 'peter@example.com',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                user: {
                    id: 103,
                    name: 'Peter Ochieng',
                    email: 'peter@example.com'
                }
            },
            {
                id: 4,
                transactionId: 'TXN-2024-004',
                amount: 55000,
                status: 'COMPLETED',
                method: 'M-Pesa',
                email: 'mary@example.com',
                createdAt: new Date(Date.now() - 259200000).toISOString(),
                user: {
                    id: 104,
                    name: 'Mary Wanjiku',
                    email: 'mary@example.com'
                }
            }
        ];
    }
    getMockQuotesData() {
        return {
            quotes: [
                {
                    id: 1,
                    firstName: "Samuel",
                    lastName: "Kiprotich",
                    email: "samuel.kiprotich@email.com",
                    phone: "+254701234567",
                    product: "Motor Vehicle Insurance",
                    vehicleDetails: "Toyota Camry 2020",
                    status: "pending",
                    createdAt: "2024-08-15T09:30:00Z",
                    user: {
                        id: 201,
                        name: "Samuel Kiprotich",
                        email: "samuel.kiprotich@email.com"
                    }
                },
                {
                    id: 2,
                    firstName: "Grace",
                    lastName: "Njeri",
                    email: "grace.njeri@email.com",
                    phone: "+254712345678",
                    product: "Health Insurance",
                    vehicleDetails: null,
                    status: "approved",
                    createdAt: "2024-08-12T11:15:00Z",
                    user: {
                        id: 202,
                        name: "Grace Njeri",
                        email: "grace.njeri@email.com"
                    }
                },
                {
                    id: 3,
                    firstName: "David",
                    lastName: "Mwangi",
                    email: "david.mwangi@email.com",
                    phone: "+254723456789",
                    product: "Home Insurance",
                    vehicleDetails: null,
                    status: "under_review",
                    createdAt: "2024-08-10T16:45:00Z",
                    user: {
                        id: 203,
                        name: "David Mwangi",
                        email: "david.mwangi@email.com"
                    }
                }
            ]
        };
    }
    getMockDiasporaData() {
        return {
            diasporaRequests: [
                {
                    id: 1,
                    name: "John Kamau",
                    email: "john.kamau@email.com",
                    phone: "+1-234-567-8900",
                    country: "United States",
                    city: "New York",
                    serviceInterest: "Investment Advisory",
                    message: "Looking for investment opportunities in Kenya real estate",
                    preferredContactTime: "Evening (EST)",
                    status: "pending",
                    createdAt: "2024-08-14T18:30:00Z",
                    user: {
                        id: 301,
                        name: "John Kamau",
                        email: "john.kamau@email.com"
                    }
                },
                {
                    id: 2,
                    name: "Sarah Wanjiku",
                    email: "sarah.wanjiku@email.com",
                    phone: "+44-20-1234-5678",
                    country: "United Kingdom",
                    city: "London",
                    serviceInterest: "Insurance Services",
                    message: "Need comprehensive insurance coverage for my family",
                    preferredContactTime: "Afternoon (GMT)",
                    status: "contacted",
                    createdAt: "2024-08-11T14:20:00Z",
                    user: {
                        id: 302,
                        name: "Sarah Wanjiku",
                        email: "sarah.wanjiku@email.com"
                    }
                },
                {
                    id: 3,
                    name: "Michael Ochieng",
                    email: "michael.ochieng@email.com",
                    phone: "+971-4-123-4567",
                    country: "United Arab Emirates",
                    city: "Dubai",
                    serviceInterest: "Business Consultation",
                    message: "Planning to start a business in Kenya, need guidance",
                    preferredContactTime: "Morning (GST)",
                    status: "completed",
                    createdAt: "2024-08-08T10:15:00Z",
                    user: {
                        id: 303,
                        name: "Michael Ochieng",
                        email: "michael.ochieng@email.com"
                    }
                }
            ]
        };
    }
};
exports.MockDataService = MockDataService;
exports.MockDataService = MockDataService = MockDataService_1 = __decorate([
    (0, common_1.Injectable)()
], MockDataService);
//# sourceMappingURL=mock-data.service.js.map