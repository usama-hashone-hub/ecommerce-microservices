import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PurchaseController } from "./ecommerce-gateway/purchase/purchase.controller";
import { ProductController } from "./ecommerce-gateway/product/product.controller";
import { CustomerController } from "./ecommerce-gateway/customer/customer.controller";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: "CUSTOMER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
          queue: "customer_service_queue",
          queueOptions: { durable: true },
        },
      },
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
          queue: "product_service_queue",
          queueOptions: { durable: true },
        },
      },
      {
        name: "PURCHASE_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
          queue: "purchase_service_queue",
          queueOptions: { durable: true },
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
