import { Module } from '@nestjs/common';
import { DocumentsController } from '../controllers/documents.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DocumentsController],
  providers: [PrismaService],
})
export class DocumentsModule {}
