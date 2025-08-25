import { Controller, Get, Param, Res, BadRequestException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../middleware/public.decorator';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly prisma: PrismaService) {}
  
  @Get('claims/:filename')
  @Public()
  async viewClaimDocument(@Param('filename') filename: string, @Res() res: Response) {
    try {
      // Security: validate filename to prevent path traversal
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        throw new BadRequestException('Invalid filename');
      }

      // Find document in database
      const document = await this.prisma.document.findFirst({
        where: {
          filename: filename,
          claimId: { not: null }
        }
      });
      
      if (!document || !document.content) {
        throw new NotFoundException('Document not found or no content available');
      }

      // Set appropriate content type based on mimeType
      res.setHeader('Content-Type', document.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
      res.setHeader('Content-Length', document.size.toString());
      
      // Send file content from database
      res.send(Buffer.from(document.content));
    } catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to serve document: ' + error.message);
    }
  }

  @Get('quotes/:filename')
  @Public()
  async viewQuoteDocument(@Param('filename') filename: string, @Res() res: Response) {
    try {
      // Security: validate filename to prevent path traversal
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        throw new BadRequestException('Invalid filename');
      }

      // Find document in database
      const document = await this.prisma.document.findFirst({
        where: {
          filename: filename,
          quoteId: { not: null }
        }
      });
      
      if (!document || !document.content) {
        throw new NotFoundException('Document not found or no content available');
      }

      // Set appropriate content type based on mimeType
      res.setHeader('Content-Type', document.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
      res.setHeader('Content-Length', document.size.toString());
      
      // Send file content from database
      res.send(Buffer.from(document.content));
    } catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to serve document: ' + error.message);
    }
  }

  // New endpoint to view document by ID
  @Get('view/:id')
  @Public()
  async viewDocumentById(@Param('id') id: string, @Res() res: Response) {
    try {
      const documentId = parseInt(id);
      if (isNaN(documentId)) {
        throw new BadRequestException('Invalid document ID');
      }

      // Find document in database by ID
      const document = await this.prisma.document.findUnique({
        where: { id: documentId }
      });
      
      if (!document || !document.content) {
        throw new NotFoundException('Document not found or no content available');
      }

      // Set appropriate content type based on mimeType
      res.setHeader('Content-Type', document.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
      res.setHeader('Content-Length', document.size.toString());
      
      // Send file content from database
      res.send(Buffer.from(document.content));
    } catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to serve document: ' + error.message);
    }
  }
}
