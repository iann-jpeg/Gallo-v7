export declare class ConsultationsService {
    createConsultation(data: any): Promise<{
        success: boolean;
        message: any;
    } | {
        success: boolean;
        consultation: {
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
        };
    }>;
    getConsultations(page?: number, limit?: number): Promise<{
        success: boolean;
        message: any;
    } | {
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
        total: number;
    }>;
}
