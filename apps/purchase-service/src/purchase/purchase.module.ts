import { Module } from "@nestjs/common";
import { PurchaseController } from "./purchase.controller";
import { PurchaseService } from "./purchase.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer, Product, Purchase } from "@app/common";

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
