import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CompanyModule, CustomerModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
