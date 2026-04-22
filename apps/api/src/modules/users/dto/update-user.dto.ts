// dto/update-user.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstname?: string;
  
  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
