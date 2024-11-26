// purchase-service/src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: "customer_service_queue",
        queueOptions: {
          durable: true,
        },
      },
    }
  );

  await app.listen();
  console.log(
    `Customer microservice is running on RabbitMQ queue: ${"customer_service_queue"}`
  );
}
bootstrap();
