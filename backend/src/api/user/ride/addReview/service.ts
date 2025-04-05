import { UpdateUser, UserRepositoryInterface } from '../../../../repositories/user.repository';
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
    createdAt: now,
    updatedAt: now,
    driverId,
    rating,
    comment,
    rideId,
    userId,
    approved: false,
    dispute,
    username: user.username
  }

  const review = new RideReview(reviewObject);
  try {
    await review.save();
    //A faire lors de l'approve review
    const driverRatingsResult = await RideReview.aggregate([
      { $match: { driverId } },  // Match all reviews for this driver
      { $group: { _id: "$driverId", averageRating: { $avg: "$rating" } } }  // Group by driver and calculate average rating
    ]);

    // Get the average rating (or 0 if no reviews found)
    const averageRating = driverRatingsResult.length > 0 ? driverRatingsResult[0].averageRating as number : 0;

    const driver = await userRepository.getOneById(driverId);
    if (!driver) {
      throw userNotFoundError();
    }

    const updatedDriver:UpdateUser = {
      ...driver,
      rate: averageRating
    } 
    await userRepository.updateUser(driverId, updatedDriver);

    return review; 
  } catch (error:any) {
    if (error.code === 11000) {
      throw rideAlreadyReviewedError()
    }
    throw error;
  }
};
