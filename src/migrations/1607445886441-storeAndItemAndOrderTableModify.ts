import {MigrationInterface, QueryRunner} from "typeorm";

export class storeAndItemAndOrderTableModify1607445886441 implements MigrationInterface {
    name = 'storeAndItemAndOrderTableModify1607445886441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "PK_94d7b0f600366ceb5c960069687"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "PK_70b7d340b9a5de76490930929de" PRIMARY KEY ("store_name")`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "store_description" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "store"."store_description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "item_description" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "item"."item_description" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "item"."item_description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "item_description" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "store"."store_description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "store_description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "PK_70b7d340b9a5de76490930929de"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "store_name"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_date"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "store_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "PK_94d7b0f600366ceb5c960069687" PRIMARY KEY ("store_id")`);
    }

}
