import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [AuthenticationModule, SalesModule],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
