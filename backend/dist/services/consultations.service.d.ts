import { EmailService } from './email.service';
import { CreateConsultationDto, UpdateConsultationDto } from '../config/consultation.dto';
export declare class ConsultationsService {
    private readonly emailService;
    constructor(emailService: EmailService);
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
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
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
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
    }>;
    create(data: CreateConsultationDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
    update(id: number, data: UpdateConsultationDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
