import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../../../../libs/common/src/entities/customer.entity";
import { CustomerController } from "./customer.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
