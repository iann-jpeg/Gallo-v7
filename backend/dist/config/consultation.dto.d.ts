export declare class CreateConsultationDto {
    name: string;
    email: string;
    phone: string;
    company?: string;
    serviceType: string;
    consultationDate: string;
    consultationTime: string;
    message: string;
    country?: string;
    timezone?: string;
    scheduledAt?: string;
}
export declare class UpdateConsultationDto {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    serviceType?: string;
    consultationDate?: string;
    consultationTime?: string;
    message?: string;
    country?: string;
    timezone?: string;
    scheduledAt?: string;
    status?: string;
}
