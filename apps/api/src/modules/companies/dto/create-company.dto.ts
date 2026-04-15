import { IsString, IsOptional, IsUrl, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'We build great products.' })
  @IsString()
  @MinLength(10)
  description!: string;

  @ApiProperty({ example: 'Casablanca, Morocco' })
  @IsString()
  location!: string;

  @ApiPropertyOptional({ example: 'https://acme.com' })
  @IsOptional()
  @IsUrl()
  website?: string;
}
