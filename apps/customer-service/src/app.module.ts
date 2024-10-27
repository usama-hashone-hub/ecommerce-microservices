import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "@app/common/entities/customer.entity";
import { CustomerModule } from "./customer/customer.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql",
      port: 3306,
      username: "user",
      password: "userpassword",
      database: "mydatabase",
      entities: [Customer],
      synchronize: true,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
