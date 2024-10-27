// api-gateway/src/product.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable } from "rxjs";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { UpdateProductDto } from "@app/common/dto/update-product.dto";
import { CreateProductDto } from "@app/common/dto/create-product.dto";

@ApiTags("Products") // Group all product-related endpoints under "Products" in Swagger
@Controller("products")
export class ProductController {
  constructor(
    @Inject("PRODUCT_SERVICE")
    private readonly productServiceClient: ClientProxy
  ) {}

  @ApiOperation({ summary: "Retrieve most bought products" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved most bought products.",
  })
  @ApiResponse({ status: 500, description: "Internal server error." })
  @Get("most-bought")
  getMostBoughtProducts(): Observable<any> {
    return this.productServiceClient
      .send({ cmd: "getMostBoughtProducts" }, {})
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Something went wrong",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      );
  }

  @ApiOperation({ summary: "Create a new product" })
  @ApiBody({ type: CreateProductDto, description: "Product data" })
  @ApiResponse({ status: 201, description: "Product created successfully." })
  @ApiResponse({ status: 400, description: "Failed to create product." })
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Observable<any> {
    return this.productServiceClient
      .send({ cmd: "createProduct" }, createProductDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Failed to create product",
            HttpStatus.BAD_REQUEST
          );
        })
      );
  }

  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({ status: 200, description: "Products retrieved successfully." })
  @ApiResponse({ status: 500, description: "Failed to fetch products." })
  @Get()
  getAllProducts(): Observable<any> {
    return this.productServiceClient.send({ cmd: "getAllProducts" }, {}).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || "Failed to fetch products",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }

  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({ name: "id", type: Number, description: "Product ID" })
  @ApiResponse({ status: 200, description: "Product retrieved successfully." })
  @ApiResponse({ status: 404, description: "Product not found." })
  @Get(":id")
  getProductById(@Param("id", ParseIntPipe) id: number): Observable<any> {
    return this.productServiceClient.send({ cmd: "getProductById" }, id).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || "Product not found",
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  @ApiOperation({ summary: "Update a product" })
  @ApiParam({ name: "id", type: Number, description: "Product ID" })
  @ApiBody({ type: UpdateProductDto, description: "Updated product data" })
  @ApiResponse({ status: 200, description: "Product updated successfully." })
  @ApiResponse({ status: 400, description: "Failed to update product." })
  @Put(":id")
  updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Observable<any> {
    return this.productServiceClient
      .send({ cmd: "updateProduct" }, { id, updateProductDto })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Failed to update product",
            HttpStatus.BAD_REQUEST
          );
        })
      );
  }

  @ApiOperation({ summary: "Delete a product" })
  @ApiParam({ name: "id", type: Number, description: "Product ID" })
  @ApiResponse({ status: 200, description: "Product deleted successfully." })
  @ApiResponse({ status: 404, description: "Product not found." })
  @Delete(":id")
  deleteProduct(@Param("id", ParseIntPipe) id: number): Observable<any> {
    return this.productServiceClient.send({ cmd: "deleteProduct" }, id).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || "Failed to delete product",
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  @ApiOperation({
    summary: "Retrieve percentage of each category bought by a customer",
  })
  @ApiParam({
    name: "customerId",
    description: "The ID of the customer",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description:
      "Successfully retrieved category purchase percentage by customer.",
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  @Get("category-percentage/:customerId")
  getCategoryPercentageByCustomer(
    @Param("customerId", ParseIntPipe) customerId: number
  ): Observable<any> {
    return this.productServiceClient
      .send({ cmd: "getCategoryPercentageByCustomer" }, { customerId })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Something went wrong",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }

  @ApiOperation({
    summary:
      "Retrieve products based on customer preference, sorted from most to least favorite",
  })
  @ApiParam({
    name: "customerId",
    description: "The ID of the customer",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved preferred products by customer.",
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  @Get("preference/:customerId")
  getCustomerPreferredProducts(
    @Param("customerId", ParseIntPipe) customerId: number
  ): Observable<any> {
    return this.productServiceClient
      .send({ cmd: "getCustomerPreferredProducts" }, { customerId })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Something went wrong",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }
}
