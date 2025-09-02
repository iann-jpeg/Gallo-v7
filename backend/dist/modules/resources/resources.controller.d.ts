import { ResourcesService } from './resources.service';
import { Response } from 'express';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<{
        success: boolean;
        message: any;
    } | {
        name: string;
        description: string | null;
        id: number;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        mimeType: string | null;
        title: string | null;
        filePath: string | null;
        fileSize: number | null;
        adminOnly: boolean;
        downloads: number;
        creatorId: number | null;
    }[]>;
    downloadResource(id: string, res: Response): Promise<void>;
}
