import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(
    // @InjectRepository(Job)
    // private readonly jobRepository: Repository<Job>,
    private prisma: PrismaService,
  ) {}

  // TODO: I need to know why it returns a <Promise<Job> instead of a Job, and how to fix it.
  // I think it's because the create method is async, but I'm not sure how to fix it.
  //   async create(createJobDto: CreateJobDto): Promise<Job> {
  //     return this.prisma.client.job.create({ data: createJobDto });
  //   }

  // async create(data: Prisma.JobCreateInput) {
  //     try {
  //         return this.prisma.client.job.create({ data });
  //     } catch (error: any) {
  //         throw new Error(`Error creating job: ${error.message}`);
  //     }
  // }

  // async findAll() {
  //     try {
  //         return this.prisma.client.job.findMany();
  //     } catch (error: any) {
  //         throw new Error(`Error fetching jobs: ${error.message}`);
  //     }
  // }
}
