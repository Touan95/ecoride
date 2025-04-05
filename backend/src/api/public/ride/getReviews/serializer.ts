import { ReviewType } from '../../../../models/rideReview.model';

interface SerializedReviews {
  reviews: ReviewType[];
  allReviewerIds: string[];
}

export const serializer = (reviews: ReviewType[], approvedOnly?: boolean): SerializedReviews => {
  const approvedReviews = reviews.filter((review) => review.approved);
  const allReviewerIds = reviews.map((review) => review.userId);
  return {
    allReviewerIds,
    reviews: approvedOnly ? approvedReviews : reviews,
  };
};
