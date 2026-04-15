// users.controller.ts
import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard) // ← all routes in this controller are protected
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser() user: User): Promise<UserResponseDto> {
    // Wrap in UserResponseDto to strip the password
    return new UserResponseDto(user);
  }

  @Patch('me')
  async updateMe(
    @CurrentUser() user: User,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updated = await this.usersService.update(user.id, dto);
    return new UserResponseDto(updated);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 — success with no body
  async deleteMe(@CurrentUser() user: User): Promise<void> {
    await this.usersService.remove(user.id);
  }
}
