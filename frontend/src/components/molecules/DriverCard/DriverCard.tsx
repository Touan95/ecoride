import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { TbCircleDotFilled, TbExclamationCircle, TbPaw, TbPawOff, TbSmoking, TbSmokingNo, TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import Image from 'next/image';
import { useMemo } from 'react';
import { Review } from '@/interfaces/review';

dayjs.locale('fr');
dayjs.extend(duration);

export interface DriverReviewProps {
  reviewer: string;
  rating: number;
  comment?: string;
  date: Date;
}

export interface DriverCardProps {
  username: string;
  avatar: string;
  rating?: number;
  acceptsPets?: boolean;
  acceptsSmoking?: boolean;
  customRules?: string[];
  reviews?: Review[];
}

const DriverReview = ({ reviewer, rating, comment, date }: DriverReviewProps) => {
  const dateToFormat = dayjs(date);
  const formattedDate = dateToFormat.format('DD/MM/YYYY');
  return (
    <div className="flex">
      <div className="flex flex-col w-26 border-r">
        <Typography variant="cardTitleSm">{reviewer}</Typography>
        <Typography variant="extraSmall" color="primary">
          {formattedDate}
        </Typography>
        <div className="flex items-center gap-1">
          <Typography align="center" variant="cardTitle" color="primary">
            {`${rating}/5`}
          </Typography>
          <TbStarFilled size={14} className="text-primary-900" />
        </div>
      </div>
      <div className="pl-5">
        {comment && (
          <Typography variant="small" color="primary">
            {comment}
          </Typography>
        )}
      </div>
    </div>
  );
};

export const DriverCard = ({ username, avatar, rating, acceptsPets, acceptsSmoking, customRules, reviews }: DriverCardProps) => {
  const PetsIcon = acceptsPets ? TbPaw : TbPawOff;
  const SmokersIcon = acceptsSmoking ? TbSmoking : TbSmokingNo;
  const petsText = acceptsPets
    ? 'Ce conducteur accepte les animaux dans son véhicule'
    : "Ce conducteur n'accepte pas les animaux dans son véhicule";
  const smokersText = acceptsSmoking ? 'Ce conducteur accepte les fumeurs' : "Ce conducteur n'accepte pas les fumeurs";

  const reviewsContent = useMemo(() => {
    if (reviews && reviews.length > 0) {
      return reviews.map((review, index) => (
        <DriverReview
          key={index}
          reviewer={review.username}
          rating={review.rating}
          comment={review.comment ?? undefined}
          date={review.createdAt}
        />
      ));
    }
    return (
      <Typography variant="cardTitleSm" align="center" customClassName="mb-16">
        {"Ce conducteur n'a pas encore reçu d'avis validé."}
      </Typography>
    );
  }, [reviews]);

  return (
    <div className="w-full rounded-xl flex p-5 shadow gap-5 bg-primary-50 md:flex-row flex-col">
      <div className="flex flex-col items-center w-full md:w-20 h-25 gap-2">
        <Image src={avatar} height={50} width={50} className="rounded-full" alt={`Avatar du conducteur ${username}`} />
        <div className="w-full">
          <Typography align="center" variant="cardTitleSm" color="primary" ellipsis>
            {username}
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <Typography align="center" variant="small" color="primary">
            {rating}
          </Typography>
          <TbStarFilled size={14} className={clsxm('text-primary-900', !rating && 'opacity-50')} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-evenly h-25 gap-4 w-full">
          <div className="gap-2 items-center grid grid-cols-[34px_1fr]">
            <PetsIcon size={30} className="text-primary-900" />
            <Typography variant="cardTitleSm">{petsText}</Typography>
          </div>
          <div className="gap-2 items-center grid grid-cols-[34px_1fr]">
            <SmokersIcon size={30} className="text-primary-900" />
            <Typography variant="cardTitleSm">{smokersText}</Typography>
          </div>
        </div>
        {customRules && customRules.length > 0 && (
          <>
            <div className="border-t border-dashed border-primary-900 w-full my-4" />
            <div className="flex flex-col gap-4 w-full">
              <ul>
                <div className="gap-2 items-center grid grid-cols-[34px_1fr]">
                  <TbExclamationCircle size={30} className="text-primary-900" />
                  <Typography variant="cardTitleSm">Les demandes du chauffeur</Typography>
                </div>
                {customRules?.map((pref, index) => {
                  return (
                    <li key={index} className="ml-8 flex items-center">
                      <TbCircleDotFilled size={10} className="mx-2 text-primary-900" />
                      <Typography variant="cardTitleSm">{pref}</Typography>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
        <div className="border-t border-dashed border-primary-900 w-full my-4" />
        <div className="flex flex-col gap-8 w-full md:pr-10">
          <Typography variant="cardTitleSm">Les avis</Typography>
          {reviewsContent}
        </div>
      </div>
    </div>
  );
};
