import { Module } from '@nestjs/common';
import { HealthController } from '../controllers/health.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MinimalDashboardService } from '../services/minimal-dashboard.service';

@Module({
  controllers: [HealthController],
  providers: [PrismaService, MinimalDashboardService],
})
export class HealthModule {}
