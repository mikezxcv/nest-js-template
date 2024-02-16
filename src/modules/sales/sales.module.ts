import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sale.entity'
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, Invoice, InvoiceDetail])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService]
})
export class SalesModule { }
