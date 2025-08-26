"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = EmailService_1 = class EmailService {
    constructor() {
        this.logger = new common_1.Logger(EmailService_1.name);
        this.transporter = null;
        this.emailEnabled = false;
        this.initializeTransporter();
    }
    initializeTransporter() {
        try {
            const hasEmailConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
            if (!hasEmailConfig) {
                this.logger.warn('Email configuration not found. Email notifications will be disabled.');
                this.logger.warn('To enable emails, set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.');
                return;
            }
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            this.emailEnabled = true;
            this.logger.log('Email service initialized successfully');
        }
        catch (error) {
            this.logger.error('Failed to initialize email service:', error);
            this.emailEnabled = false;
        }
    }
    async sendMail(to, subject, text, html) {
        if (!this.emailEnabled || !this.transporter) {
            this.logger.warn(`Email not sent (service disabled): ${subject} to ${to}`);
            return false;
        }
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@galloways.co.ke',
                to,
                subject,
                text,
                html: html || this.generateHtmlTemplate(subject, text),
            });
            this.logger.log(`Email sent successfully: ${subject} to ${to}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send email: ${subject} to ${to}`, error);
            return false;
        }
    }
    generateHtmlTemplate(subject, content) {
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .email-container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #d4a574;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 10px;
          }
          .content {
            white-space: pre-line;
            margin-bottom: 30px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            text-align: center;
            color: #666666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">🛡️ Galloways Insurance</div>
            <div>Your trusted insurance partner in Kenya</div>
          </div>
          
          <div class="content">
            ${content.replace(/\n/g, '<br>')}
          </div>
          
          <div class="footer">
            <p><strong>Galloways Insurance Company Ltd.</strong></p>
            <p>📞 +254 700 123 456 | 📧 info@galloways.co.ke</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }
    async sendClaimNotification(adminEmail, claimData) {
        if (!adminEmail) {
            this.logger.warn('Admin email not provided for claim notification');
            return false;
        }
        const subject = `🚨 New Claim Submission - Policy #${claimData.policyNumber}`;
        const documentLinks = claimData.documentLinks || '';
        const documentCount = claimData.documentCount || 0;
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; }
          .section h3 { color: #d4a574; border-bottom: 2px solid #d4a574; padding-bottom: 8px; margin-bottom: 15px; }
          .info-grid { display: grid; gap: 8px; }
          .info-row { display: flex; justify-content: space-between; padding: 5px 0; }
          .info-label { font-weight: bold; }
          .status { background: #fff3cd; color: #856404; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .description { background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #d4a574; }
          .button { display: inline-block; background: #d4a574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛡️ New Insurance Claim</h1>
            <p>Requires immediate attention</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>📋 Claim Details</h3>
              <div class="info-grid">
                <div class="info-row"><span class="info-label">Policy Number:</span><span>${claimData.policyNumber}</span></div>
                <div class="info-row"><span class="info-label">Claim Type:</span><span>${claimData.claimType}</span></div>
                <div class="info-row"><span class="info-label">Incident Date:</span><span>${new Date(claimData.incidentDate).toLocaleDateString()}</span></div>
                <div class="info-row"><span class="info-label">Estimated Loss:</span><span>KES ${Number(claimData.estimatedLoss).toLocaleString()}</span></div>
                <div class="info-row"><span class="info-label">Status:</span><span class="status">PENDING REVIEW</span></div>
              </div>
            </div>

            <div class="section">
              <h3>👤 Customer Information</h3>
              <div class="info-grid">
                <div class="info-row"><span class="info-label">Name:</span><span>${claimData.submitterName || 'Not provided'}</span></div>
                <div class="info-row"><span class="info-label">Email:</span><span>${claimData.submitterEmail || 'Not provided'}</span></div>
                <div class="info-row"><span class="info-label">Phone:</span><span>${claimData.submitterPhone || 'Not provided'}</span></div>
              </div>
            </div>

            <div class="section">
              <h3>📝 Incident Description</h3>
              <div class="description">${claimData.description}</div>
            </div>

            <div class="section">
              <h3>📎 Documents (${documentCount} files)</h3>
              ${documentLinks ? `<p>Documents can be viewed at:<br>${documentLinks.replace(/\n/g, '<br>')}</p>` : '<p>No documents attached</p>'}
            </div>

            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/resources" class="button">View in Dashboard</a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p>Galloways Insurance Claims System</p>
          </div>
        </div>
      </body>
      </html>
    `;
        const textContent = `🚨 NEW CLAIM SUBMITTED\n\nPolicy: ${claimData.policyNumber}\nType: ${claimData.claimType}\nAmount: KES ${Number(claimData.estimatedLoss).toLocaleString()}\nCustomer: ${claimData.submitterName || 'N/A'}\nEmail: ${claimData.submitterEmail || 'N/A'}\n\nDescription:\n${claimData.description}\n\nDocuments: ${documentCount} files\n${documentLinks}\n\nView at: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/resources`;
        return await this.sendMail(adminEmail, subject, textContent, htmlContent);
    }
    async sendClaimConfirmation(customerEmail, claimData) {
        if (!customerEmail) {
            this.logger.warn('Customer email not provided for claim confirmation');
            return false;
        }
        const subject = `Claim Received - Reference #${claimData.claimId}`;
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: #d4a574; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; }
          .info-box { background: #f8f9fa; padding: 20px; border-radius: 6px; }
          .steps { background: #e8f4fd; padding: 20px; border-radius: 6px; }
          .step { margin-bottom: 10px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Claim Received</h1>
            <p>Thank you for choosing Galloways Insurance</p>
          </div>
          
          <div class="content">
            <p>Dear ${claimData.submitterName || 'Valued Customer'},</p>
            
            <p>Thank you for submitting your insurance claim. We have received your claim and our team is now reviewing it.</p>

            <div class="section">
              <h3>📋 Your Claim Summary</h3>
              <div class="info-box">
                <p><strong>Policy Number:</strong> ${claimData.policyNumber}</p>
                <p><strong>Claim Type:</strong> ${claimData.claimType}</p>
                <p><strong>Reference Number:</strong> #${claimData.claimId}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Estimated Loss:</strong> KES ${Number(claimData.estimatedLoss).toLocaleString()}</p>
              </div>
            </div>

            <div class="section">
              <h3>📋 What Happens Next</h3>
              <div class="steps">
                <div class="step">✓ Your claim is being reviewed (24-48 hours)</div>
                <div class="step">✓ We may contact you for additional information</div>
                <div class="step">✓ You'll receive email updates on progress</div>
              </div>
            </div>

            <div class="section">
              <h3>📞 Questions?</h3>
              <p><strong>Phone:</strong> +254 700 123 456<br>
              <strong>Email:</strong> claims@galloways.co.ke</p>
            </div>

            <p>Best regards,<br><strong>Claims Team</strong><br>Galloways Insurance</p>
          </div>
          
          <div class="footer">
            <p>Galloways Insurance - Your trusted partner</p>
          </div>
        </div>
      </body>
      </html>
    `;
        const textContent = `Dear ${claimData.submitterName || 'Customer'},\n\nYour claim has been received!\n\nClaim Reference: #${claimData.claimId}\nPolicy: ${claimData.policyNumber}\nType: ${claimData.claimType}\nAmount: KES ${Number(claimData.estimatedLoss).toLocaleString()}\n\nNext Steps:\n- Review within 24-48 hours\n- We may contact you for more info\n- Updates sent via email\n\nQuestions? Call +254 700 123 456\n\nBest regards,\nGalloways Insurance`;
        return await this.sendMail(customerEmail, subject, textContent, htmlContent);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map