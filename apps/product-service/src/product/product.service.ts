// product-service/src/product/product.service.ts
import { Product, Purchase } from "@app/common";
import { CreateProductDto } from "@app/common/dto/create-product.dto";
import { UpdateProductDto } from "@app/common/dto/update-product.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new RpcException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!updatedProduct) {
      throw new RpcException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.productRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new RpcException(`Product with ID ${id} not found`);
    }
  }

  async getMostBoughtProducts(): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder("product")
      .select([
        "product.id",
        "product.name",
        "product.price",
        "product.stock",
        "product.isActive",
        "product.category",
        "SUM(purchase.quantity) AS totalPurchased",
      ])
      .leftJoin("purchases", "purchase", "purchase.product_id = product.id")
      .groupBy("product.id")
      .orderBy("totalPurchased", "DESC")
      .getRawMany();

    return products;
  }

  async getCategoryPercentageByCustomer(customerId: number): Promise<any> {
    try {
      const purchases = await this.purchaseRepository.find({
        where: { customerId: { id: customerId } },
        relations: ["product", "customerId"],
      });

      const totalPurchases = purchases.reduce(
        (acc, purchase) => acc + purchase.quantity,
        0
      );
      const categoryCounts = purchases.reduce((acc, purchase) => {
        acc[purchase.product.category] =
          (acc[purchase.product.category] || 0) + purchase.quantity;
        return acc;
      }, {});

      return Object.keys(categoryCounts).map((category) => ({
        category,
        percentage: (categoryCounts[category] / totalPurchases) * 100,
      }));
    } catch (err) {
      throw new RpcException(err["message"]);
    }
  }

  async getCustomerPreferredProducts(customerId: number): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder("product")
      .select("product.*, SUM(purchase.quantity) as totalPurchased")
      .leftJoin(
        "purchases",
        "purchase",
        "purchase.product_id = product.id AND purchase.customerId = :customerId",
        { customerId }
      )
      .groupBy("product.id")
      .orderBy("totalPurchased", "DESC")
      .getRawMany();
    return products;
  }
}
