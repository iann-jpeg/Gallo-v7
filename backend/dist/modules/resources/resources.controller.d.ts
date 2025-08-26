import { ResourcesService } from './resources.service';
import { Response } from 'express';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<{
        success: boolean;
        message: any;
    } | {
        description: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        title: string;
        filePath: string | null;
        fileSize: number | null;
        adminOnly: boolean;
        createdBy: number | null;
    }[]>;
    downloadResource(id: string, res: Response): Promise<void>;
}
