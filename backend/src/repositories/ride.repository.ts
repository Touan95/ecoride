import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { Ride, RideEntity, RideEntityInterface } from '../entities/ride.entity';


export type RideRepositoryInterface = Repository<RideEntity> & {
  createOne(ride: RideEntityInterface): Promise<RideEntityInterface>;
};

export const RideRepository: RideRepositoryInterface = AppDataSource.getRepository(
  RideEntity,
).extend({
  async createOne(ride: RideEntityInterface): Promise<RideEntityInterface> {
    const newRide = this.create(ride);
    await this.save(newRide);
    return newRide;
  },
});
