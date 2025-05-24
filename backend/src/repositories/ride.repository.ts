import { EntityManager, Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import {
  DailyStatistics,
  RideEntity,
  RideEntityInterface,
  RideStatus,
  SearchedRide,
} from '../entities/ride.entity';
import { PlatformCreditEntity } from '../entities/plateformCredit.entity';

export type UpdateRide = Partial<Omit<RideEntity, 'id'>>;
export type SavedRide = Partial<RideEntity>;

interface DistanceProps {
  latitude: number;
  longitude: number;
  radiusKm: number;
}

export interface PointDistanceFilter {
  departure?: DistanceProps;
  arrival?: DistanceProps;
}

interface GetAllRidesOptions {
  distanceFilter?: PointDistanceFilter;
  departureDate?: Date;
  statuses?: RideStatus[];
  onlyAvailable?: boolean;
  onlyInTheFuture?: boolean;
}

export type RideRepositoryInterface = Repository<RideEntity> & {
  createOne(ride: RideEntityInterface): Promise<RideEntityInterface>;
  getOneByIdForDetails(id: string): Promise<RideEntityInterface | null>;
  getOneById(id: string): Promise<RideEntityInterface | null>;
  getAllForSearch({
    distanceFilter,
    departureDate,
    statuses,
    onlyAvailable,
    onlyInTheFuture,
  }: GetAllRidesOptions): Promise<SearchedRide[]>;
  updateRide(ride: SavedRide, entityManager?: EntityManager): Promise<void>;
  getAllByDriverId(driverId: string): Promise<RideEntityInterface[]>;
  getAllByCarId(carId: string): Promise<RideEntityInterface[]>;
  getDailyStatistics(): Promise<DailyStatistics[]>;
};

export const RideRepository: RideRepositoryInterface = AppDataSource.getRepository(
  RideEntity,
).extend({
  async createOne(ride: RideEntityInterface): Promise<RideEntityInterface> {
    const newRide = this.create(ride);
    await this.save(newRide);
    return newRide;
  },
  getOneByIdForDetails(id: string): Promise<RideEntityInterface | null> {
    const query = this.createQueryBuilder('ride')
      .where('ride.id = :id', { id })
      .leftJoinAndSelect('ride.driver', 'driver')
      .leftJoinAndSelect('ride.car', 'car')
      .leftJoin('ride.passengers', 'passengers')
      .addSelect(['passengers.id']);

    const user = query.getOne();

    return user;
  },
  getOneById(id: string): Promise<RideEntityInterface | null> {
    const query = this.createQueryBuilder('ride')
      .where('ride.id = :id', { id })
      .leftJoinAndSelect('ride.passengers', 'passengers')
      .leftJoinAndSelect('ride.car', 'car')
      .leftJoinAndSelect('ride.driver', 'driver');

    const user = query.getOne();

    return user;
  },
  async getAllForSearch({
    distanceFilter,
    departureDate,
    statuses,
    onlyAvailable,
    onlyInTheFuture,
  }: GetAllRidesOptions = {}): Promise<SearchedRide[]> {
    const query = this.createQueryBuilder('ride')
      .leftJoin('ride.driver', 'driver')
      .addSelect(['driver.id', 'driver.avatarUrl', 'driver.username', 'driver.rate'])
      .leftJoin('ride.car', 'car')
      .addSelect(['car.id', 'car.seats', 'car.energy']);

    if (distanceFilter?.departure && distanceFilter?.arrival) {
      query.andWhere(
        `
          ST_DWithin(ride.departure_point::geography, ST_SetSRID(ST_MakePoint(:lngD, :latD), 4326)::geography, :distanceD)
          AND ST_DWithin(ride.arrival_point::geography, ST_SetSRID(ST_MakePoint(:lngA, :latA), 4326)::geography, :distanceA)
      `,
        {
          latD: distanceFilter.departure.latitude,
          lngD: distanceFilter.departure.longitude,
          distanceD: distanceFilter.departure.radiusKm * 1000,
          latA: distanceFilter.arrival.latitude,
          lngA: distanceFilter.arrival.longitude,
          distanceA: distanceFilter.arrival.radiusKm * 1000,
        },
      );
    } else if (distanceFilter?.departure) {
      query.andWhere(
        `
          ST_DWithin(ride.departure_point::geography, ST_SetSRID(ST_MakePoint(:lngD, :latD), 4326)::geography, :distanceD)
      `,
        {
          latD: distanceFilter.departure.latitude,
          lngD: distanceFilter.departure.longitude,
          distanceD: distanceFilter.departure.radiusKm * 1000,
        },
      );
    } else if (distanceFilter?.arrival) {
      query.andWhere(
        `
          ST_DWithin(ride.arrival_point::geography, ST_SetSRID(ST_MakePoint(:lngA, :latA), 4326)::geography, :distanceA)
      `,
        {
          latA: distanceFilter.arrival.latitude,
          lngA: distanceFilter.arrival.longitude,
          distanceA: distanceFilter.arrival.radiusKm * 1000,
        },
      );
    }

    if (departureDate) {
      const startOfDay = new Date(departureDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(departureDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.andWhere('ride.departure_date BETWEEN :startOfDay AND :endOfDay', {
        startOfDay,
        endOfDay,
      });
    }

    if (statuses) {
      query.andWhere('ride.status IN (:...statuses)', { statuses });
    }

    if (onlyAvailable) {
      query.andWhere('car.seats - ride.reservedSeats > 0');
    }

    if (onlyInTheFuture) {
      query.andWhere('ride.departure_date > :now', { now: new Date() });
    }

    return query.orderBy('ride.departure_date', 'ASC').getMany();
  },
  async updateRide(ride: SavedRide, entityManager?: EntityManager): Promise<void> {
    const manager = entityManager ?? this.manager;
    const rideEntity = this.create(ride);

    await manager.save(RideEntity, rideEntity);
  },
  async getAllByDriverId(driverId: string): Promise<RideEntityInterface[]> {
    const query = this.createQueryBuilder('ride')
      .leftJoin('ride.driver', 'driver')
      .addSelect(['driver.id'])
      .leftJoin('ride.car', 'car')
      .addSelect(['car.seats'])
      .where('driver.id = :driverId', { driverId })
      .orderBy('ride.departure_date', 'ASC');

    return query.getMany();
  },
  async getAllByCarId(carId: string): Promise<RideEntityInterface[]> {
    const query = this.createQueryBuilder('ride')
      .leftJoin('ride.car', 'car')
      .where('car.id = :carId', { carId })
      .andWhere('car.isDeleted = false')
      .orderBy('ride.departure_date', 'DESC');

    return query.getMany();
  },
  async getDailyStatistics(): Promise<DailyStatistics[]> {
    const query = this.createQueryBuilder('ride')
      .select('DATE(ride.endDate)', 'date')
      .addSelect('COUNT(DISTINCT ride.id)', 'rides')
      .addSelect('COALESCE(SUM(pc.credit), 0)', 'credits')
      .leftJoin(PlatformCreditEntity, 'pc', 'pc.ride = ride.id')
      .where('ride.endDate IS NOT NULL')
      .andWhere('ride.status = :status', { status: 'completed' });

    const results = await query
      .groupBy('DATE(ride.endDate)')
      .orderBy('DATE(ride.endDate)', 'DESC')
      .getRawMany();

    return results.map((result) => ({
      date: new Date(result.date),
      rides: Number(result.rides),
      credits: Number(result.credits),
    }));
  },
});
