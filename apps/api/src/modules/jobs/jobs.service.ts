import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { Prisma } from '@prisma/client';
import type { User, Job } from '@prisma/client';
import { JobResponseDto } from './dto/job-response.dto';

@Injectable()
export class JobsService {
  constructor(
    // @InjectRepository(Job)
    // private readonly jobRepository: Repository<Job>,
    private prisma: PrismaService,
  ) { }


  async create(dto: CreateJobDto, user: User) {
    try {
      const {companyId, ...jobData } = dto;
      const job = await this.prisma.client.job.create({
        data: {
          ...jobData,
          // Link the job to the employer (user)
          employer: {
            connect: { id: user.id }
          },
          // Link the job to the company using the ID
          company: {
            connect: { id: companyId }
          }
        },
      });
      return job;
    } catch (error: any) {
      throw new Error(`Error creating job: ${error.message}`);
    }
  }

  async findAll() {
      try {
          return this.prisma.client.job.findMany();
      } catch (error: any) {
          throw new Error(`Error fetching jobs: ${error.message}`);
      }
  }
}
