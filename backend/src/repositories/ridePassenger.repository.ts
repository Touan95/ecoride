import { EntityManager, Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import {
  RidePassengerEntity,
  RidePassengerEntityInterface,
} from '../entities/ridePassenger.entity';

export type UpdateRidePassenger = Partial<RidePassengerEntityInterface>;

export type RidePassengerRepositoryInterface = Repository<RidePassengerEntity> & {
  createOrUpdate(
    ridePassenger: RidePassengerEntityInterface,
    entityManager?: EntityManager,
  ): Promise<RidePassengerEntityInterface>;
  getAllByPassengerId(passengerId: string): Promise<RidePassengerEntityInterface[]>;
  getOneByIds(userId: string, rideId: string): Promise<RidePassengerEntityInterface | null>;
};

export const RidePassengerRepository: RidePassengerRepositoryInterface =
  AppDataSource.getRepository(RidePassengerEntity).extend({
    async createOrUpdate(
      ridePassenger: UpdateRidePassenger,
      entityManager?: EntityManager,
    ): Promise<RidePassengerEntityInterface> {
      const manager = entityManager ?? this.manager;
      const newRide = this.create(ridePassenger);
      await manager.save(newRide);
      return newRide;
    },
    async getAllByPassengerId(passengerId: string): Promise<RidePassengerEntityInterface[]> {
      const query = this.createQueryBuilder('ride_passenger')
        .leftJoinAndSelect('ride_passenger.ride', 'ride')
        .leftJoin('ride_passenger.user', 'user')
        .addSelect(['user.id'])
        .where('user.id = :passengerId', { passengerId })
        .orderBy('ride.departure_date', 'DESC');

      return query.getMany();
    },
    async getOneByIds(
      userId: string,
      rideId: string,
    ): Promise<RidePassengerEntityInterface | null> {
      const query = this.createQueryBuilder('ride_passenger')
        .leftJoin('ride_passenger.ride', 'ride')
        .addSelect(['ride.id'])
        .leftJoin('ride_passenger.user', 'user')
        .addSelect(['user.id'])
        .where('ride.id = :rideId', { rideId })
        .andWhere('user.id = :userId', { userId });

      return query.getOne();
    },
  });
