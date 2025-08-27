export declare class ConsultationsService {
    createConsultation(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        consultation: {
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
            company: string | null;
            scheduledAt: Date | null;
            consultationDate: Date | null;
            meetingLink: string | null;
            duration: number | null;
            notes: string | null;
        };
    }>;
    getConsultations(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
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
            company: string | null;
            scheduledAt: Date | null;
            consultationDate: Date | null;
            meetingLink: string | null;
            duration: number | null;
            notes: string | null;
        }[];
        total: number;
    }>;
}
