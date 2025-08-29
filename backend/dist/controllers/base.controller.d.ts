export declare class BaseController {
    protected handleSuccess(data: any, message?: string): {
        success: boolean;
        message: string | undefined;
        data: any;
        timestamp: string;
    };
    protected handleError(error: any): void;
}
