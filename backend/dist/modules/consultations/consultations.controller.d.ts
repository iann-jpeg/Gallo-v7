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
    getConsultations(): Promise<{
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
