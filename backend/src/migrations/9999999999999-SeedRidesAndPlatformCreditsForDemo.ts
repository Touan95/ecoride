import { MigrationInterface, QueryRunner } from 'typeorm';

// Liste statique de 20 UUID v4 générés pour les rides
const rideUUIDs = [
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a01',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a02',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a03',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a04',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a05',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a06',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a07',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a08',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a09',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a10',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a11',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a12',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a13',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a14',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a15',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a16',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a17',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a18',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a19',
  'b1a1e1a0-1a1a-4a1a-8a1a-1a1a1a1a1a20',
];

export class SeedRidesAndPlatformCreditsForDemo9999999999999 implements MigrationInterface {
  name = 'SeedRidesAndPlatformCreditsForDemo9999999999999';
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Utilisateurs (3 conducteurs, 4 passagers)
    await queryRunner.query(`
      INSERT INTO "user" (id, username, email, password, type, credits, terms_accepted, terms_accepted_at, rate)
      VALUES
        ('11111111-1111-1111-1111-111111111111', 'driver1', 'driver1@example.com', 'hashed_password', 'driver', 1000, true, '2023-01-01 00:00:00', 4.5),
        ('22222222-2222-2222-2222-222222222222', 'driver2', 'driver2@example.com', 'hashed_password', 'driver', 800, true, '2023-01-01 00:00:00', 4.2),
        ('33333333-3333-3333-3333-333333333333', 'driver3', 'driver3@example.com', 'hashed_password', 'driver', 900, true, '2023-01-01 00:00:00', 4.7),
        ('44444444-4444-4444-4444-444444444444', 'passenger1', 'passenger1@example.com', 'hashed_password', 'passenger', 50, true, '2023-01-01 00:00:00', 4.8),
        ('55555555-5555-5555-5555-555555555555', 'passenger2', 'passenger2@example.com', 'hashed_password', 'passenger', 30, true, '2023-01-01 00:00:00', 4.0),
        ('66666666-6666-6666-6666-666666666666', 'passenger3', 'passenger3@example.com', 'hashed_password', 'passenger', 20, true, '2023-01-01 00:00:00', 4.3),
        ('77777777-7777-7777-7777-777777777777', 'passenger4', 'passenger4@example.com', 'hashed_password', 'passenger', 40, true, '2023-01-01 00:00:00', 4.6)
      ON CONFLICT (id) DO NOTHING;
    `);

