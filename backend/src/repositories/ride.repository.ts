import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { RideEntity, RideEntityInterface, SearchedRide } from '../entities/ride.entity';

interface DistanceProps { 
  latitude: number; 
  longitude: number; 
  radiusKm: number 
}

export interface PointDistanceFilter {
  departure?: DistanceProps
  arrival?: DistanceProps
}

interface GetAllRidesOptions {
  distanceFilter?: PointDistanceFilter
  departureDate?: Date
}

export type RideRepositoryInterface = Repository<RideEntity> & {
  createOne(ride: RideEntityInterface): Promise<RideEntityInterface>;
  getOneById(id: string): Promise<RideEntityInterface | null> 
  getAllForSearch({distanceFilter, departureDate}:GetAllRidesOptions): Promise<SearchedRide[]>;
};

export const RideRepository: RideRepositoryInterface = AppDataSource.getRepository(
  RideEntity,
).extend({
  async createOne(ride: RideEntityInterface): Promise<RideEntityInterface> {
    const newRide = this.create(ride);
    await this.save(newRide);
    return newRide;
  },
  getOneById(id: string): Promise<RideEntityInterface | null> {
      const query = this.createQueryBuilder('ride')
        .where('ride.id = :id', { id })
        .leftJoinAndSelect('ride.driver', 'driver')
        .leftJoinAndSelect('ride.car', 'car')
        
      const user = query.getOne();
  
      return user;
  },
  async getAllForSearch({ distanceFilter, departureDate }: GetAllRidesOptions = {}): Promise<SearchedRide[]> {
    const query = this.createQueryBuilder('ride')
      .leftJoin('ride.driver', 'driver')
      .addSelect([
        'driver.id',
        'driver.avatarUrl',
        'driver.username',
        'driver.rate'
      ])
      .leftJoin('ride.car', 'car')
      .addSelect([
        'car.id',
        'car.seats',
        'car.energy',
      ]);

    if (distanceFilter?.departure && distanceFilter?.arrival) {
      query.andWhere(`
          ST_DWithin(ride.departure_point::geography, ST_SetSRID(ST_MakePoint(:lngD, :latD), 4326)::geography, :distanceD)
          AND ST_DWithin(ride.arrival_point::geography, ST_SetSRID(ST_MakePoint(:lngA, :latA), 4326)::geography, :distanceA)
      `, {
          latD: distanceFilter.departure.latitude,
          lngD: distanceFilter.departure.longitude,
          distanceD: distanceFilter.departure.radiusKm,
          latA: distanceFilter.arrival.latitude,
          lngA: distanceFilter.arrival.longitude,
          distanceA: distanceFilter.arrival.radiusKm
      });
  } else if (distanceFilter?.departure) {
      query.andWhere(`
          ST_DWithin(ride.departure_point::geography, ST_SetSRID(ST_MakePoint(:lngD, :latD), 4326)::geography, :distanceD)
      `, {
          latD: distanceFilter.departure.latitude,
          lngD: distanceFilter.departure.longitude,
          distanceD: distanceFilter.departure.radiusKm
      });
  } else if (distanceFilter?.arrival) {
      query.andWhere(`
          ST_DWithin(ride.arrival_point::geography, ST_SetSRID(ST_MakePoint(:lngA, :latA), 4326)::geography, :distanceA)
      `, {
          latA: distanceFilter.arrival.latitude,
          lngA: distanceFilter.arrival.longitude,
          distanceA: distanceFilter.arrival.radiusKm
      });
  }
    
    if (departureDate) {
      query.andWhere('DATE(ride.departure_date) = :departureDate', {
        departureDate: departureDate.toISOString().split('T')[0] 
      });
    }

    return query.getMany();
  }
});
