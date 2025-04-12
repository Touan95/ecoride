import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTestData1743874900009 implements MigrationInterface {
  name = 'InsertTestData1743874900009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Création d'une voiture pour l'utilisateur APP
    await queryRunner.query(`
      INSERT INTO "car" (
        "id", "plate_number", "registration_date", "color", 
        "brand", "model", "seats", "energy", "owner_id"
      ) VALUES (
        '9187705b-075a-4ed1-ac41-f9b29f9d3215',
        'APP-001',
        '2024-01-01',
        'Blanc',
        'Tesla',
        'Model 3',
        5,
        'electric',
        '9187705b-075a-4ed1-ac41-f9b29f9d3215'
      )
    `);

    // Insertion de 30 jours de données de test
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);

      // Génération d'un nombre aléatoire de trajets pour ce jour (entre 5 et 20)
      const rideCount = Math.floor(Math.random() * 15) + 5;

      for (let j = 0; j < rideCount; j++) {
        // Insertion du trajet avec UUID généré par PostgreSQL
        await queryRunner.query(`
          WITH inserted_ride AS (
            INSERT INTO "ride" (
              "id", "reserved_seats", "price", "balance", 
              "departure_date", "arrival_date", "start_date", "end_date", 
              "status", "service_paid", "driver_id", "car_id",
              "arrival_point", "departure_point", "arrival_location", "departure_location"
            ) VALUES (
              uuid_generate_v4(),
              ${Math.floor(Math.random() * 3) + 1},
              ${Math.floor(Math.random() * 20) + 5},
              ${Math.floor(Math.random() * 20) + 5},
              '${currentDate.toISOString()}',
              '${new Date(currentDate.getTime() + 2 * 60 * 60 * 1000).toISOString()}',
              '${currentDate.toISOString()}',
              '${new Date(currentDate.getTime() + 2 * 60 * 60 * 1000).toISOString()}',
              'completed',
              true,
              '9187705b-075a-4ed1-ac41-f9b29f9d3215',
              '9187705b-075a-4ed1-ac41-f9b29f9d3215',
              ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326),
              ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326),
              '{"address": "Test", "postalCode": "75000", "city": "Paris", "coordinate": {"latitude": 48.8566, "longitude": 2.3522}}',
              '{"address": "Test", "postalCode": "75000", "city": "Paris", "coordinate": {"latitude": 48.8566, "longitude": 2.3522}}'
            )
            RETURNING id
          )
          INSERT INTO "platform_credit" (
            "id", "credit", "created_at", "ride_id"
          ) VALUES (
            uuid_generate_v4(),
            ${Math.floor(Math.random() * 9) + 1},
            '${currentDate.toISOString()}',
            (SELECT id FROM inserted_ride)
          )
        `);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Suppression des données de test
    await queryRunner.query(`
      DELETE FROM "platform_credit" WHERE "created_at" >= CURRENT_DATE - INTERVAL '30 days';
    `);
    await queryRunner.query(`
      DELETE FROM "ride" WHERE "end_date" >= CURRENT_DATE - INTERVAL '30 days';
    `);
    await queryRunner.query(`
      DELETE FROM "car" WHERE "id" = '9187705b-075a-4ed1-ac41-f9b29f9d3215';
    `);
  }
}
