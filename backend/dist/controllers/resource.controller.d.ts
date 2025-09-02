import { Response } from 'express';
import { ResourceService } from '../services/resource.service';
import { CreateResourceDto, UpdateResourceDto } from '../config/resource.dto';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    findAll(page?: number, limit?: number, category?: string, adminOnly?: boolean): Promise<{
        data: ({
            creator: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findPublicResources(category?: string): Promise<{
        success: boolean;
        data: {
            description: string | null;
            id: number;
            createdAt: Date;
            category: string;
            title: string | null;
            filePath: string | null;
            fileSize: number | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        creator: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
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
    }>;
    downloadResource(id: string, res: Response): Promise<import("fs").ReadStream>;
    serveFile(filename: string, res: Response): Promise<import("fs").ReadStream>;
    create(createResourceDto: CreateResourceDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            creator: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
        };
    }>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<{
        success: boolean;
        message: string;
        data: {
            creator: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
