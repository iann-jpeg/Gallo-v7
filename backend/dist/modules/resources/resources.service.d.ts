export declare class ResourcesService {
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
    downloadResource(id: string): Promise<{
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
    } | {
        success: boolean;
        message: any;
    }>;
}
