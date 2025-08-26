import { BaseController } from './base.controller';
interface ResourceDownloadRequest {
    resourceType: string;
    email?: string;
    company?: string;
    purpose?: string;
}
export declare class ResourceController extends BaseController {
    private mockResources;
    getAllResources(): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getResourceById(id: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    downloadResource(data: ResourceDownloadRequest): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getResourceFile(resourceId: string, downloadRef: string): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    createResourceRequest(data: any): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
    getDownloadAnalytics(): Promise<void | {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    }>;
}
export {};
