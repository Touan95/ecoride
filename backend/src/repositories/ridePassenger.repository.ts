import { EntityManager, Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { RidePassengerEntity, RidePassengerEntityInterface } from '../entities/ridePassenger.entity';

export type SavedRidePassenger = Partial<RidePassengerEntity>;

export type RidePassengerRepositoryInterface = Repository<RidePassengerEntity> & {
  createOne(ridePassenger: RidePassengerEntityInterface, entityManager?: EntityManager): Promise<RidePassengerEntityInterface>;
  updateRidePassenger(ridePassenger: SavedRidePassenger, entityManager?: EntityManager): Promise<void>
  getAllByPassengerId(passengerId: string): Promise<RidePassengerEntityInterface[]>
};

export const RidePassengerRepository: RidePassengerRepositoryInterface = AppDataSource.getRepository(
  RidePassengerEntity,
).extend({
  async createOne(ridePassenger: RidePassengerEntityInterface, entityManager?: EntityManager): Promise<RidePassengerEntityInterface> {
    const manager = entityManager ?? this.manager;
    const newRide = this.create(ridePassenger);
    await manager.save(newRide);
    return newRide;
  },
  async updateRidePassenger(ridePassenger: SavedRidePassenger, entityManager?: EntityManager): Promise<void> {
    const manager = entityManager ?? this.manager;
    await manager.save(ridePassenger)
  },
  async getAllByPassengerId(passengerId: string): Promise<RidePassengerEntityInterface[]> {
    const query = this.createQueryBuilder('ride_passenger')
    .leftJoinAndSelect('ride_passenger.ride', 'ride')
    .leftJoin('ride_passenger.user', 'user')
    .addSelect([
      'user.id',
    ])
    .where('user.id = :passengerId', { passengerId })
    .orderBy('ride.departure_date', 'DESC'); 
    
    return query.getMany();
  },
});
