export declare class ResourcesService {
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
    downloadResource(id: string): Promise<{
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
    } | {
        success: boolean;
        message: any;
    }>;
}
