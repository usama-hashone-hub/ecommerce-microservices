// api-gateway/src/customer.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable } from "rxjs";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { CreateCustomerDto } from "@app/common";

@ApiTags("Customers") // Group all customer endpoints under the "Customers" tag in Swagger UI
@Controller("customers")
export class CustomerController {
  constructor(
    @Inject("CUSTOMER_SERVICE")
    private readonly customerServiceClient: ClientProxy
  ) {}

  @ApiOperation({ summary: "Create a new customer" })
  @ApiResponse({ status: 201, description: "Customer created successfully." })
  @ApiResponse({ status: 400, description: "Invalid input." })
  @Post()
  createCustomer(
    @Body()
    createCustomerDto: CreateCustomerDto
  ): Observable<any> {
    return this.customerServiceClient
      .send({ cmd: "createCustomer" }, createCustomerDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Internal Server Error",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }

  @ApiOperation({ summary: "Retrieve customer by ID" })
  @ApiParam({ name: "id", required: true, description: "ID of the customer" })
  @ApiResponse({ status: 200, description: "Customer retrieved successfully." })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @Get(":id")
  getCustomerById(@Param("id", ParseIntPipe) id: number): Observable<any> {
    return this.customerServiceClient.send({ cmd: "getCustomerById" }, id).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || "Internal Server Error",
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  @ApiOperation({ summary: "Retrieve all customers" })
  @ApiResponse({ status: 200, description: "List of all customers." })
  @Get()
  getAllCustomers(): Observable<any> {
    return this.customerServiceClient.send({ cmd: "getAllCustomers" }, {}).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || "Internal Server Error",
          HttpStatus.NOT_FOUND
        );
      })
    );
  }

  @ApiOperation({ summary: "Update customer information" })
  @ApiParam({ name: "id", required: true, description: "ID of the customer" })
  @ApiBody({
    schema: {
      example: {
        name: "Jane Doe",
        email: "janedoe@example.com",
        cardNumber: "8765432187654321",
        phoneNumber: "+10987654321",
      },
    },
  })
  @ApiResponse({ status: 200, description: "Customer updated successfully." })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @Put(":id")
  updateCustomer(
    @Param("id", ParseIntPipe) id: number,
    @Body()
    updateCustomerDto: {
      name?: string;
      email?: string;
      cardNumber?: string;
      phoneNumber?: string;
    }
  ): Observable<any> {
    return this.customerServiceClient
      .send({ cmd: "updateCustomer" }, { id, updateCustomerDto })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.message || "Internal Server Error",
            HttpStatus.NOT_FOUND
          );
        })
      );
  }

  @ApiOperation({ summary: "Delete customer by ID" })
  @ApiParam({ name: "id", required: true, description: "ID of the customer" })
  @ApiResponse({ status: 200, description: "Customer deleted successfully." })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @Delete(":id")
  deleteCustomer(@Param("id", ParseIntPipe) id: number): Observable<any> {
    return this.customerServiceClient.send({ cmd: "deleteCustomer" }, id).pipe(
      catchError((error) => {
        throw new HttpException(
          error.message || "Internal Server Error",
          HttpStatus.NOT_FOUND
        );
      })
    );
  }
}
