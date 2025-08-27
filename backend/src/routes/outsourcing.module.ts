import { Module } from '@nestjs/common';
import { OutsourcingController } from '../controllers/outsourcing.controller';
import { OutsourcingService } from '../services/outsourcing.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OutsourcingController],
  providers: [OutsourcingService, PrismaService],
})
export class OutsourcingModule {}
