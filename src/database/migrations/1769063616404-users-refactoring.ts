/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersRefactoring1769063616404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "auth",
                columns: [
                    {
                        name: "userid",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "useremail",
                        type: "varchar"
                    },
                    {
                        name: "userPassword",
                        type: "varchar"
                    },
                    {
                        name: "role",
                        type: "varchar"
                    }
                ]
            })  
           
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("auth");
    }

}
