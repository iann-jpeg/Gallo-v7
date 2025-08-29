import { ConsultationsService } from '../services/consultations.service';
import { CreateConsultationDto, UpdateConsultationDto } from '../config/consultation.dto';
import { BaseController } from './base.controller';
export declare class ConsultationsController extends BaseController {
    private readonly consultationsService;
    constructor(consultationsService: ConsultationsService);
    findAll(page?: number, limit?: number): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    findOne(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    create(data: CreateConsultationDto): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    update(id: string, data: UpdateConsultationDto): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    remove(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
}
