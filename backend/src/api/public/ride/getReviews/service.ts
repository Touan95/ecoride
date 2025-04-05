import RideReview, { ReviewType } from '../../../../models/rideReview.model';
import { RideRepositoryInterface } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';

export interface GetRideDetailsServiceOptions {
  rideId: string;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  rideId,
  rideRepository,
}: GetRideDetailsServiceOptions): Promise<ReviewType[]> => {
  const ride = await rideRepository.getOneByIdForDetails(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  try {
    const reviews = await RideReview.find({ rideId }).sort({ createdAt: -1 });
    return reviews;
  } catch (error) {
    throw error;
  }
};
