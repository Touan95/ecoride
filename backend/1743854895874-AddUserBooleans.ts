import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserBooleans1743854895874 implements MigrationInterface {
    name = 'AddUserBooleans1743854895874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_staff" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_blocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_blocked"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_staff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_admin"`);
    }
}
