// dto/user-response.dto.ts
import { Exclude, Expose } from 'class-transformer';
import { Role } from '@prisma/client';

// This DTO ensures `password` is NEVER returned in API responses
@Exclude()
export class UserResponseDto {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() name: string;
  @Expose() role: Role;
  @Expose() avatar: string | null;
  @Expose() createdAt: Date;

  // password is excluded — no @Expose() means it's stripped

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
