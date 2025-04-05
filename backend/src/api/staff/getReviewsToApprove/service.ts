import RideReview, { ReviewType } from "../../../models/rideReview.model";
import { UserRepositoryInterface } from "../../../repositories/user.repository";
import userNotFoundError from "../../common/errors/userNotFound.error";
import userNotStaffError from "../../common/errors/userNotStaff.error";

export interface GetReviewToApproveServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
}: GetReviewToApproveServiceOptions): Promise<ReviewType[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }
  
  if (!user.isStaff) {
    throw userNotStaffError();
  }

  try {
    const reviews = await RideReview.find({ approved: null }).sort({ createdAt: 1 });
    return reviews;
  } catch (error) {
    throw error;
  }
};
