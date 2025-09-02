export declare class ConsultationsService {
    createConsultation(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        consultation: {
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
            serviceInterest: string;
            serviceType: string;
            scheduledAt: Date | null;
            meetingLink: string | null;
            duration: number;
            notes: string | null;
        };
    }>;
    getConsultations(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
        consultations: {
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
            serviceInterest: string;
            serviceType: string;
            scheduledAt: Date | null;
            meetingLink: string | null;
            duration: number;
            notes: string | null;
        }[];
        total: number;
    }>;
}
