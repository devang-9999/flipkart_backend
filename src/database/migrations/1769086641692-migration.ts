import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1769086641692 implements MigrationInterface {
    name = 'Migration1769086641692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" character varying NOT NULL, "category" character varying NOT NULL, "brand" character varying NOT NULL, "stock" character varying NOT NULL, "images" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
