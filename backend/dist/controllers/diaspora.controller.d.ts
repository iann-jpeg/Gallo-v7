import { DiasporaService } from '../services/diaspora.service';
import { CreateDiasporaDto, UpdateDiasporaDto } from '../config/diaspora.dto';
export declare class DiasporaController {
    private readonly diasporaService;
    constructor(diasporaService: DiasporaService);
    findAll(page?: number, limit?: number): Promise<{
        name: string;
        status: string;
        id: number;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        status: string;
        id: number;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    } | null>;
    create(data: CreateDiasporaDto): Promise<{
        name: string;
        status: string;
        id: number;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }>;
    update(id: string, data: UpdateDiasporaDto): Promise<{
        name: string;
        status: string;
        id: number;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        status: string;
        id: number;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        country: string;
        timezone: string;
        serviceInterest: string;
        scheduledAt: Date | null;
    }>;
}
