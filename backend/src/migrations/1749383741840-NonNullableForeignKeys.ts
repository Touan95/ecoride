import { MigrationInterface, QueryRunner } from 'typeorm';

export class NonNullableForeignKeys1749383741840 implements MigrationInterface {
  name = 'NonNullableForeignKeys1749383741840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_114f0ac09128843a3221fda182a"`);
    await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
    await queryRunner.query(
      `ALTER TABLE "platform_credit" DROP CONSTRAINT "FK_ca9de458bf77c2fa71cddf94182"`,
    );
    await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74"`);
    await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "owner_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "driver_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "car_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_d9bccd61cec12b7e01618531321"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26"`,
    );
    await queryRunner.query(`DROP INDEX "public"."ride_passenger_user_ride_index"`);
    await queryRunner.query(`ALTER TABLE "ride_passenger" ALTER COLUMN "user_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ride_passenger" ALTER COLUMN "ride_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "platform_credit" ALTER COLUMN "ride_id" SET NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "ride_passenger_user_ride_index" ON "ride_passenger" ("user_id", "ride_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_114f0ac09128843a3221fda182a" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_d9bccd61cec12b7e01618531321" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "platform_credit" ADD CONSTRAINT "FK_ca9de458bf77c2fa71cddf94182" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "platform_credit" DROP CONSTRAINT "FK_ca9de458bf77c2fa71cddf94182"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_d9bccd61cec12b7e01618531321"`,
    );
    await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_114f0ac09128843a3221fda182a"`);
    await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
    await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74"`);
    await queryRunner.query(`DROP INDEX "public"."ride_passenger_user_ride_index"`);
    await queryRunner.query(`ALTER TABLE "platform_credit" ALTER COLUMN "ride_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ride_passenger" ALTER COLUMN "ride_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ride_passenger" ALTER COLUMN "user_id" DROP NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "ride_passenger_user_ride_index" ON "ride_passenger" ("user_id", "ride_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_d9bccd61cec12b7e01618531321" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "car_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "driver_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "owner_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "platform_credit" ADD CONSTRAINT "FK_ca9de458bf77c2fa71cddf94182" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_114f0ac09128843a3221fda182a" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
