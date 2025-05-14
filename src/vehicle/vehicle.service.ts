import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vehicles.findMany({
      include: {
        companies: true,
        customers: true,
      },
    });
  }

  async create(data: any) {
    try {
      console.log('Received data:', data);

      // Extract IDs from connect objects if present, otherwise use direct IDs
      const company_id = data.companies?.connect?.id || data.company_id || null;
      const customer_id = data.customers?.connect?.id || data.customer_id || null;

      const result = await this.prisma.vehicles.create({
        data: {
          vin: data.vin,
          lot_number: data.lot_number,
          year: data.year,
          make: data.make,
          model: data.model,
          price: Number(data.price) || 0,
          color: data.color,
          tax_status: 'No',
          isPendingTrash: false,
          is_scrap: false,
          last_title_follow_up_date: new Date(),
          title_receive_date: new Date(),
          company_id: company_id ? Number(company_id) : null,
          customer_id: customer_id ? Number(customer_id) : null
        },
        include: {
          companies: true,
          customers: true,
        },
      });

      return result;
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  }

  async update(id: number, data: any) {
    try {
      // Ensure IDs are numbers
      const company_id = data.companies?.connect?.id || data.company_id || null;
      const customer_id = data.customers?.connect?.id || data.customer_id || null;

      return await this.prisma.vehicles.update({
        where: { id },
        data: {
          ...data,
          company_id,
          customer_id,
          price: Number(data.price) || 0,
          // Remove relationship objects
          companies: undefined,
          customers: undefined,
        },
        include: {
          companies: true,
          customers: true,
        },
      });
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  async remove(id: number) {
    return this.prisma.vehicles.delete({
      where: { id },
    });
  }
}
