// src/vehicle/dto/create-vehicle.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vin: string;

  @IsString()
  lot_number: string;

  @IsString()
  year: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  title_number: string;
}
