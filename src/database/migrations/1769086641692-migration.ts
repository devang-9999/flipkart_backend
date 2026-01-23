/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1769086641692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "price",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "category",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "brand",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "stock",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "images",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
