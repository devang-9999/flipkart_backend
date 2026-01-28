/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { Orders } from "./order.entity";


@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, (order) => order.items)
  order: Orders;

  @ManyToOne(() => Products)
  product: Products;

  @Column()
  quantity: number;

@Column({
  type: 'decimal',
  default: 0,
})
price: number;
}
