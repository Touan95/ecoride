import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1743445833358 implements MigrationInterface {
  name = 'Init1743445833358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."ride_status_enum" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ride" ("id" uuid NOT NULL, "reserved_seats" integer, "price" integer NOT NULL, "balance" integer NOT NULL, "departure_date" TIMESTAMP NOT NULL, "arrival_date" TIMESTAMP NOT NULL, "arrival_point" geometry(Point,4326) NOT NULL, "departure_point" geometry(Point,4326) NOT NULL, "arrival_location" jsonb NOT NULL, "departure_location" jsonb NOT NULL, "status" "public"."ride_status_enum" NOT NULL DEFAULT 'upcoming', "driver_id" uuid, "car_id" uuid, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "ride_departure_date_index" ON "ride" ("departure_date") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a9e2b048ebf6301a13ae76727d" ON "ride" USING GiST ("arrival_point") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca9e5465f78af8c51f2da45fa8" ON "ride" USING GiST ("departure_point") `,
    );
    await queryRunner.query(
      `CREATE INDEX "ride_arrival_location_index" ON "ride" ("arrival_location") `,
    );
    await queryRunner.query(
      `CREATE INDEX "ride_departure_location_index" ON "ride" ("departure_location") `,
    );
    await queryRunner.query(`CREATE INDEX "ride_status_index" ON "ride" ("status") `);
    await queryRunner.query(`CREATE INDEX "ride_driver_index" ON "ride" ("driver_id") `);
    await queryRunner.query(
      `CREATE TYPE "public"."ride_history_role_enum" AS ENUM('driver', 'passenger')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ride_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."ride_history_role_enum" NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "comment" text, "rating" numeric(5,2), "user_id" uuid, "ride_id" uuid, CONSTRAINT "PK_dcc1ed7edba68bc77909a77b7e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6753c923a062713bfeb1e89d5" ON "ride_history" ("date") `,
    );
    await queryRunner.query(
      `CREATE INDEX "ride_history_user_index" ON "ride_history" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_type_enum" AS ENUM('driver', 'passenger', 'both', 'app')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar_url" text, "type" "public"."user_type_enum" NOT NULL DEFAULT 'passenger', "accepts_smoking" boolean NOT NULL DEFAULT false, "accepts_pets" boolean NOT NULL DEFAULT false, "custom_rules" jsonb NOT NULL DEFAULT '[]', "credits" integer NOT NULL, "rate" numeric(10,2), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."car_energy_enum" AS ENUM('gasoline', 'diesel', 'hybrid', 'electric', 'unknown')`,
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("id" uuid NOT NULL, "plate_number" character varying NOT NULL, "registration_date" date NOT NULL, "color" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "seats" integer NOT NULL, "energy" "public"."car_energy_enum" NOT NULL DEFAULT 'unknown', "owner_id" uuid, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_375efe42143ba0b8df13f7868b" ON "car" ("plate_number") `,
    );
    await queryRunner.query(
      `CREATE TABLE "ride_passenger" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "canceled" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "ride_id" uuid, CONSTRAINT "PK_24be7bdcedfd682e9aa053329a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "ride_passenger_user_ride_index" ON "ride_passenger" ("user_id", "ride_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "ride_user_passenger" ("ride_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7ad771efd372a82e7321e171b38" PRIMARY KEY ("ride_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4396093bcd7db1665d778f1657" ON "ride_user_passenger" ("ride_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6413e40b2f3434304c034ca77b" ON "ride_user_passenger" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_114f0ac09128843a3221fda182a" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_history" ADD CONSTRAINT "FK_5e71009cc5fcd103621379dcf5e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_history" ADD CONSTRAINT "FK_636e7ee0e8a9fb4216c49384a83" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_d9bccd61cec12b7e01618531321" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_user_passenger" ADD CONSTRAINT "FK_4396093bcd7db1665d778f16571" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_user_passenger" ADD CONSTRAINT "FK_6413e40b2f3434304c034ca77b3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ride_user_passenger" DROP CONSTRAINT "FK_6413e40b2f3434304c034ca77b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_user_passenger" DROP CONSTRAINT "FK_4396093bcd7db1665d778f16571"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_d9bccd61cec12b7e01618531321"`,
    );
    await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74"`);
    await queryRunner.query(
      `ALTER TABLE "ride_history" DROP CONSTRAINT "FK_636e7ee0e8a9fb4216c49384a83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_history" DROP CONSTRAINT "FK_5e71009cc5fcd103621379dcf5e"`,
    );
    await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_114f0ac09128843a3221fda182a"`);
    await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6413e40b2f3434304c034ca77b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4396093bcd7db1665d778f1657"`);
    await queryRunner.query(`DROP TABLE "ride_user_passenger"`);
    await queryRunner.query(`DROP INDEX "public"."ride_passenger_user_ride_index"`);
    await queryRunner.query(`DROP TABLE "ride_passenger"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_375efe42143ba0b8df13f7868b"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TYPE "public"."car_energy_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."ride_history_user_index"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a6753c923a062713bfeb1e89d5"`);
    await queryRunner.query(`DROP TABLE "ride_history"`);
    await queryRunner.query(`DROP TYPE "public"."ride_history_role_enum"`);
    await queryRunner.query(`DROP INDEX "public"."ride_driver_index"`);
    await queryRunner.query(`DROP INDEX "public"."ride_status_index"`);
    await queryRunner.query(`DROP INDEX "public"."ride_departure_location_index"`);
    await queryRunner.query(`DROP INDEX "public"."ride_arrival_location_index"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ca9e5465f78af8c51f2da45fa8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a9e2b048ebf6301a13ae76727d"`);
    await queryRunner.query(`DROP INDEX "public"."ride_departure_date_index"`);
    await queryRunner.query(`DROP TABLE "ride"`);
    await queryRunner.query(`DROP TYPE "public"."ride_status_enum"`);
  }
}
