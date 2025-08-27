import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmailService } from './email.service';
import { CreateConsultationDto, UpdateConsultationDto } from '../config/consultation.dto';

const prisma = new PrismaClient();

@Injectable()
export class ConsultationsService {
  constructor(
    private readonly emailService: EmailService
  ) {}

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
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
    } catch (error) {
      throw new BadRequestException('Failed to fetch consultations');
    }
  }

  async findOne(id: number) {
    try {
      const consultation = await prisma.consultation.findUnique({ where: { id } });
      if (!consultation) {
        throw new NotFoundException(`Consultation with ID ${id} not found`);
      }
      return consultation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch consultation');
    }
  }

  async create(data: CreateConsultationDto) {
    try {
      // Parse consultation date and time to create scheduledAt
      let scheduledAt: Date | undefined;
      if (data.consultationDate && data.consultationTime) {
        // Combine date and time
        const dateTimeString = `${data.consultationDate}T${data.consultationTime}:00`;
        scheduledAt = new Date(dateTimeString);
        if (isNaN(scheduledAt.getTime())) {
          throw new BadRequestException('Invalid consultation date or time format');
        }
      }

      const consultation = await prisma.consultation.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          serviceInterest: data.serviceType,
          consultationDate: data.consultationDate ? new Date(data.consultationDate) : undefined,
          // Store company and message inside notes for compatibility
          notes: [data.company, data.message].filter(Boolean).join('\n') || null,
          country: data.country,
          timezone: data.timezone,
          scheduledAt,
        },
      });

      // Send notification emails
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

      // Send emails (don't throw if email fails)
      Promise.allSettled([
        this.emailService.sendMail(
          process.env.ADMIN_EMAIL!,
          'New Consultation Booking',
          adminMessage
        ),
        this.emailService.sendMail(
          data.email,
          'Consultation Booking Confirmation - Galloways Insurance',
          clientMessage
        )
      ]).catch((error) => {
        console.error('Notification error:', error);
        // Don't throw here, as the booking itself was successful
      });

      return {
        success: true,
        message: 'Consultation booked successfully',
        data: consultation
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to create consultation booking');
    }
  }

  async update(id: number, data: UpdateConsultationDto) {
    try {
      const updateData: any = {};
      
      if (data.name) updateData.name = data.name;
      if (data.email) updateData.email = data.email;
      if (data.phone) updateData.phone = data.phone;
  if (data.company !== undefined || data.message !== undefined) updateData.notes = [data.company, data.message].filter(Boolean).join('\n') || undefined;
      if (data.serviceType) updateData.serviceType = data.serviceType;
      if (data.consultationDate) updateData.consultationDate = data.consultationDate;
      if (data.consultationTime) {
        // consultationTime is not a separate field in schema; include in notes
        updateData.notes = (updateData.notes ? updateData.notes + '\n' : '') + data.consultationTime;
      }
      if (data.country !== undefined) updateData.country = data.country;
      if (data.timezone !== undefined) updateData.timezone = data.timezone;
      if (data.status) updateData.status = data.status;
      if (data.scheduledAt) updateData.scheduledAt = new Date(data.scheduledAt);
      
      updateData.updatedAt = new Date();

      const consultation = await prisma.consultation.update({
        where: { id },
        data: updateData,
      });

      return consultation;
    } catch (error) {
      if (error instanceof Object && 'code' in error && error.code === 'P2025') {
        throw new NotFoundException(`Consultation with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to update consultation');
    }
  }

  async remove(id: number) {
    try {
      const consultation = await prisma.consultation.delete({ where: { id } });
      return consultation;
    } catch (error) {
      if (error instanceof Object && 'code' in error && error.code === 'P2025') {
        throw new NotFoundException(`Consultation with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete consultation');
    }
  }
}
