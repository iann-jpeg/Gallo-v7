export declare class NotificationsService {
    notifyAdmin(subject: string, html: string): Promise<{
        success: boolean;
        response: any;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        response?: undefined;
    }>;
}
