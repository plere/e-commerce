import {MigrationInterface, QueryRunner} from "typeorm";

export class relationModify1607584536841 implements MigrationInterface {
    name = 'relationModify1607584536841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_4d1fe2a6880052fe3bf022f29bd"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "itemListItemNumber"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "storeIdStoreName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_6deefb02b495bd79a88b4d90d17" FOREIGN KEY ("storeIdStoreName") REFERENCES "store"("store_name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_6deefb02b495bd79a88b4d90d17"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "storeIdStoreName"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "itemListItemNumber" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_4d1fe2a6880052fe3bf022f29bd" FOREIGN KEY ("itemListItemNumber") REFERENCES "item"("item_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
