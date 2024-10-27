// shared/dto/create-customer.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, Matches } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    description: "Name of the customer",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Email address of the customer",
    example: "johndoe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Card number must be a 16-digit number",
    example: "1234567812345678",
  })
  @Matches(/^[0-9]{16}$/, { message: "Card number must be a 16-digit number" })
  cardNumber: string;

  @ApiProperty({
    description: "Phone number of the customer",
    example: "+1234567890",
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
