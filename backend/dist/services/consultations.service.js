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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const email_service_1 = require("./email.service");
const prisma = new client_1.PrismaClient();
let ConsultationsService = class ConsultationsService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async findAll({ page = 1, limit = 10 }) {
        try {
            const [consultations, total] = await Promise.all([
                prisma.consultation.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.consultation.count()
            ]);
            return {
                data: consultations,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch consultations');
        }
    }
    async findOne(id) {
        try {
            const consultation = await prisma.consultation.findUnique({ where: { id } });
            if (!consultation) {
                throw new common_1.NotFoundException(`Consultation with ID ${id} not found`);
            }
            return consultation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch consultation');
        }
    }
    async create(data) {
        try {
            let scheduledAt;
            if (data.consultationDate && data.consultationTime) {
                const dateTimeString = `${data.consultationDate}T${data.consultationTime}:00`;
                scheduledAt = new Date(dateTimeString);
                if (isNaN(scheduledAt.getTime())) {
                    throw new common_1.BadRequestException('Invalid consultation date or time format');
                }
            }
            const consultation = await prisma.consultation.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    serviceInterest: data.serviceType,
                    consultationDate: data.consultationDate ? new Date(data.consultationDate) : undefined,
                    notes: [data.company, data.message].filter(Boolean).join('\n') || null,
                    country: data.country,
                    timezone: data.timezone,
                    scheduledAt,
                },
            });
            const adminMessage = `New consultation booking received:
      
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'Not provided'}
Service Type: ${data.serviceType}
Consultation Date: ${data.consultationDate}
Consultation Time: ${data.consultationTime}
Country: ${data.country || 'Not provided'}
Timezone: ${data.timezone || 'Not provided'}
Message: ${data.message}

View in dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin`;
            const clientMessage = `Dear ${data.name},

Thank you for your consultation booking request. We have received your inquiry and will contact you soon to confirm your appointment.

Details of your request:
- Service Type: ${data.serviceType}
- Scheduled Date: ${data.consultationDate}
- Scheduled Time: ${data.consultationTime}
- Message: ${data.message}

We will reach out to you at ${data.email} or ${data.phone} within 24 hours to confirm your consultation.

Best regards,
Galloways Insurance Team`;
            Promise.allSettled([
                this.emailService.sendMail(process.env.ADMIN_EMAIL, 'New Consultation Booking', adminMessage),
                this.emailService.sendMail(data.email, 'Consultation Booking Confirmation - Galloways Insurance', clientMessage)
            ]).catch((error) => {
                console.error('Notification error:', error);
            });
            return {
                success: true,
                message: 'Consultation booked successfully',
                data: consultation
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException('Failed to create consultation booking');
        }
    }
    async update(id, data) {
        try {
            const updateData = {};
            if (data.name)
                updateData.name = data.name;
            if (data.email)
                updateData.email = data.email;
            if (data.phone)
                updateData.phone = data.phone;
            if (data.company !== undefined || data.message !== undefined)
                updateData.notes = [data.company, data.message].filter(Boolean).join('\n') || undefined;
            if (data.serviceType)
                updateData.serviceType = data.serviceType;
            if (data.consultationDate)
                updateData.consultationDate = data.consultationDate;
            if (data.consultationTime) {
                updateData.notes = (updateData.notes ? updateData.notes + '\n' : '') + data.consultationTime;
            }
            if (data.country !== undefined)
                updateData.country = data.country;
            if (data.timezone !== undefined)
                updateData.timezone = data.timezone;
            if (data.status)
                updateData.status = data.status;
            if (data.scheduledAt)
                updateData.scheduledAt = new Date(data.scheduledAt);
            updateData.updatedAt = new Date();
            const consultation = await prisma.consultation.update({
                where: { id },
                data: updateData,
            });
            return consultation;
        }
        catch (error) {
            if (error instanceof Object && 'code' in error && error.code === 'P2025') {
                throw new common_1.NotFoundException(`Consultation with ID ${id} not found`);
            }
            throw new common_1.BadRequestException('Failed to update consultation');
        }
    }
    async remove(id) {
        try {
            const consultation = await prisma.consultation.delete({ where: { id } });
            return consultation;
        }
        catch (error) {
            if (error instanceof Object && 'code' in error && error.code === 'P2025') {
                throw new common_1.NotFoundException(`Consultation with ID ${id} not found`);
            }
            throw new common_1.BadRequestException('Failed to delete consultation');
        }
    }
};
exports.ConsultationsService = ConsultationsService;
exports.ConsultationsService = ConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], ConsultationsService);
//# sourceMappingURL=consultations.service.js.map