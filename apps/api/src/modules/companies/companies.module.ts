import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService], // exported so JobsModule can use it later
})
export class CompaniesModule {}
