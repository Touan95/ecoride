import { Typography } from '@/components/atoms/Typography';
import { ReviewToApproveCard, ReviewToApproveCardProps } from '@/components/molecules/ReviewToApproveCard';
import { Review } from '@/interfaces/review';

interface StaffReviewList {
  reviews: Review[];
  onDetailClick: (rideId: string) => () => void;
  onApproveClick?: (commentId: string) => () => void;
  dispute?: boolean;
}

const reviewApiToCard = (apiReview: Review): ReviewToApproveCardProps => {
  return {
    id: apiReview._id,
    rideId: apiReview.rideId,
    comment: apiReview.comment ?? '',
    date: apiReview.createdAt,
    rate: apiReview.rating,
    username: apiReview.username
  };
};

export const StaffReviewList = ({ onDetailClick, reviews, onApproveClick, dispute = false }: StaffReviewList) => {
  if (reviews.length > 0) {
    const reviewCardData = reviews.map((review) => reviewApiToCard(review));
    return (
      <div className="flex flex-col gap-3">
        {reviewCardData.map((review) => {
          return (
            <ReviewToApproveCard
              key={review.id}
              {...review}
              onDetailClick={onDetailClick(dispute ? review.id : review.rideId)}
              onApproveClick={onApproveClick && onApproveClick(review.id)}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="p-10">
        <Typography variant="cardTitleSm" align="center">
          {`Il n'y a aucun ${dispute ? 'litige' : 'avis'} à valider`}
        </Typography>
      </div>
    );
  }
};
