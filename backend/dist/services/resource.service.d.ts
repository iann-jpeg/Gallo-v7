import { Response } from 'express';
import * as fs from 'fs';
import { CreateResourceDto, UpdateResourceDto } from '../config/resource.dto';
export declare class ResourceService {
    findAll(page?: number, limit?: number, category?: string, adminOnly?: boolean): Promise<{
        data: ({
            creator: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
            title: string;
            filePath: string | null;
            fileSize: number | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        creator: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
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
    }>;
    create(data: CreateResourceDto, file?: Express.Multer.File, createdBy?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            creator: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
        };
    }>;
    update(id: number, data: UpdateResourceDto): Promise<{
        success: boolean;
        message: string;
        data: {
            creator: {
                name: string;
                id: number;
                email: string;
            } | null;
        } & {
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
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    downloadResource(id: number, res: Response): Promise<fs.ReadStream>;
    serveFile(filename: string, res: Response): Promise<fs.ReadStream>;
    getCategories(): Promise<{
        success: boolean;
        data: any[];
    }>;
}
