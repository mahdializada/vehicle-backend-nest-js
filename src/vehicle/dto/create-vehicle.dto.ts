// src/vehicle/dto/create-vehicle.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsOptional()
  vin?: string;

  @IsString()
  @IsOptional()
  lot_number?: string;

  @IsString()
  @IsOptional()
  year?: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  company_id?: number;

  @IsNumber()
  @IsOptional()
  customer_id?: number;
}
