import {MigrationInterface, QueryRunner} from "typeorm";

export class userCreate1606906505670 implements MigrationInterface {
    name = 'userCreate1606906505670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "phoneNumber" integer NOT NULL, CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
