import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PurchaseController } from "./ecommerce-gateway/purchase/purchase.controller";
import { ProductController } from "./ecommerce-gateway/product/product.controller";
import { CustomerController } from "./ecommerce-gateway/customer/customer.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "CUSTOMER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "customer_service_queue",
          queueOptions: { durable: false },
        },
      },
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "product_service_queue",
          queueOptions: { durable: false },
        },
      },
      {
        name: "PURCHASE_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "purchase_service_queue",
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    CustomerController,
    ProductController,
    PurchaseController,
  ],
  providers: [AppService],
})
export class AppModule {}
