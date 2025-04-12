import { ReviewType } from '../../../models/rideReview.model';

export const serializer = (review: ReviewType): ReviewType => {
  return { ...review };
};
