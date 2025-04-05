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
import { Checkbox } from '@/components/ui/checkbox';

dayjs.locale('fr');
dayjs.extend(duration);

export interface AddReviewCardProps {
  onSubmit?: (rating: number, comment: string, dispute: boolean) => void;
  isLogged?: boolean;
  onLoginClick?: () => void;
  hasAlreadyReviewed?: boolean;
}

export const AddReviewCard = ({ onSubmit, isLogged = false, onLoginClick, hasAlreadyReviewed = false }: AddReviewCardProps) => {
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState('');
  const [dispute, setDispute] = useState(false);

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onDisputeChange = (checked: boolean) => {
    setDispute(checked);
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
      onSubmit(rating, comment, dispute);
    }
  };

  const loggedInContent = useMemo(() => {
    if (hasAlreadyReviewed) {
      return <Typography variant="cardTitleSm">Merci ! Vous avez déjà laissé un avis sur ce trajet</Typography>;
    } else {
      return (
        <>
          <Typography variant="cardTitle">{"Qu'avez-vous pensé de ce trajet"}</Typography>
          <Rating onRate={onRateChange} rating={rating} className="w-full justify-center" />
          <div className="flex flex-col">
            <Textarea
              placeholder="Votre avis"
              maxLength={REVIEW_MAX_LENGTH}
              onChange={onCommentChange}
              value={comment}
              className={clsxm(inputClassname, 'rounded-lg focus-visible:ring-[1px] resize-y w-full max-w-[656px] mb-2')}
            />
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="dispute" checked={dispute} onCheckedChange={onDisputeChange} />
                <Typography variant="small" htmlFor="dispute">
                  Je souhaite faire une réclamation
                </Typography>
              </div>
              <Typography variant="small" align="right">{`${comment.length}/${REVIEW_MAX_LENGTH}`}</Typography>
            </div>
          </div>
          <Button className="w-40 self-end" onClick={onSubmitReview}>
            Envoyer
          </Button>
        </>
      );
    }
  }, [onRateChange, rating, onCommentChange, comment, onSubmitReview, hasAlreadyReviewed]);

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
