import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    description: "Name of the product",
    example: "Wireless Mouse",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Price of the product",
    example: 29.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: "Stock quantity of the product",
    example: 100,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: "Status of the product availability",
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: "Category of the product",
    example: "Electronics",
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
