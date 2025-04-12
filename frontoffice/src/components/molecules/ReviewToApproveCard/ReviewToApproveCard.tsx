import { Typography } from '@/components/atoms/Typography';
import { TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { Button } from '@/components/molecules/Button';

dayjs.locale('fr');
dayjs.extend(duration);

export interface ReviewToApproveCardProps {
  id: string;
  rideId: string;
  date: Date;
  username: string;
  comment: string;
  rate: number;
  onDetailClick?: () => void;
  onApproveClick?: () => void;
}

export const ReviewToApproveCard = ({ date, username, comment, rate, onDetailClick, onApproveClick }: ReviewToApproveCardProps) => {
  const reviewDate = dayjs(date);
  const formattedReviewDate = reviewDate.format('DD MMMM YYYY');

  return (
    <div className="w-full rounded-xl flex p-5 shadow bg-primary-50 gap-4">
      <div className="flex flex-col justify-between items-center w-26">
        <Typography align="center" variant="cardTitleSm" color="primary">
          {username}
        </Typography>
        <div className="flex items-center justify-center gap-1">
          <Typography align="center" variant="cardTitle" color="primary">
            {rate}
          </Typography>
          <TbStarFilled size={16} className="text-primary-900" />
        </div>
        <Typography align="center" variant="small" color="primary">
          {formattedReviewDate}
        </Typography>
      </div>
      <div className="flex flex-1">{comment}</div>
      <div className="flex gap-4">
        <div>
          <Button className="mt-3 w-26" onClick={onDetailClick} variant="outlined">
            Voir détails
          </Button>
          {onApproveClick && (
            <Button className="mt-3 w-26" onClick={onApproveClick} variant="outlined">
              Approuver
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
