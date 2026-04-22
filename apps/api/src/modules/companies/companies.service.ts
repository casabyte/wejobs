import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import type { User } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompanyDto, user: User) {
    // A User can only own one Company (1-to-1 enforced by @unique on creatorId)
    // const existing = await this.prisma.client.company.findUnique({
    //   where: { creatorId: user.id },
    // });

    // if (existing) {
    //   throw new ConflictException('You already have a company registered');
    // }

    const company = await this.prisma.client.company.create({
      data: {
        ...dto,
        creatorId: user.id,
      },
    });

    return company;
  }

  async findAll() {
    return this.prisma.client.company.findMany({
      include: {
        creator: {
          select: { id: true, firstname: true, lastname: true, email: true }, // never expose password
        },
        job: {
          select: { id: true, title: true, location: true, salary: true },
        },
      },
    });
  }

  // async findOne(id: string) {
  //   const company = await this.prisma.client.company.findUnique({
  //     where: { id },
  //     include: {
  //       owner: {
  //         select: { id: true, firstname: true, email: true },
  //       },
  //       job: {
  //         select: { id: true, title: true, location: true, salary: true },
  //       },
  //     },
  //   });

  //   if (!company) throw new NotFoundException('Company not found');

  //   return company;
  // }

  // async findByOwner(creatorId: string) {
  //   const company = await this.prisma.client.company.findUnique({
  //     where: { creatorId },
  //     include: {
  //       job: true,
  //     },
  //   });

  //   if (!company) throw new NotFoundException('No company found for this user');

  //   return company;
  // }

  async update(id: string, dto: UpdateCompanyDto, requestingUser: User) {
    const company = await this.prisma.client.company.findUnique({
      where: { id },
    });

    if (!company) throw new NotFoundException('Company not found');

    // Only the owner (or ADMIN) can update the company
    if (
      company.creatorId !== requestingUser.id &&
      requestingUser.role !== 'ADMIN'
    ) {
      throw new ForbiddenException('You are not the owner of this company');
    }

    return this.prisma.client.company.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, requestingUser: User) {
    const company = await this.prisma.client.company.findUnique({
      where: { id },
    });

    if (!company) throw new NotFoundException('Company not found');

    // Only the owner or an ADMIN can delete the company
    if (
      company.creatorId !== requestingUser.id &&
      requestingUser.role !== 'ADMIN'
    ) {
      throw new ForbiddenException('You are not the owner of this company');
    }

    await this.prisma.client.company.delete({ where: { id } });

    return { message: 'Company deleted successfully' };
  }
}
