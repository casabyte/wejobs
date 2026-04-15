import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';
import { Job } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  // @Get()
  // async findAll(): Promise<Job[]> {
  //     return this.jobsService.findAll();
  // }

  // @Post()
  // async create(@Body() createJobDto: CreateJobDto) : Promise<Job> {
  //     return this.jobsService.create(createJobDto);
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Job> {
  //     return this.jobsService.findOne(id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto): Promise<Job> {
  //     return this.jobsService.update(id, updateJobDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //     return this.jobsService.remove(id);
  // }
}
