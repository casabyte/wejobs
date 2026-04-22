import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { User } from '@prisma/client';

@ApiTags('companies')
@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  // POST /companies
  // Only an authenticated EMPLOYER should call this (enforced in service)
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a company (EMPLOYER only)' })
  async create(
    @Body() dto: CreateCompanyDto,
    @CurrentUser() user: User,
  ): Promise<CompanyResponseDto> {
    const company = await this.companiesService.create(dto, user);
    return new CompanyResponseDto(company);
  }

  // GET /companies
  // Public any user can browse companies
  @Get()
  @ApiOperation({ summary: 'List all companies' })
  async findAll(): Promise<CompanyResponseDto[]> {
    const companies = await this.companiesService.findAll();
    return companies.map((c) => new CompanyResponseDto(c));
  }

  // GET /companies/me
  // Returns the company owned by the currently authenticated user
  // @Get('me')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: "Get the current user's company" })
  // async findMine(@CurrentUser() user: User): Promise<CompanyResponseDto> {
  //   const company = await this.companiesService.findByOwner(user.id);
  //   return new CompanyResponseDto(company);
  // }

  // GET /companies/:id
  // @Get(':id')
  // @ApiOperation({ summary: 'Get a company by ID' })
  // @ApiParam({ name: 'id', type: String })
  // async findOne(@Param('id') id: string): Promise<CompanyResponseDto> {
  //   const company = await this.companiesService.findOne(id);
  //   return new CompanyResponseDto(company);
  // }

  // PATCH /companies/:id
  // Only the owner or ADMIN can update
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a company (owner or ADMIN only)' })
  @ApiParam({ name: 'id', type: String })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
    @CurrentUser() user: User,
  ): Promise<CompanyResponseDto> {
    const company = await this.companiesService.update(id, dto, user);
    return new CompanyResponseDto(company);
  }

  // DELETE /companies/:id
  // Only the owner or ADMIN can delete
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a company (owner or ADMIN only)' })
  @ApiParam({ name: 'id', type: String })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.companiesService.remove(id, user);
  }
}
