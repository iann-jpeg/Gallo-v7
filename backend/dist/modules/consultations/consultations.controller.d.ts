import { ConsultationsService } from './consultations.service';
export declare class ConsultationsController {
    private readonly consultationsService;
    constructor(consultationsService: ConsultationsService);
    createConsultation(body: any): Promise<{
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
    getConsultations(): Promise<{
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
