import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1747581932475 implements MigrationInterface {
  name = 'Test1747581932475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" RENAME COLUMN "email_share_accepted_date" TO "email_share_accepted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_invitation_pending" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "terms_accepted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "terms_accepted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "terms_accepted"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "terms_accepted_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_invitation_pending"`);
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" RENAME COLUMN "email_share_accepted_at" TO "email_share_accepted_date"`,
    );
  }
}
