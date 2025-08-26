import { DiasporaService } from '../services/diaspora.service';
import { CreateDiasporaDto, UpdateDiasporaDto } from '../config/diaspora.dto';
export declare class DiasporaController {
    private readonly diasporaService;
    constructor(diasporaService: DiasporaService);
    findAll(page?: number, limit?: number): Promise<{
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
        scheduledAt: Date | null;
        serviceInterest: string;
    }[]>;
    findOne(id: string): Promise<{
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
        scheduledAt: Date | null;
        serviceInterest: string;
    } | null>;
    create(data: CreateDiasporaDto): Promise<{
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
        scheduledAt: Date | null;
        serviceInterest: string;
    }>;
    update(id: string, data: UpdateDiasporaDto): Promise<{
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
        scheduledAt: Date | null;
        serviceInterest: string;
    }>;
    remove(id: string): Promise<{
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
        scheduledAt: Date | null;
        serviceInterest: string;
    }>;
}
