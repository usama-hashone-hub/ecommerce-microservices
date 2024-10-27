import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "int" })
  stock: number;

  @Column({ type: "boolean" })
  isActive: boolean;

  @Column({ type: "varchar", length: 255 })
  category: string;
}
