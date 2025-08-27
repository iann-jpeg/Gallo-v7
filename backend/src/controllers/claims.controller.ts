import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query, UploadedFile, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { Public } from '../middleware/public.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ClaimsService } from '../services/claims.service';
import { CreateClaimDto, UpdateClaimDto } from '../config/claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Public()
  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    try {
      const claims = await this.claimsService.findAll({ page, limit });
      return {
        success: true,
        data: claims
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to fetch claims');
    }
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const claim = await this.claimsService.findOne(+id);
      return {
        success: true,
        data: claim
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to fetch claim');
    }
  }

  @Public()
  @Get(':id/documents')
  async getClaimDocuments(@Param('id') id: string) {
    try {
      const claim = await this.claimsService.findOne(+id);
      return {
        success: true,
        data: claim.document
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to fetch claim documents');
    }
  }

  @Post()
  @Public()
  @UseInterceptors(
    FilesInterceptor('documents', 5, { // Allow up to 5 files
      storage: diskStorage({
        destination: './uploads/claims',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          callback(null, `claim-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf|jpg|jpeg|png|doc|docx)$/)) {
          return callback(new BadRequestException('Only PDF, JPG, PNG, and DOC files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit per file
      },
    }),
  )
  async create(@Body() data: CreateClaimDto, @UploadedFiles() documents?: Express.Multer.File[]) {
    try {
      // Prepare document information for storage
      let documentPaths: string[] = [];
      let documentDetails: Array<{
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        path: string;
      }> = [];

      if (documents && documents.length > 0) {
        documentPaths = documents.map(file => file.filename);
        documentDetails = documents.map(file => ({
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: file.path
        }));
      }
      
      // Add document info to the claim data
        const claimData = {
          ...data,
          documentDetails: documentDetails
        };
      
      const claim = await this.claimsService.create(claimData);
      return {
        success: true,
        message: 'Claim submitted successfully',
        data: claim
      };
    } catch (error: any) {
      console.error('Claim creation error:', error);
      throw new BadRequestException(error.message || 'Failed to submit claim');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateClaimDto) {
    try {
      const claim = await this.claimsService.update(+id, data);
      return {
        success: true,
        message: 'Claim updated successfully',
        data: claim
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to update claim');
    }
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    try {
      const claim = await this.claimsService.updateStatus(+id, body.status);
      return {
        success: true,
        message: 'Claim status updated successfully',
        data: claim
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to update claim status');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.claimsService.remove(+id);
      return {
        success: true,
        message: 'Claim deleted successfully'
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to delete claim');
    }
  }
}