    // Voitures (3 voitures)
    await queryRunner.query(`
      INSERT INTO "car" (id, plate_number, registration_date, color, brand, model, seats, energy, owner_id)
      VALUES
        ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'AB-123-CD', '2022-01-01', 'blue', 'Renault', 'Clio', 4, 'hybrid', '11111111-1111-1111-1111-111111111111'),
        ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'EF-456-GH', '2022-01-01', 'red', 'Peugeot', '208', 4, 'electric', '22222222-2222-2222-2222-222222222222'),
        ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'IJ-789-KL', '2022-01-01', 'white', 'Citroen', 'C3', 4, 'gasoline', '33333333-3333-3333-3333-333333333333')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Répartition non linéaire des trajets sur 4 mois
    // Exemple :
    // - 2024-02-01 : 0 trajet
    // - 2024-02-02 : 3 trajets
    // - 2024-02-03 : 1 trajet
    // - 2024-02-04 : 0 trajet
    // - 2024-02-05 : 4 trajets
    // - 2024-02-06 : 0 trajet
    // - 2024-02-07 : 2 trajets
    // - 2024-02-08 : 0 trajet
    // - 2024-02-09 : 1 trajet
    // - 2024-02-10 : 3 trajets
    // - 2024-02-11 : 0 trajet
    // - 2024-02-12 : 2 trajets
    // - 2024-02-13 : 0 trajet
    // - 2024-02-14 : 1 trajet
    // - 2024-02-15 : 2 trajets
    // (total 20 trajets)
    const ridesPerDay = [0, 3, 1, 0, 4, 0, 2, 0, 1, 3, 0, 2, 0, 1, 2];
    const cityPairs = [
      ['Paris', 'Lyon', 2.3522, 48.8566, 4.8357, 45.764],
      ['Marseille', 'Nice', 5.3698, 43.2965, 7.2619, 43.7102],
      ['Bordeaux', 'Toulouse', -0.5792, 44.8378, 1.4442, 43.6047],
      ['Lille', 'Paris', 3.0586, 50.6292, 2.3522, 48.8566],
      ['Nantes', 'Paris', -1.5536, 47.2184, 2.3522, 48.8566],
      ['Lyon', 'Marseille', 4.8357, 45.764, 5.3698, 43.2965],
      ['Toulouse', 'Bordeaux', 1.4442, 43.6047, -0.5792, 44.8378],
      ['Nice', 'Lyon', 7.2619, 43.7102, 4.8357, 45.764],
      ['Paris', 'Lille', 2.3522, 48.8566, 3.0586, 50.6292],
      ['Marseille', 'Nantes', 5.3698, 43.2965, -1.5536, 47.2184],
    ];
    let rideIdx = 0;
    let cityIdx = 0;
    let day = 20; // Commence au 20 mai
    for (let d = 0; d < ridesPerDay.length; d++) {
      for (let n = 0; n < ridesPerDay[d]; n++) {
        if (rideIdx >= rideUUIDs.length) break;
        const [depCity, arrCity, depLon, depLat, arrLon, arrLat] =
          cityPairs[cityIdx % cityPairs.length];
        const rideId = rideUUIDs[rideIdx];
        const reservedSeats = (rideIdx % 3) + 1;
        const price = 20 + (rideIdx % 5) * 5;
        const balance = 0;
        // DATES DU 20 MAI AU 8 JUIN 2025
        let baseDate;
        if (day <= 31) {
          baseDate = new Date(2025, 4, day, 8 + n * 2, 0, 0); // Mai 2025
        } else {
          baseDate = new Date(2025, 5, day - 31, 8 + n * 2, 0, 0); // Juin 2025
        }
        const departureDate = baseDate.toISOString().slice(0, 19).replace('T', ' ');
        const durationHours = 2 + (rideIdx % 3);
        const durationMinutes = (rideIdx % 2) * 30;
        const arrivalDateObj = new Date(
          baseDate.getTime() + durationHours * 3600000 + durationMinutes * 60000,
        );
        const arrivalDate = arrivalDateObj.toISOString().slice(0, 19).replace('T', ' ');
        const startDate = departureDate;
        const endDate = arrivalDate;
        const arrivalPoint = `ST_SetSRID(ST_MakePoint(${arrLon}, ${arrLat}), 4326)`;
        const departurePoint = `ST_SetSRID(ST_MakePoint(${depLon}, ${depLat}), 4326)`;
        const arrivalLocation = `'{"city": "${arrCity}", "address": "Gare principale"}'`;
        const departureLocation = `'{"city": "${depCity}", "address": "Gare principale"}'`;
        const status = 'completed';
        const servicePaid = true;
        const driverIds = [
          '11111111-1111-1111-1111-111111111111',
          '22222222-2222-2222-2222-222222222222',
          '33333333-3333-3333-3333-333333333333',
        ];
        const carIds = [
          'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
          'cccccccc-cccc-cccc-cccc-cccccccccccc',
        ];
        const driverId = driverIds[rideIdx % driverIds.length];
        const carId = carIds[rideIdx % carIds.length];
        // Insertion du trajet
        await queryRunner.query(`
          INSERT INTO "ride" (
            id, reserved_seats, price, balance, departure_date, arrival_date, start_date, end_date,
            arrival_point, departure_point, arrival_location, departure_location, status, service_paid, driver_id, car_id
          ) VALUES (
            '${rideId}', ${reservedSeats}, ${price}, ${balance}, '${departureDate}', '${arrivalDate}', '${startDate}', '${endDate}',
            ${arrivalPoint}, ${departurePoint}, ${arrivalLocation}, ${departureLocation}, '${status}', ${servicePaid}, '${driverId}', '${carId}'
          )
          ON CONFLICT (id) DO NOTHING;
        `);
        // Insertion du crédit plateforme
        await queryRunner.query(`
          INSERT INTO "platform_credit" (credit, created_at, ride_id)
          VALUES (2, '${endDate}', '${rideId}')
          ON CONFLICT (ride_id) DO NOTHING;
        `);
        rideIdx++;
        cityIdx++;
      }
      day++;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < rideUUIDs.length; i++) {
      const rideId = rideUUIDs[i];
      await queryRunner.query(`DELETE FROM "platform_credit" WHERE ride_id = '${rideId}';`);
      await queryRunner.query(`DELETE FROM "ride" WHERE id = '${rideId}';`);
    }
  }
}
