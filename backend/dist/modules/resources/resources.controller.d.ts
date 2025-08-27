import { ResourcesService } from './resources.service';
import { Response } from 'express';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<{
        success: boolean;
        message: any;
    } | {
        id: number;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        title: string;
        url: string | null;
        filePath: string | null;
        fileSize: number | null;
        adminOnly: boolean;
        isPublic: boolean;
        creatorId: number | null;
    }[]>;
    downloadResource(id: string, res: Response): Promise<void>;
}
