import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmailService } from './email.service';
import { CreateClaimDto, UpdateClaimDto } from '../config/claim.dto';

const prisma = new PrismaClient();

@Injectable()
export class ClaimsService {
  constructor(
    private readonly emailService: EmailService
  ) {}

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    try {
      const [claims, total] = await Promise.all([
        prisma.claim.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            document: {
              select: {
                id: true,
                filename: true,
                originalName: true,
                mimeType: true,
                size: true,
                createdAt: true,
              },
            },
          },
        }),
        prisma.claim.count()
      ]);

      // Add document URLs to claims
      const claimsWithUrls = claims.map((claim: any) => ({
        ...claim,
        documentUrls: (claim.document || []).map((doc: any) => 
          `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/claims/${doc.filename}`
        ),
      }));

      return {
        data: claimsWithUrls,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch claims');
    }
  }

  async findOne(id: number) {
    try {
      const claim = await prisma.claim.findUnique({ 
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          document: {
            select: {
              id: true,
              filename: true,
              originalName: true,
              mimeType: true,
              size: true,
              createdAt: true,
            },
          },
        }
      });
      if (!claim) throw new BadRequestException('Claim not found');
      
      // Add document URLs
      const claimWithUrls = {
        ...claim,
        documentUrls: (claim.document || []).map((doc: any) => 
          `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/claims/${doc.filename}`
        ),
      };

      return claimWithUrls;
    } catch (error: any) {
      throw new BadRequestException('Failed to fetch claim: ' + error.message);
    }
  }

  async getClaimDocuments(id: number) {
    try {
      const claim = await prisma.claim.findUnique({
        where: { id },
        select: {
          document: {
            select: {
              id: true,
              filename: true,
              originalName: true,
              mimeType: true,
              size: true,
              createdAt: true,
            },
          },
        }
      });

      if (!claim) throw new NotFoundException('Claim not found');

      // Add URLs to documents
  const documentsWithUrls = (claim.document || []).map((doc: any) => ({
        ...doc,
        url: `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/claims/${doc.filename}`,
      }));

      return documentsWithUrls;
    } catch (error: any) {
      throw new BadRequestException('Failed to fetch claim documents: ' + error.message);
    }
  }

  async create(data: CreateClaimDto & { documentDetails?: any[] }) {
    try {
      // Prepare data for database without documents field for now
      const { documentPath, documentDetails, documents, ...claimData } = data;
      const finalData = {
        ...claimData,
        incidentDate: new Date(data.incidentDate),
        estimatedLoss: Number(data.estimatedLoss),
        submitterName: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : undefined,
        submitterEmail: data.email,
        submitterPhone: data.phone
      };

      // Save claim to database
      const claim = await prisma.claim.create({ data: finalData });

      // Handle document creation
      let documentsArray: string[] = [];
      if (documentDetails && documentDetails.length > 0) {
        await Promise.all(
          documentDetails.map(doc => 
            prisma.document.create({
              data: {
                filename: doc.filename,
                originalName: doc.originalName,
                mimeType: doc.mimeType,
                size: doc.size,
                path: doc.path || doc.filename,
                claimId: claim.id,
              }
            })
          )
        );
        documentsArray = documentDetails.map(doc => doc.filename);
      }

      // Prepare comprehensive notification data
      const claimNotificationData = {
        policyNumber: data.policyNumber,
        claimType: data.claimType,
        incidentDate: data.incidentDate,
        estimatedLoss: data.estimatedLoss,
        description: data.description,
        submitterName: finalData.submitterName,
        submitterEmail: data.email,
        submitterPhone: data.phone,
        documentCount: documentsArray.length,
        documentLinks: documentsArray.map(filename => 
          `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/claims/${filename}`
        ).join('\n')
      };

      const customerNotificationData = {
        ...claimNotificationData,
        claimId: claim.id
      };

      // Send notifications
      await Promise.allSettled([
        // Admin notification with rich HTML
        this.emailService.sendClaimNotification(
          process.env.ADMIN_EMAIL!,
          claimNotificationData
        ),
        // Customer notification if email provided
        data.email ? this.emailService.sendClaimConfirmation(
          data.email,
          customerNotificationData
        ) : Promise.resolve()
      ]);

      return claim;
    } catch (error: any) {
      console.error('Claim creation error:', error);
      throw new BadRequestException('Failed to create claim: ' + error.message);
    }
  }

  async update(id: number, data: any) {
    try {
      const claim = await prisma.claim.update({ 
        where: { id }, 
        data: {
          updatedAt: new Date(),
          ...data
        }
      });

      // Get the claim with full details for notifications
      const fullClaim = await prisma.claim.findUnique({ 
        where: { id },
        include: {
          document: true
        }
      });

      // Notify admin and client of update
      const updatedFields = Object.keys(data).join(', ');
      
      await Promise.allSettled([
        // Admin notification
        this.emailService.sendMail(
          process.env.ADMIN_EMAIL!,
          `Claim Updated - #${id}`,
          `Claim #${id} has been updated.\n\nUpdated fields: ${updatedFields}\n\nView in dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/resources`
        ),
        // Client notification if email exists and status changed
        fullClaim?.submitterEmail && data.status ? this.emailService.sendMail(
          fullClaim.submitterEmail,
          `Claim Status Update - Reference #${id}`,
          `Dear Customer,\n\nYour claim (Reference #${id}) status has been updated to: ${data.status}\n\nFor questions, contact us at claims@galloways.co.ke\n\nBest regards,\nGalloways Insurance`
        ) : Promise.resolve()
      ]);

      return claim;
    } catch (error: any) {
      throw new BadRequestException('Failed to update claim: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      await prisma.claim.delete({ where: { id } });
      
      // Notify admin of deletion
      await Promise.allSettled([
        this.emailService.sendMail(
          process.env.ADMIN_EMAIL!,
          `Claim Deleted - #${id}`,
          `Claim #${id} has been permanently deleted from the system.\n\nDeleted on: ${new Date().toLocaleString()}`
        )
      ]);
      
      return true;
    } catch (error: any) {
      throw new BadRequestException('Failed to delete claim: ' + error.message);
    }
  }
}
