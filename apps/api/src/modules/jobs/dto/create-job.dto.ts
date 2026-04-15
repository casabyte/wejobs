import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsNumber } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'We are looking for a skilled software engineer...' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Tech Corp' })
  @IsString()
  company!: string;

  @ApiProperty({ example: 'San Francisco, CA' })
  location!: string;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  salary?: number;
}
