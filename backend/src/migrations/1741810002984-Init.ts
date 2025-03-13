import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1741810002984 implements MigrationInterface {
    name = 'Init1741810002984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technology" ("id" SERIAL NOT NULL, "display_name" character varying(256) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ride_status_enum" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" uuid NOT NULL, "reserved_seats" integer, "price" integer NOT NULL, "departure_date" TIMESTAMP NOT NULL, "arrival_date" TIMESTAMP NOT NULL, "arrival_location" jsonb NOT NULL, "departure_location" jsonb NOT NULL, "status" "public"."ride_status_enum" NOT NULL DEFAULT 'upcoming', "driver_id" uuid, "car_id" uuid, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "ride_departure_date_index" ON "ride" ("departure_date") `);
        await queryRunner.query(`CREATE INDEX "ride_arrival_location_index" ON "ride" ("arrival_location") `);
        await queryRunner.query(`CREATE INDEX "ride_departure_location_index" ON "ride" ("departure_location") `);
        await queryRunner.query(`CREATE INDEX "ride_status_index" ON "ride" ("status") `);
        await queryRunner.query(`CREATE INDEX "ride_driver_index" ON "ride" ("driver_id") `);
        await queryRunner.query(`CREATE TYPE "public"."ride_history_role_enum" AS ENUM('driver', 'passenger')`);
        await queryRunner.query(`CREATE TABLE "ride_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."ride_history_role_enum" NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "comment" text, "rating" numeric(5,2), "user_id" uuid, "ride_id" uuid, CONSTRAINT "PK_dcc1ed7edba68bc77909a77b7e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a6753c923a062713bfeb1e89d5" ON "ride_history" ("date") `);
        await queryRunner.query(`CREATE INDEX "ride_history_user_index" ON "ride_history" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."transaction_transaction_type_enum" AS ENUM('earned', 'spent')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "transaction_type" "public"."transaction_transaction_type_enum" NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL, "payer_id" uuid, "receiver_id" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('driver', 'passenger', 'both', 'app')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar_url" text, "type" "public"."user_type_enum" NOT NULL DEFAULT 'passenger', "accepts_smoking" boolean NOT NULL DEFAULT false, "accepts_pets" boolean NOT NULL DEFAULT false, "custom_rules" jsonb NOT NULL DEFAULT '[]', "credits" numeric(10,2) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."car_energy_enum" AS ENUM('gasoline', 'diesel', 'hybrid', 'electric', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL, "plate_number" character varying NOT NULL, "registration_date" date NOT NULL, "color" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "seats" integer NOT NULL, "energy" "public"."car_energy_enum" NOT NULL DEFAULT 'unknown', "owner_id" uuid, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_375efe42143ba0b8df13f7868b" ON "car" ("plate_number") `);
        await queryRunner.query(`CREATE TABLE "ride_passenger" ("ride_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_20dc1d6fb272eea17e4fed0b3d7" PRIMARY KEY ("ride_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1260fb2aa90e44aa11426e5fb2" ON "ride_passenger" ("ride_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d9bccd61cec12b7e0161853132" ON "ride_passenger" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_114f0ac09128843a3221fda182a" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_history" ADD CONSTRAINT "FK_5e71009cc5fcd103621379dcf5e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_history" ADD CONSTRAINT "FK_636e7ee0e8a9fb4216c49384a83" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_df0ef3a4f4ca16431aa5d343c38" FOREIGN KEY ("payer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7f8c694d3eb02b8fc73d85b0330" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ride_passenger" ADD CONSTRAINT "FK_d9bccd61cec12b7e01618531321" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_d9bccd61cec12b7e01618531321"`);
        await queryRunner.query(`ALTER TABLE "ride_passenger" DROP CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7f8c694d3eb02b8fc73d85b0330"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_df0ef3a4f4ca16431aa5d343c38"`);
        await queryRunner.query(`ALTER TABLE "ride_history" DROP CONSTRAINT "FK_636e7ee0e8a9fb4216c49384a83"`);
        await queryRunner.query(`ALTER TABLE "ride_history" DROP CONSTRAINT "FK_5e71009cc5fcd103621379dcf5e"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_114f0ac09128843a3221fda182a"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9bccd61cec12b7e0161853132"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1260fb2aa90e44aa11426e5fb2"`);
        await queryRunner.query(`DROP TABLE "ride_passenger"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_375efe42143ba0b8df13f7868b"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TYPE "public"."car_energy_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_transaction_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."ride_history_user_index"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6753c923a062713bfeb1e89d5"`);
        await queryRunner.query(`DROP TABLE "ride_history"`);
        await queryRunner.query(`DROP TYPE "public"."ride_history_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."ride_driver_index"`);
        await queryRunner.query(`DROP INDEX "public"."ride_status_index"`);
        await queryRunner.query(`DROP INDEX "public"."ride_departure_location_index"`);
        await queryRunner.query(`DROP INDEX "public"."ride_arrival_location_index"`);
        await queryRunner.query(`DROP INDEX "public"."ride_departure_date_index"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TYPE "public"."ride_status_enum"`);
        await queryRunner.query(`DROP TABLE "technology"`);
    }

}
