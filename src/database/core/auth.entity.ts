/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

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
}