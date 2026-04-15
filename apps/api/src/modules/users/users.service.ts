// users.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} // ← injected via @Global PrismaModule

  // Used by AuthService during registration
  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.client.user.create({ data });
    } catch (e: any) {
      // Prisma unique constraint violation code
      if (e.code === 'P2002') {
        throw new ConflictException('Email already in use');
      }
      throw e;
    }
  }

  // Used by JwtStrategy.validate() on every protected request
  async findById(id: string) {
    const user = await this.prisma.client.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Used by AuthService.login()
  async findByEmail(email: string) {
    return this.prisma.client.user.findUnique({ where: { email } });
  }

  // PATCH /users/me
  async update(id: string, dto: UpdateUserDto) {
    return this.prisma.client.user.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE /users/me
  async remove(id: string) {
    return this.prisma.client.user.delete({ where: { id } });
  }
}
