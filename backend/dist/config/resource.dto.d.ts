export declare class CreateResourceDto {
    title: string;
    description?: string;
    category: string;
    filePath?: string;
    fileSize?: number;
    adminOnly?: boolean;
}
export declare class UpdateResourceDto {
    title?: string;
    description?: string;
    category?: string;
    filePath?: string;
    fileSize?: number;
    adminOnly?: boolean;
}
