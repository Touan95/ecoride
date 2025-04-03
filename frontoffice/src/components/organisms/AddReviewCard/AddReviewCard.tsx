import clsxm from '@/utils/clsxm';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { useMemo, useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Textarea } from '@/components/ui/textarea';
import { inputClassname } from '@/components/ui/input';
import { REVIEW_MAX_LENGTH } from '@/interfaces/review';
import { Button } from '@/components/molecules/Button';
import { Rating } from '@/components/molecules/Rating';

dayjs.locale('fr');
dayjs.extend(duration);

export interface AddReviewCardProps {
  onSubmit?: (rating: number, review: string) => void;
  isLogged?: boolean;
  onLoginClick?: () => void;
}

export const AddReviewCard = ({ onSubmit, isLogged = false, onLoginClick }: AddReviewCardProps) => {
  const [rating, setRating] = useState<number>(3);
  const [review, setReview] = useState('');

  const onReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const onRateChange = (newRating: number) => {
    if (newRating === rating) {
      setRating(0);
    } else {
      setRating(newRating);
    }
  };

  const onSubmitReview = () => {
    if (onSubmit) {
      onSubmit(rating, review);
    }
  };

  const loggedInContent = useMemo(() => {
    return (
      <>
        <Typography variant="cardTitle">{"Qu'avez-vous pensé de ce trajet"}</Typography>
        <Rating onRate={onRateChange} rating={rating} className="w-full justify-center" />
        <div className="flex flex-col">
          <Textarea
            placeholder="Votre avis"
            maxLength={REVIEW_MAX_LENGTH}
            onChange={onReviewChange}
            value={review}
            className={clsxm(inputClassname, 'rounded-lg focus-visible:ring-[1px] resize-y w-full max-w-[656px]')}
          />
          <Typography variant="small" align="right">{`${review.length}/${REVIEW_MAX_LENGTH}`}</Typography>
        </div>
        <Button className="w-40 self-end" onClick={onSubmitReview}>
          Envoyer
        </Button>
      </>
    );
  }, [onRateChange, rating, onReviewChange, review, onSubmitReview]);

  const loggedOutContent = useMemo(() => {
    return (
      <>
        <Typography variant="cardTitle" align="center">
          Vous avez participé à ce trajet ?
        </Typography>
        <Typography variant="cardTitleSm" align="center">
          Connectez-vous pour laisser votre avis !
        </Typography>
        <Button className="w-40 self-center" onClick={onLoginClick}>
          Se connecter
        </Button>
      </>
    );
  }, [onLoginClick]);

  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow gap-10 bg-primary-50'])}>
      {isLogged ? loggedInContent : loggedOutContent}
    </div>
  );
};
