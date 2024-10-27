// purchase-service/src/purchase/purchase.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PurchaseService } from './purchase.service';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @MessagePattern({ cmd: 'createPurchase' })
  async createPurchase(
    @Payload()
    data: {
      customerId: number;
      productId: number;
      quantity: number;
    },
  ) {
    return await this.purchaseService.createPurchase(
      data.customerId,
      data.productId,
      data.quantity,
    );
  }

  @MessagePattern({ cmd: 'getAllPurchases' })
  async getAllPurchases() {
    return await this.purchaseService.getAllPurchases();
  }

  @MessagePattern({ cmd: 'getPurchasesByCustomer' })
  async getPurchasesByCustomer(@Payload() data: { customerId: number }) {
    return await this.purchaseService.getPurchasesByCustomer(data.customerId);
  }

  @MessagePattern({ cmd: 'getPurchaseById' })
  async getPurchaseById(@Payload() data: { id: number }) {
    return await this.purchaseService.getPurchaseById(data.id);
  }
}
