import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1607084992679 implements MigrationInterface {
    name = 'createTables1607084992679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("order_number" SERIAL NOT NULL, "shipping_status" text NOT NULL DEFAULT 'ORDER_OK', CONSTRAINT "PK_f9180f384353c621e8d0c414c14" PRIMARY KEY ("order_number"))`);
        await queryRunner.query(`CREATE TABLE "store" ("store_id" character varying NOT NULL, "password" character varying NOT NULL, "store_description" character varying NOT NULL, "itemListItemNumber" integer, CONSTRAINT "PK_94d7b0f600366ceb5c960069687" PRIMARY KEY ("store_id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("item_number" SERIAL NOT NULL, "item_name" character varying NOT NULL, "stock_count" integer NOT NULL, "item_price" integer NOT NULL, "item_description" character varying NOT NULL, "orderListOrderNumber" integer, CONSTRAINT "PK_d60beeb20de4fa4ac6e5dd763f0" PRIMARY KEY ("item_number"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "orderListOrderNumber" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f466b0175133df511d6a2a0c321" FOREIGN KEY ("orderListOrderNumber") REFERENCES "order"("order_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_4d1fe2a6880052fe3bf022f29bd" FOREIGN KEY ("itemListItemNumber") REFERENCES "item"("item_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_ba846241a8a0856fd9a6280b7c8" FOREIGN KEY ("orderListOrderNumber") REFERENCES "order"("order_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_ba846241a8a0856fd9a6280b7c8"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_4d1fe2a6880052fe3bf022f29bd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f466b0175133df511d6a2a0c321"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "orderListOrderNumber"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
