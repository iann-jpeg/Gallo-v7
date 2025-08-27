import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
import { CreateClaimDto, UpdateClaimDto } from '../config/claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    try {
      const [claims, total] = await Promise.all([
        this.prisma.claim.findMany({
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
        this.prisma.claim.count()
      ]);

      // Add document URLs to claims
      const claimsWithUrls = claims.map((claim: any) => ({
        ...claim,
        documentUrls: (claim.document || []).map((doc: any) => 
          `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/view/${doc.id}`
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
      const claim = await this.prisma.claim.findUnique({ 
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
          `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/view/${doc.id}`
        ),
      };

      return claimWithUrls;
    } catch (error: any) {
      throw new BadRequestException('Failed to fetch claim: ' + error.message);
    }
  }

  async create(data: CreateClaimDto & { documentDetails?: any[] }) {
    try {
      // Extract frontend-only fields and prepare database data
      const {
        documentPath,
        documentDetails,
        documents,
        firstName,
        lastName,
        email,
        phone,
        ...databaseFields
      } = data;

      const finalData = {
        policyNumber: data.policyNumber,
        claimType: data.claimType,
        incidentDate: new Date(data.incidentDate),
        estimatedLoss: Number(data.estimatedLoss),
        description: data.description,
        submitterName: firstName && lastName ? `${firstName} ${lastName}` : undefined,
        submitterEmail: email,
        submitterPhone: phone
      };

      // Save claim to database
      const claim = await this.prisma.claim.create({ data: finalData });

      // Handle document creation if provided
      if (documentDetails && documentDetails.length > 0) {
        await Promise.all(
          documentDetails.map(async (doc) => {
            let content: Buffer | undefined = undefined;
            
            // Read file content from disk if path exists
            if (doc.path) {
              try {
                const fs = require('fs').promises;
                const path = require('path');
                const fullPath = path.join(process.cwd(), 'uploads', 'claims', doc.filename);
                content = await fs.readFile(fullPath);
              } catch (error) {
                console.error('Error reading file:', error);
              }
            }

            const documentData: any = {
              filename: doc.filename,
              originalName: doc.originalName,
              mimeType: doc.mimeType,
              size: doc.size,
              path: doc.path || doc.filename,
              claimId: claim.id,
            };

            // Only add content if we have it
            if (content) {
              documentData.content = content;
            }

            return this.prisma.document.create({
              data: documentData
            });
          })
        );
      }

      // Prepare comprehensive notification data
      const claimNotificationData = {
        policyNumber: data.policyNumber,
        claimType: data.claimType,
        incidentDate: data.incidentDate,
        estimatedLoss: data.estimatedLoss,
        description: data.description,
        submitterName: finalData.submitterName || 'Not provided',
        submitterEmail: email || 'Not provided',
        submitterPhone: phone || 'Not provided',
        documentCount: documentDetails?.length || 0,
        documentLinks: documentDetails?.map(doc => 
          `${process.env.API_BASE_URL || 'http://localhost:3001/api'}/documents/claims/${doc.filename}`
        ).join('\n') || 'No documents uploaded'
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
        email ? this.emailService.sendClaimConfirmation(
          email,
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
      const claim = await this.prisma.claim.update({ 
        where: { id }, 
        data: {
          updatedAt: new Date(),
          ...data
        }
      });

      // Get the claim with full details for notifications
      const fullClaim = await this.prisma.claim.findUnique({ 
        where: { id }
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
        // Send notification when submitter email is available
        // await this.emailService.sendNotificationEmail();
        // fullClaim?.submitterEmail && data.status ? this.emailService.sendMail(
        //   fullClaim.submitterEmail,
        //   `Claim Status Update - Reference #${id}`,
        //   `Dear Customer,\n\nYour claim (Reference #${id}) status has been updated to: ${data.status}\n\nFor questions, contact us at claims@galloways.co.ke\n\nBest regards,\nGalloways Insurance`
        // ) : Promise.resolve()
      ]);

      return claim;
    } catch (error: any) {
      throw new BadRequestException('Failed to update claim: ' + error.message);
    }
  }

  async updateStatus(id: number, status: string) {
    try {
      const claim = await this.prisma.claim.update({ 
        where: { id }, 
        data: {
          status: status,
          updatedAt: new Date()
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        }
      });

      // Send notification emails
      await Promise.allSettled([
        // Admin notification
        this.emailService.sendMail(
          process.env.ADMIN_EMAIL!,
          `Claim Status Updated - #${id}`,
          `Claim #${id} status has been updated to: ${status}\n\nView in dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin`
        ),
        // Customer notification if submitter email exists
        claim.submitterEmail ? this.emailService.sendMail(
          claim.submitterEmail,
          `Claim Status Update - Reference #${id}`,
          `Dear Customer,\n\nYour claim (Reference #${id}) status has been updated to: ${status}\n\nFor questions, contact us at claims@galloways.co.ke\n\nBest regards,\nGalloways Insurance`
        ) : Promise.resolve()
      ]);

      return claim;
    } catch (error: any) {
      throw new BadRequestException('Failed to update claim status: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.claim.delete({ where: { id } });
      
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
