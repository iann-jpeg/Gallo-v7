export declare class AdminPanelSocketService {
    private io;
    private prisma;
    private mockDataService;
    constructor();
    setupAdminPanelSocket(server: any): void;
    private setupPeriodicUpdates;
    private sendDashboardData;
    private sendClaimsData;
    private sendConsultationsData;
    private sendUsersData;
    private sendPaymentsData;
    private broadcastDashboardUpdate;
    private broadcastRecentActivity;
    notifyDataChange(type: 'user' | 'claim' | 'payment' | 'consultation', data: any): Promise<void>;
}
export declare function setupAdminPanelSocket(server: any): AdminPanelSocketService;
