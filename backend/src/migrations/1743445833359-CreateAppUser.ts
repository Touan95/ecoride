import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppUser1743445833359 implements MigrationInterface {
  name = 'CreateAppUser1743445833359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "user" ("id", "username", "email", "password", "type", "credits")
            VALUES 
            ('9187705b-075a-4ed1-ac41-f9b29f9d3215', 'APPUSER', 'appuser@ecoride.com', '', 'app', 0);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user" WHERE "id" = '9187705b-075a-4ed1-ac41-f9b29f9d3215';
        `);
  }
}
