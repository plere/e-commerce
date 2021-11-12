import {MigrationInterface, QueryRunner} from "typeorm";

export class storeEntityChange1636734162278 implements MigrationInterface {
    name = 'storeEntityChange1636734162278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ADD "store_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_tel" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_03c9838e36510ea6eafbf04ed29" UNIQUE ("store_tel")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_03c9838e36510ea6eafbf04ed29"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_tel"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_email"`);
    }

}
