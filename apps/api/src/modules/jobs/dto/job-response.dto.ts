import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class JobResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  description!: string;

  @Expose()
  @ApiProperty()
  location!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

//   @Expose()
//   @ApiProperty()
//   updatedAt!: Date;

  constructor(partial: Partial<JobResponseDto>) {
    Object.assign(this, partial);
  }
}
