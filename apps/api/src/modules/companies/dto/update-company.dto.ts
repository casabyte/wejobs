import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';

// PartialType makes all fields from CreateCompanyDto optional
// so PATCH only updates the fields that are provided
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
