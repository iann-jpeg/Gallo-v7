import { Controller, Get, Param, Res, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { Public } from '../middleware/public.decorator';

@Controller('static')
@Public()
export class StaticFilesController {
  
  @Get('downloads/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response): Promise<void> {
    try {
      // Sanitize filename to prevent directory traversal attacks
      const sanitizedFilename = filename.replace(/\.\./g, '').replace(/\//g, '');
      
      // Get the path to the frontend Downloads folder from backend
      const downloadsPath = join(process.cwd(), '..', 'frontend', 'public', 'Downloads');
      const filePath = join(downloadsPath, sanitizedFilename);
      
      // Check if file exists
      if (!existsSync(filePath)) {
        throw new NotFoundException(`File ${sanitizedFilename} not found`);
      }
      
      // Verify it's a PDF file (for security)
      if (!sanitizedFilename.toLowerCase().endsWith('.pdf')) {
        throw new BadRequestException('Only PDF files are allowed for download');
      }
      
      // Set appropriate headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFilename}"`);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
      
      // Send file
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          throw new NotFoundException('File could not be served');
        }
      });
      
    } catch (error) {
      console.error('Download error:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to process download request');
    }
  }

  @Get('downloads')
  async listDownloadableFiles(): Promise<{
    success: boolean;
    data: Array<{
      filename: string;
      displayName: string;
      description: string;
      category: string;
    }>;
    message: string;
  }> {
    try {
      // List of available PDF files in the Downloads folder
      const availableFiles = [
        {
          filename: 'Claim_Form_Motor_-_Ammended.pdf',
          displayName: 'Motor Claim Form (Amended)',
          description: 'Updated motor vehicle claim form',
          category: 'Motor Insurance'
        },
        {
          filename: 'Claim_Forms_-_Damage_or_Loss-amended.pdf',
          displayName: 'General Damage/Loss Claim Form',
          description: 'General claim form for damage or loss',
          category: 'General Insurance'
        },
        {
          filename: 'Fidelity_Guarantee_Claim_Forms.pdf',
          displayName: 'Fidelity Guarantee Claim Form',
          description: 'Claim form for fidelity guarantee insurance',
          category: 'Commercial Insurance'
        },
        {
          filename: 'Livestock Vetenary.pdf',
          displayName: 'Livestock Veterinary Form',
          description: 'Veterinary examination form for livestock insurance',
          category: 'Livestock Insurance'
        },
        {
          filename: 'Livestock_Insurance_Proposal_Form.pdf',
          displayName: 'Livestock Insurance Proposal',
          description: 'Proposal form for livestock insurance coverage',
          category: 'Livestock Insurance'
        },
        {
          filename: 'Machinery_Breakdown_Extr_Damage-Claim_Form.pdf',
          displayName: 'Machinery Breakdown Claim Form',
          description: 'Claim form for machinery breakdown and external damage',
          category: 'Commercial Insurance'
        },
        {
          filename: 'Medical Insurance - individual.pdf',
          displayName: 'Individual Medical Insurance',
          description: 'Individual medical insurance application form',
          category: 'Medical Insurance'
        },
        {
          filename: 'Motor Theft Claim Form.pdf',
          displayName: 'Motor Theft Claim Form',
          description: 'Specialized claim form for motor vehicle theft',
          category: 'Motor Insurance'
        },
        {
          filename: 'Motor_Entertainment_System_Claim_Form.pdf',
          displayName: 'Motor Entertainment System Claim',
          description: 'Claim form for in-vehicle entertainment systems',
          category: 'Motor Insurance'
        },
        {
          filename: 'Personal_Accident_Claim_Form.pdf',
          displayName: 'Personal Accident Claim Form',
          description: 'Claim form for personal accident insurance',
          category: 'Personal Insurance'
        },
        {
          filename: 'Public_Liability_(THIRDPARTY)_Claim_Form.pdf',
          displayName: 'Public Liability Claim Form',
          description: 'Third party public liability claim form',
          category: 'Liability Insurance'
        },
        {
          filename: 'Windscreen & window damage claim form.pdf',
          displayName: 'Windscreen & Window Damage Claim',
          description: 'Claim form for windscreen and window damage',
          category: 'Motor Insurance'
        },
        {
          filename: 'Workmen\'s_Compenstion_Accident_Claim_Form_-_ammended.pdf',
          displayName: 'Workmen\'s Compensation Claim Form',
          description: 'Workers compensation accident claim form (amended)',
          category: 'Workers Compensation'
        },
        {
          filename: 'claim_documentation_guide.pdf',
          displayName: 'Claim Documentation Guide',
          description: 'Comprehensive guide for claim documentation requirements',
          category: 'Documentation'
        },
        {
          filename: 'group_medical_insurance.pdf',
          displayName: 'Group Medical Insurance',
          description: 'Group medical insurance application and information',
          category: 'Medical Insurance'
        }
      ];

      return {
        success: true,
        data: availableFiles,
        message: 'Available download files retrieved successfully'
      };
      
    } catch (error) {
      console.error('Error listing downloadable files:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to retrieve downloadable files'
      };
    }
  }
}
