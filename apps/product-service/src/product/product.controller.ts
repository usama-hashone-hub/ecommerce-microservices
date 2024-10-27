import { Controller, Get } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductService } from "./product.service";
import { UpdateProductDto } from "@app/common/dto/update-product.dto";
import { CreateProductDto } from "@app/common/dto/create-product.dto";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: "createProduct" })
  async createProduct(@Payload() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @MessagePattern({ cmd: "getAllProducts" })
  async getAllProducts() {
    return await this.productService.findAll();
  }

  @MessagePattern({ cmd: "getProductById" })
  async getProductById(@Payload() id: number) {
    return await this.productService.findOne(id);
  }

  @MessagePattern({ cmd: "updateProduct" })
  async updateProduct(
    @Payload() data: { id: number; updateProductDto: UpdateProductDto }
  ) {
    const { id, updateProductDto } = data;
    return await this.productService.update(id, updateProductDto);
  }

  @MessagePattern({ cmd: "deleteProduct" })
  async deleteProduct(@Payload() id: number) {
    await this.productService.remove(id);
    return { message: `Product with ID ${id} deleted successfully` };
  }

  @MessagePattern({ cmd: "getMostBoughtProducts" })
  async getMostBoughtProducts() {
    return await this.productService.getMostBoughtProducts();
  }

  @MessagePattern({ cmd: "getCategoryPercentageByCustomer" })
  async getCategoryPercentageByCustomer(
    @Payload() data: { customerId: number }
  ) {
    return await this.productService.getCategoryPercentageByCustomer(
      data.customerId
    );
  }

  @MessagePattern({ cmd: "getCustomerPreferredProducts" })
  async getCustomerPreferredProducts(@Payload() data: { customerId: number }) {
    return await this.productService.getCustomerPreferredProducts(
      data.customerId
    );
  }
}
