import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
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
