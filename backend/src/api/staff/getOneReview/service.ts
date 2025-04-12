import RideReview, { ReviewType } from '../../../models/rideReview.model';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import reviewNotFoundError from '../../common/errors/reviewNotFound.error';
import userNotFoundError from '../../common/errors/userNotFound.error';
import userNotStaffError from '../../common/errors/userNotStaff.error';

interface GetOneReviewOptions {
  reviewId: string;
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  reviewId,
  userId,
  userRepository,
}: GetOneReviewOptions): Promise<ReviewType> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  if (!user.isStaff) {
    throw userNotStaffError();
  }

  const review = await RideReview.findOne({ _id: reviewId }).lean();
  if (!review) {
    throw reviewNotFoundError();
  }

  return review;
};
