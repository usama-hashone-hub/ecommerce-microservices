// api-gateway/src/purchase.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Inject,
  ParseIntPipe,
  HttpException,
  HttpStatus,
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

@ApiTags("Purchases")
@Controller("purchases")
export class PurchaseController {
  constructor(
    @Inject("PURCHASE_SERVICE")
    private readonly purchaseServiceClient: ClientProxy
  ) {}

  @ApiOperation({ summary: "Create a new purchase" })
  @ApiBody({
    schema: { example: { customerId: 1, productId: 101, quantity: 2 } },
  })
  @ApiResponse({ status: 201, description: "Purchase created successfully." })
  @ApiResponse({ status: 400, description: "Invalid input." })
  @Post()
  createPurchase(
    @Body()
    createPurchaseDto: {
      customerId: number;
      productId: number;
      quantity: number;
    }
  ): Observable<any> {
    return this.purchaseServiceClient
      .send({ cmd: "createPurchase" }, createPurchaseDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Internal Server Error",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }

  @ApiOperation({ summary: "Get all purchases" })
  @ApiResponse({ status: 200, description: "Return all purchases." })
  @Get()
  getAllPurchases(): Observable<any> {
    return this.purchaseServiceClient.send({ cmd: "getAllPurchases" }, {});
  }

  @ApiOperation({ summary: "Get all purchases by customer ID" })
  @ApiParam({
    name: "customerId",
    required: true,
    description: "ID of the customer",
  })
  @ApiResponse({
    status: 200,
    description: "Return purchases for the specified customer.",
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @Get("customer/:customerId")
  getPurchasesByCustomer(
    @Param("customerId", ParseIntPipe) customerId: number
  ): Observable<any> {
    return this.purchaseServiceClient
      .send({ cmd: "getPurchasesByCustomer" }, { customerId })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Internal Server Error",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }

  @ApiOperation({ summary: "Get purchase details by purchase ID" })
  @ApiParam({ name: "id", required: true, description: "ID of the purchase" })
  @ApiResponse({
    status: 200,
    description: "Return purchase details for the specified purchase ID.",
  })
  @ApiResponse({ status: 404, description: "Purchase not found." })
  @Get(":id")
  getPurchaseById(@Param("id", ParseIntPipe) id: number): Observable<any> {
    return this.purchaseServiceClient
      .send({ cmd: "getPurchaseById" }, { id })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Internal Server Error",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }
}
