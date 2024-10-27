// customer-service/src/customer/customer.service.ts
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";
import { CreateCustomerDto, Customer, UpdateCustomerDto } from "@app/common";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async getAllCustomers() {
    return await this.customerRepository.find();
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      return await this.customerRepository.save(customer);
    } catch (error) {
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        throw new RpcException("Email or cardNumber already exists");
      }
      throw new RpcException("An unexpected error occurred");
    }
  }

  async updateCustomer(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    const customer = await this.customerRepository.preload({
      id,
      ...updateCustomerDto,
    });
    if (!customer) {
      throw new RpcException("Customer not found");
    }

    if (customer.email == updateCustomerDto.email) {
      throw new RpcException("Email Already exsists.");
    }

    if (customer.cardNumber == updateCustomerDto.cardNumber) {
      throw new RpcException("CardNumber Already exsists.");
    }

    return await this.customerRepository.save(customer);
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new RpcException("Customer not found");
    }
    return customer;
  }

  async deleteCustomer(id: number): Promise<String> {
    console.log(id);
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new RpcException("Customer not found");
    }
    return "Deleted Successfully";
  }
}
