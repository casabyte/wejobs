// dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { IRegisterDto } from '@wejobs/types';
export class RegisterDto {
  @ApiProperty({ example: 'Johne' })
  @IsString()
  firstname!: string;

  @ApiProperty({ example: 'Johne' })
  @IsString()
  lastname!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8)
  password!: string;
}
