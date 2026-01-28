/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,  } from "typeorm";
import { Auth } from "./auth.entity";
@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

@Column({
  type: 'decimal',
  default: 0,
})
price: number;

  @Column()
  category: string;

  @Column()
  stock: number;

@Column('text', {
  array: true,
  default: () => 'ARRAY[]::text[]',
})
images: string[];

  @ManyToOne(() => Auth, (user) => user.products, { eager: false })
  @JoinColumn({ name: 'sellerUserId' }) 
  seller: Auth;
}
