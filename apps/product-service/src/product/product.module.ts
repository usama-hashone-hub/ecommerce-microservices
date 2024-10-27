import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer, Product, Purchase } from "@app/common";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Purchase]),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
