import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class CompanyResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  description!: string;

  @Expose()
  @ApiProperty()
  location!: string;

  @Expose()
  @ApiPropertyOptional()
  website?: string | null;

  @Expose()
  @ApiProperty()
  ownerId!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<CompanyResponseDto>) {
    Object.assign(this, partial);
  }
}
