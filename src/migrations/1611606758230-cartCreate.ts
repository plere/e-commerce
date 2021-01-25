import {MigrationInterface, QueryRunner} from "typeorm";

export class cartCreate1611606758230 implements MigrationInterface {
    name = 'cartCreate1611606758230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("cart_number" SERIAL NOT NULL, "cart_count" integer NOT NULL, "userIdId" character varying NOT NULL, "itemNumberItemNumber" integer NOT NULL, CONSTRAINT "PK_a0584996504a087338ae8ae16b1" PRIMARY KEY ("cart_number"))`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_2ea6a897ae31205dd30b4008943" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_3f674c572001c1e40b619b36c16" FOREIGN KEY ("itemNumberItemNumber") REFERENCES "item"("item_number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_3f674c572001c1e40b619b36c16"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_2ea6a897ae31205dd30b4008943"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
