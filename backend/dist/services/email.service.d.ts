export declare class EmailService {
    private readonly logger;
    private transporter;
    private emailEnabled;
    constructor();
    private initializeTransporter;
    sendMail(to: string, subject: string, text: string, html?: string): Promise<boolean>;
    private generateHtmlTemplate;
    sendClaimNotification(adminEmail: string, claimData: any): Promise<boolean>;
    sendClaimConfirmation(customerEmail: string, claimData: any): Promise<boolean>;
}
