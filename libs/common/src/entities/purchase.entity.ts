import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Product } from "./product.entity";
import { Customer } from "./customer.entity";

@Entity("purchases")
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: "customerId" })
  customerId: Customer;

  @Column({ type: "int" })
  quantity: number;
}
