import { ResourcesService } from './resources.service';
import { Response } from 'express';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<{
        success: boolean;
        message: any;
    } | {
        url: string | null;
        description: string;
        id: number;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        title: string;
        filePath: string | null;
        fileSize: number | null;
        adminOnly: boolean;
        creatorId: number | null;
    }[]>;
    downloadResource(id: string, res: Response): Promise<void>;
}
