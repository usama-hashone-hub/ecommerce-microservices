import { Customer, Product, Purchase } from "@app/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Purchase>,

    @InjectRepository(Product)
    private productRepository: Repository<Purchase>
  ) {}

  async createPurchase(
    customerId: number,
    productId: number,
    quantity: number
  ): Promise<Purchase> {
    console.log({ customerId, productId, quantity });

    // Check if the customer exists
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new RpcException("Customer not found");
    }

    // Check if the product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new RpcException("Product not found");
    }

    // Create purchase instance with correct relationships
    const purchase = this.purchaseRepository.create({
      customerId: customer, // Assign the Customer object
      product: product, // Assign the Product object
      quantity,
    });

    return await this.purchaseRepository.save(purchase);
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      relations: ["product", "customerId"],
    });
  }

  async getPurchasesByCustomer(customerId: number): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      where: { customerId: { id: customerId } },
      relations: ["product", "customerId"],
    });
  }

  async getPurchaseById(purchaseId: number): Promise<Purchase> {
    return await this.purchaseRepository.findOne({
      where: { id: purchaseId },
      relations: ["product", "customerId"],
    });
  }
}
