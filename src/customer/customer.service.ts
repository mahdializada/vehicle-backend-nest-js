import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customers.findMany();
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.prisma.customers.create({
        data: createCustomerDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async update(id: number, updateCustomerDto: CreateCustomerDto) {
    try {
      return await this.prisma.customers.update({
        where: { id },
        data: updateCustomerDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: number) {
    return this.prisma.customers.delete({
      where: { id },
    });
  }
}
