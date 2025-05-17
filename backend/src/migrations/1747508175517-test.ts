import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1747508175517 implements MigrationInterface {
  name = 'Test1747508175517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ride_passenger" ADD "email_share_accepted" boolean`);
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD "email_share_accepted_date" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ride_passenger" DROP COLUMN "email_share_accepted_date"`);
    await queryRunner.query(`ALTER TABLE "ride_passenger" DROP COLUMN "email_share_accepted"`);
  }
}
