export declare class ResourcesService {
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
    downloadResource(id: string): Promise<{
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
    } | {
        success: boolean;
        message: any;
    }>;
}
