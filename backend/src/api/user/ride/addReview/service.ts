import { v4 as uuid } from 'uuid';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { RideRepositoryInterface } from '../../../../repositories/ride.repository';
import rideNotFoundError from '../../../common/errors/rideNotFound.error';
import { ReviewType, RideReview } from '../../../../models/rideReview.model';
import rideAlreadyReviewedError from '../../../common/errors/rideAlreadyReviewed.error';

export interface AddReviewServiceOptions {
  userId: string;
  comment: string;
  rating: number;
  rideId: string;
  dispute: boolean;
  userRepository: UserRepositoryInterface;
  rideRepository: RideRepositoryInterface;
}

export const service = async ({
  userId,
  comment,
  rating,
  rideId,
  dispute,
  userRepository,
  rideRepository,
}: AddReviewServiceOptions): Promise<ReviewType> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const ride = await rideRepository.getOneById(rideId);
  if (!ride) {
    throw rideNotFoundError();
  }

  const now = new Date()
  const driverId = ride.driver.id

  const reviewObject: ReviewType = {
    _id: uuid(),
    createdAt: now,
    updatedAt: now,
    driverId,
    rating,
    comment,
    rideId,
    userId,
    approved: null,
    dispute,
    username: user.username
  }

  const review = new RideReview(reviewObject);
  try {
    await review.save();
    return review; 
  } catch (error:any) {
    if (error.code === 11000) {
      throw rideAlreadyReviewedError()
    }
    throw error;
  }
};
