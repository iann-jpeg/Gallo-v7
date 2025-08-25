import { Module } from '@nestjs/common';
import { StaticFilesController } from '../controllers/static-files.controller';

@Module({
  controllers: [StaticFilesController],
})
export class StaticFilesModule {}
