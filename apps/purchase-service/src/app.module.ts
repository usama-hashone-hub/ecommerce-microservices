import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseModule } from "./purchase/purchase.module";
import { Customer, Product, Purchase } from "@app/common";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql",
      port: 3306,
      username: "user",
      password: "userpassword",
      database: "mydatabase",
      entities: [Purchase, Product, Customer],
      synchronize: true,
    }),
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
