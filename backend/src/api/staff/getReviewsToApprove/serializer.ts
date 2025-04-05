import { ReviewType } from "../../../models/rideReview.model";

interface SerializedReviewsToApprove {
  reviews: ReviewType[]
}

export const serializer = (reviews: ReviewType[]):SerializedReviewsToApprove => {
  return { reviews }
};
