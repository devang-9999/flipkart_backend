/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";
import { OneToMany } from 'typeorm';
import { Orders } from './order.entity';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column()
    username: string;

    @Column()
    useremail: string;

    @Column()
    userPassword: string;

    @Column()
    role: string;

    @OneToMany(() => Orders, (order) => order.user)
    orders: Orders[];
}