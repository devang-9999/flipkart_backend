/* eslint-disable prettier/prettier */

import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./auth.entity";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Auth)
  @JoinColumn()
  user: Auth;

@OneToMany(() => CartItem, (item) => item.cart, {
  cascade: true,
  eager: true,
})
items: CartItem[];
}
