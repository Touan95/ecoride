import { RideEntityInterface } from '../../../../entities/ride.entity';
import { RideRepositoryInterface } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';

export interface GetRideDetailsServiceOptions {
  rideId: string;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  rideId,
  rideRepository,
}: GetRideDetailsServiceOptions): Promise<RideEntityInterface> => {
  const ride = await rideRepository.getOneByIdForDetails(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  return ride;
};
