import {MigrationInterface, QueryRunner} from "typeorm";

export class relationModify1607696076779 implements MigrationInterface {
    name = 'relationModify1607696076779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f466b0175133df511d6a2a0c321"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_ba846241a8a0856fd9a6280b7c8"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "orderListOrderNumber" TO "item_order_count"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "orderListOrderNumber"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "userIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "itemIdItemNumber" integer`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "item_order_count" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "item"."item_order_count" IS NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "item_order_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_77a3765d815efc0006ede1f2cff" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_3b0d838068caaf28dadb8755feb" FOREIGN KEY ("itemIdItemNumber") REFERENCES "item"("item_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3b0d838068caaf28dadb8755feb"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_77a3765d815efc0006ede1f2cff"`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "item_order_count" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "item"."item_order_count" IS NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "item_order_count" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "itemIdItemNumber"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "orderListOrderNumber" integer`);
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "item_order_count" TO "orderListOrderNumber"`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_ba846241a8a0856fd9a6280b7c8" FOREIGN KEY ("orderListOrderNumber") REFERENCES "order"("order_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f466b0175133df511d6a2a0c321" FOREIGN KEY ("orderListOrderNumber") REFERENCES "order"("order_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
