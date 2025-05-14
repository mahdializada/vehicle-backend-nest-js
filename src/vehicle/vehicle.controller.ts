import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async findAll() {
    return this.vehicleService.findAll();
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    const { company_id, customer_id, ...vehicleData } = createVehicleDto;
    return this.vehicleService.create({
      ...vehicleData,
      companies: company_id ? { connect: { id: company_id } } : undefined,
      customers: customer_id ? { connect: { id: customer_id } } : undefined,
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto: CreateVehicleDto) {
    const { company_id, customer_id, ...vehicleData } = updateVehicleDto;
    return this.vehicleService.update(parseInt(id), {
      ...vehicleData,
      companies: company_id ? { connect: { id: company_id } } : undefined,
      customers: customer_id ? { connect: { id: customer_id } } : undefined,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vehicleService.remove(parseInt(id));
  }
}
