import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { TbCircleDotFilled, TbPaw, TbPawOff, TbSmoking, TbSmokingNo, TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import Image from 'next/image';

dayjs.locale('fr');
dayjs.extend(duration);

export interface DriverReviewProps {
  reviewer: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface DriverCardProps {
  username: string;
  avatar: string;
  rating: number;
  allowPets?: boolean;
  allowSmokers?: boolean;
  customPreferences?: string[];
  reviews?: DriverReviewProps[];
}

const DriverReview = ({ reviewer, rating, comment, date }: DriverReviewProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col w-50">
        <Typography>{reviewer}</Typography>
        <div className="flex items-center gap-1">
          <Typography align="center" variant="small" color="primary">
            {`${rating}/5`}
          </Typography>
          <TbStarFilled size={14} />
        </div>
      </div>
      <Typography variant="small" color="primary">
        {comment}
      </Typography>
    </div>
  );
};

export const DriverCard = ({ username, avatar, rating, allowPets, allowSmokers, customPreferences, reviews }: DriverCardProps) => {
  const PetsIcon = allowPets ? TbPaw : TbPawOff;
  const SmokersIcon = allowSmokers ? TbSmoking : TbSmokingNo;
  const petsText = allowPets
    ? 'Ce conducteur accepte les animaux dans son véhicule'
    : "Ce conducteur n'accepte pas les animaux dans son véhicule";
  const smokersText = allowSmokers ? 'Ce conducteur accepte les fumeurs' : "Ce conducteur n'accepte pas les fumeurs";

  return (
    <div className={clsxm(['w-full rounded-xl flex p-5 shadow gap-5 bg-primary-50'])}>
      <div className="flex flex-col items-center w-20 h-25">
        <Image src={avatar} height={50} width={50} className="rounded-full" alt={`${username}-avatar-image`} />
        <div className="w-full">
          <Typography align="center" variant="cardTitleSm" color="primary" ellipsis>
            {username}
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <Typography align="center" variant="small" color="primary">
            {rating}
          </Typography>
          <TbStarFilled size={14} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-evenly h-25 gap-4 w-full">
          <div className="flex gap-2 items-center">
            <PetsIcon size={30} />
            <Typography variant="cardTitleSm">{petsText}</Typography>
          </div>
          <div className="flex gap-2 items-center">
            <SmokersIcon size={30} />
            <Typography variant="cardTitleSm">{smokersText}</Typography>
          </div>
        </div>
        {customPreferences && customPreferences.length > 0 && (
          <>
            <div className="border-t border-dashed border-primary-900 w-full my-4" />
            <div className="flex flex-col gap-4 w-full">
              <ul>
                <Typography variant="cardTitleSm">Les demandes du chauffeur</Typography>
                {customPreferences?.map((pref, index) => {
                  return (
                    <li key={index} className="flex gap-2 items-center">
                      <TbCircleDotFilled size={10} className="mx-2" />
                      <Typography variant="cardTitleSm">{pref}</Typography>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
        {reviews && reviews.length > 0 && (
          <>
            <div className="border-t border-dashed border-primary-900 w-full my-4" />
            <div className="flex flex-col gap-8 w-full pr-10">
              <Typography variant="cardTitleSm">Les avis</Typography>
              {reviews.map((review, index) => {
                return (
                  <DriverReview key={index} reviewer={review.reviewer} rating={review.rating} comment={review.comment} date={review.date} />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
