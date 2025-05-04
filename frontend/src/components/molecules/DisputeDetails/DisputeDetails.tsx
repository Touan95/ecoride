import { Typography } from '@/components/atoms/Typography';
import 'dayjs/locale/fr';
import { DEFAULT_AVATAR_URL, User } from '@/interfaces/user';
import { AccountDetailsCard } from '../AccountDetailsCard';
import { TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import { Review } from '@/interfaces/review';

export interface DisputeDetailsProps {
  review: Review;
  passenger: User;
  driver: User;
}

export const DisputeDetails = ({ driver, passenger, review }: DisputeDetailsProps) => {
  const reviewDate = dayjs(review?.createdAt);
  const formattedReviewDate = reviewDate.format('DD MMMM YYYY');
  return (
    <>
      <Typography variant="cardTitle">{`Détail sur le litige (${review._id})`}</Typography>
      <div className="flex flex-col gap-4">
        <AccountDetailsCard
          username={driver.username}
          email={driver.email}
          avatarUrl={driver.avatarUrl ?? DEFAULT_AVATAR_URL}
          type={driver.type}
          title="Le conducteur"
          notCentered
          noPassword
        />
      </div>
      <div className="flex flex-col gap-4">
        <AccountDetailsCard
          username={passenger.username}
          email={passenger.email}
          avatarUrl={passenger.avatarUrl ?? DEFAULT_AVATAR_URL}
          type={passenger.type}
          title="Le passager"
          notCentered
          noPassword
        />
      </div>
      <div className="w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-4">
        <Typography variant="cardTitle">{"L'avis"}</Typography>
        <div className="flex">
          <div className="flex flex-col justify-between items-center w-26">
            <div className="flex items-center justify-center gap-1">
              <Typography align="center" variant="cardTitle" color="primary">
                {review.rating}
              </Typography>
              <TbStarFilled size={16} className="text-primary-900" />
            </div>
            <Typography align="center" variant="small" color="primary">
              {formattedReviewDate}
            </Typography>
          </div>
          <div className="flex flex-1">{review.comment}</div>
        </div>
      </div>
    </>
  );
};
