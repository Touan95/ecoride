import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import { TbCar, TbDots, TbHourglassEmpty, TbLeaf, TbLeafOff, TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

dayjs.locale('fr');
dayjs.extend(duration);

export interface RideCardProps {
  driverImage: string;
  driverName: string;
  driverRate: number;
  seatsLeft: number;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
  duration: number;
  isGreen: boolean;
  onDetailClick: () => void;
}

export const RideCard = ({
  driverImage,
  driverName,
  driverRate,
  seatsLeft,
  price,
  departureDate,
  arrivalDate,
  isGreen,
  duration,
  onDetailClick
}: RideCardProps) => {
  const departure = dayjs(departureDate);
  const arrival = dayjs(arrivalDate);

  const formattedDepartureDate = departure.format('dddd D MMMM YYYY');
  const formattedDepartureTime = departure.format('HH:mm');
  const formattedArrivalDate = arrival.format('dddd D MMMM YYYY');
  const formattedArrivalTime = arrival.format('HH:mm');

  const formattedDuration = dayjs.duration(duration).format('H:mm');

  const seatLeftText = seatsLeft > 1 ? `${seatsLeft} places disponibles` : `${seatsLeft} place disponible`;
  const bgColorClassname = isGreen ? 'bg-primary-300' : 'bg-primary-50';
  const greenTooltipText = isGreen
    ? 'Trajet éco-responsable : réalisé en voiture électrique.'
    : "Ce trajet n'est pas réalisé en voiture électrique";
  const GreenIcon = isGreen ? TbLeaf : TbLeafOff;

  return (
    <div className={clsxm(['w-full rounded-xl flex p-5 shadow', bgColorClassname])}>
      <div className="flex flex-col items-center w-30">
        <Image src={driverImage} height={50} width={50} className="rounded-full" alt={`${driverName}-avatar-image`} />
        <div className="w-full">
          <Typography align="center" variant="cardTitleSm" color="primary" ellipsis>
            {driverName}
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <Typography align="center" variant="small" color="primary">
            {driverRate}
          </Typography>
          <TbStarFilled size={14} />
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <div>
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Départ
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedDepartureDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedDepartureTime}
          </Typography>
        </div>
        <div>
          <div className={clsxm(['flex justify-center', isGreen ? 'text-primary-900' : 'text-primary-300'])}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <GreenIcon />
                </TooltipTrigger>
                <TooltipContent className={clsxm(['shadow', bgColorClassname])}>{greenTooltipText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mx-10 flex gap-4 items-center text-primary-900">
            <TbDots size={25} />
            <TbCar size={30} />
            <TbDots size={25} />
          </div>
          <div className="flex items-center justify-center">
            <TbHourglassEmpty />
            <Typography align="center" variant="small" color="primary">
              {formattedDuration}
            </Typography>
          </div>
          <Typography align="center" variant="small" color="primary">
            {seatLeftText}
          </Typography>
        </div>
        <div>
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Arrivée
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedArrivalDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedArrivalTime}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col items-center w-30 justify-center">
        <Typography align="center" variant="cardTitleSm" color="primary">
          Crédits
        </Typography>
        <Typography align="center" variant="cardTitle" color="primary">
          {price}
        </Typography>
        <div
          className="cursor-pointer text-primary-900 flex items-center border h-fit rounded-full shadow px-3 py-1 self-center mt-3 hover:bg-secondary-300"
          onClick={onDetailClick}
        >
          <Typography align="center" variant="cardTitleSm" color="primary">
            Détails
          </Typography>
        </div>
      </div>
    </div>
  );
};
