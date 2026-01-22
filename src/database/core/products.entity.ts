/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    category: string;

    @Column()
    brand: string;

    @Column()
    stock: string;

    @Column()
    images: string;
}