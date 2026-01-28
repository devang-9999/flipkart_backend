/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Orders } from "./order.entity";
import { Products } from "./products.entity";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  username: string;

  @Column({ unique: true })
  useremail: string;

  @Column()
  userPassword: string;

  @Column()
  role: string;

  @Column({ default: false })
isBlocked: boolean;


  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @OneToMany(() => Products, (product) => product.seller)
  products: Products[];
}
