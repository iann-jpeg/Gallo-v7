import { Module } from '@nestjs/common';
import { HealthController } from '../controllers/health.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardService } from '../services/dashboard.service';

@Module({
  controllers: [HealthController],
  providers: [PrismaService, DashboardService],
})
export class HealthModule {}
