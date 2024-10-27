import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto, UpdateCustomerDto } from "@app/common";

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: "createCustomer" })
  async createCustomer(@Payload() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @MessagePattern({ cmd: "getCustomerById" })
  async getCustomerById(@Payload() id: number) {
    return await this.customerService.getCustomerById(id);
  }

  @MessagePattern({ cmd: "getAllCustomers" })
  async getAllCustomers() {
    return await this.customerService.getAllCustomers();
  }

  @MessagePattern({ cmd: "updateCustomer" })
  async updateCustomer(
    @Payload() data: { id: number; updateCustomerDto: UpdateCustomerDto }
  ) {
    return await this.customerService.updateCustomer(
      data.id,
      data.updateCustomerDto
    );
  }

  @MessagePattern({ cmd: "deleteCustomer" })
  async deleteCustomer(@Payload() id: number) {
    return await this.customerService.deleteCustomer(id);
  }
}
