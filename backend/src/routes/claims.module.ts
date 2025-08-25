import { Module } from '@nestjs/common';
import { ClaimsController } from '../controllers/claims.controller';
import { ClaimsService } from '../services/claims.service';
import { EmailService } from '../services/email.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, EmailService, PrismaService],
})
export class ClaimsModule {}
