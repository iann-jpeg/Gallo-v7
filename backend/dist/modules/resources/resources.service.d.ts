export declare class ResourcesService {
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
    downloadResource(id: string): Promise<{
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
    } | {
        success: boolean;
        message: any;
    }>;
}
