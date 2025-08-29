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
    }>;
    getConsultations(): Promise<{
        success: boolean;
        message: any;
    } | {
        consultations: {
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
        }[];
        total: number;
    }>;
}
