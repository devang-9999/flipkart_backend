/* eslint-disable prettier/prettier */

import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    brand: string;

    @Column()
    stock: number;

    @Column()
    images: string[];
}
