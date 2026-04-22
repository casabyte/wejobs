import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';
import type { Job } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { User } from '@prisma/client';
import { JobResponseDto } from './dto/job-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async findAll(): Promise<Job[]> {
      return this.jobsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard) // ← only authenticated users can create jobs
  async create(
    @Body() dto: CreateJobDto,
    @CurrentUser() user: User,
  ): Promise<JobResponseDto> {
    const job = await this.jobsService.create(dto, user); 
    return new JobResponseDto(job);
  }

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
