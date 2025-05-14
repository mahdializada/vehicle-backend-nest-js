// src/company/company.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.companies.findMany();
  }

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.companies.create({
      data: createCompanyDto,
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.companies.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    return this.prisma.companies.delete({
      where: { id },
    });
  }
}
