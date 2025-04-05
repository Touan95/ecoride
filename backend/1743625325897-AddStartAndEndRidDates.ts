import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStartAndEndRidDates1743625325897 implements MigrationInterface {
    name = 'AddStartAndEndRidDates1743625325897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ADD "start_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "end_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "start_date"`);
    }

}
