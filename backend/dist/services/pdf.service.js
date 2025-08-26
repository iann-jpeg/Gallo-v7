"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const PDFKit = require("pdfkit");
let PdfService = class PdfService {
    async generateDashboardReport(data, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const doc = new PDFKit();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=dashboard-report.pdf');
        doc.pipe(res);
        doc.fontSize(20).text('Galloways Insurance - Admin Dashboard Report', 50, 50);
        doc.fontSize(14).text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 80);
        let yPosition = 120;
        doc.fontSize(16).text('Summary Statistics', 50, yPosition);
        yPosition += 30;
        doc.fontSize(12)
            .text(`Total Claims: ${data.totalClaims}`, 50, yPosition)
            .text(`Total Consultations: ${data.totalConsultations}`, 250, yPosition);
        yPosition += 20;
        doc.text(`Total Outsourcing Requests: ${data.totalOutsourcingRequests}`, 50, yPosition)
            .text(`Total Payments: ${data.totalPayments}`, 250, yPosition);
        yPosition += 20;
        doc.text(`Total Diaspora Requests: ${data.totalDiasporaRequests}`, 50, yPosition)
            .text(`Monthly Revenue: KSh ${((_a = data.monthlyRevenue) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || 0}`, 250, yPosition);
        yPosition += 40;
        if (((_c = (_b = data.allSubmissions) === null || _b === void 0 ? void 0 : _b.claims) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            doc.fontSize(16).text('Claims Details', 50, yPosition);
            yPosition += 30;
            data.allSubmissions.claims.forEach((claim, index) => {
                var _a;
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(10)
                    .text(`${index + 1}. Policy: ${claim.policyNumber} | Client: ${claim.clientEmail}`, 50, yPosition)
                    .text(`   Incident: ${claim.incidentType} | Amount: KSh ${((_a = claim.claimAmount) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || 0}`, 50, yPosition + 15)
                    .text(`   Status: ${claim.status} | Date: ${new Date(claim.createdAt).toLocaleDateString()}`, 50, yPosition + 30);
                yPosition += 50;
            });
            yPosition += 20;
        }
        if (((_e = (_d = data.allSubmissions) === null || _d === void 0 ? void 0 : _d.outsourcing) === null || _e === void 0 ? void 0 : _e.length) > 0) {
            if (yPosition > 600) {
                doc.addPage();
                yPosition = 50;
            }
            doc.fontSize(16).text('Outsourcing Requests', 50, yPosition);
            yPosition += 30;
            data.allSubmissions.outsourcing.forEach((request, index) => {
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(10)
                    .text(`${index + 1}. Company: ${request.companyName} | Email: ${request.contactEmail}`, 50, yPosition)
                    .text(`   Service: ${request.serviceType} | Budget: ${request.budgetRange}`, 50, yPosition + 15)
                    .text(`   Status: ${request.status} | Date: ${new Date(request.createdAt).toLocaleDateString()}`, 50, yPosition + 30);
                yPosition += 50;
            });
            yPosition += 20;
        }
        if (((_g = (_f = data.allSubmissions) === null || _f === void 0 ? void 0 : _f.consultations) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            if (yPosition > 600) {
                doc.addPage();
                yPosition = 50;
            }
            doc.fontSize(16).text('Consultations', 50, yPosition);
            yPosition += 30;
            data.allSubmissions.consultations.forEach((consultation, index) => {
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(10)
                    .text(`${index + 1}. Name: ${consultation.fullName} | Email: ${consultation.email}`, 50, yPosition)
                    .text(`   Service: ${consultation.serviceType}`, 50, yPosition + 15)
                    .text(`   Status: ${consultation.status} | Date: ${new Date(consultation.createdAt).toLocaleDateString()}`, 50, yPosition + 30);
                yPosition += 50;
            });
            yPosition += 20;
        }
        if (((_j = (_h = data.allSubmissions) === null || _h === void 0 ? void 0 : _h.payments) === null || _j === void 0 ? void 0 : _j.length) > 0) {
            if (yPosition > 600) {
                doc.addPage();
                yPosition = 50;
            }
            doc.fontSize(16).text('Payments', 50, yPosition);
            yPosition += 30;
            data.allSubmissions.payments.forEach((payment, index) => {
                var _a;
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(10)
                    .text(`${index + 1}. Policy: ${payment.policyNumber} | Client: ${payment.clientEmail}`, 50, yPosition)
                    .text(`   Amount: KSh ${((_a = payment.amount) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || 0} | Method: ${payment.paymentMethod}`, 50, yPosition + 15)
                    .text(`   Status: ${payment.status} | Date: ${new Date(payment.createdAt).toLocaleDateString()}`, 50, yPosition + 30);
                yPosition += 50;
            });
            yPosition += 20;
        }
        if (((_l = (_k = data.allSubmissions) === null || _k === void 0 ? void 0 : _k.diaspora) === null || _l === void 0 ? void 0 : _l.length) > 0) {
            if (yPosition > 600) {
                doc.addPage();
                yPosition = 50;
            }
            doc.fontSize(16).text('Diaspora Requests', 50, yPosition);
            yPosition += 30;
            data.allSubmissions.diaspora.forEach((request, index) => {
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(10)
                    .text(`${index + 1}. Name: ${request.fullName} | Email: ${request.email}`, 50, yPosition)
                    .text(`   Country: ${request.currentCountry} | Service: ${request.serviceType}`, 50, yPosition + 15)
                    .text(`   Status: ${request.status} | Date: ${new Date(request.createdAt).toLocaleDateString()}`, 50, yPosition + 30);
                yPosition += 50;
            });
        }
        doc.end();
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map