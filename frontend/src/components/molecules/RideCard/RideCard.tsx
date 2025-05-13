import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import { TbCar, TbDots, TbHourglassEmpty, TbLeaf, TbLeafOff, TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/molecules/Button';
import { formatDuration } from '@/utils/durations';

dayjs.locale('fr');
dayjs.extend(duration);

export interface RideCardProps {
  id: string;
  driverImage: string;
  driverName: string;
  driverRate?: number;
  seatsLeft: number;
  price: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: Date;
  arrivalDate: Date;
  duration: number;
  isGreen: boolean;
  onDetailClick?: () => void;
}

export const RideCard = ({
  driverImage,
  driverName,
  driverRate,
  seatsLeft,
  price,
  departureDate,
  departureCity,
  arrivalCity,
  arrivalDate,
  isGreen,
  duration,
  onDetailClick
}: RideCardProps) => {
  const departure = dayjs(departureDate);
  const arrival = dayjs(arrivalDate);

  const formattedDepartureDate = departure.format('dddd D MMMM YYYY');
  const formattedShortDepartureDate = departure.format('DD/MM/YY');
  const formattedDepartureTime = departure.format('HH:mm');
  const formattedArrivalDate = arrival.format('dddd D MMMM YYYY');
  const formattedShortArrivalDate = arrival.format('DD/MM/YY');
  const formattedArrivalTime = arrival.format('HH:mm');

  const formattedDuration = formatDuration(duration);

  const seatLeftText = seatsLeft > 1 ? `${seatsLeft} places disponibles` : `${seatsLeft} place disponible`;
  const bgColorClassname = isGreen ? 'bg-primary-300' : 'bg-primary-50';
  const greenTooltipText = isGreen
    ? 'Trajet éco-responsable : réalisé en voiture électrique.'
    : "Ce trajet n'est pas réalisé en voiture électrique";
  const GreenIcon = isGreen ? TbLeaf : TbLeafOff;

  return (
    <div className={clsxm(['w-full rounded-xl flex md:flex-row flex-col p-5 shadow', bgColorClassname])}>
      <div className="flex flex-col justify-center items-center md:w-30 w-full">
        <Image src={driverImage} height={50} width={50} className="rounded-full" alt={`Avatar du conducteur ${driverName}`} />
        <div className="w-full">
          <Typography align="center" variant="cardTitleSm" color="primary" ellipsis>
            {driverName}
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <Typography align="center" variant="small" color="primary">
            {driverRate}
          </Typography>
          <TbStarFilled size={14} className={clsxm('text-primary-900', !driverRate && 'opacity-50')} />
        </div>
      </div>
      <div className="grid grid-cols-3 justify-center items-center w-full">
        <div className="flex flex-col items-center">
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Départ
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {departureCity}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="md:flex hidden">
            {formattedDepartureDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="flex md:hidden">
            {formattedShortDepartureDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedDepartureTime}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <div className={clsxm(['flex justify-center', isGreen ? 'text-primary-900' : 'text-primary-300'])}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger aria-label={greenTooltipText}>
                  <GreenIcon />
                </TooltipTrigger>
                <TooltipContent className={clsxm(['shadow', bgColorClassname])}>{greenTooltipText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mx-10 md:flex hidden gap-4 items-center">
            <TbDots size={25} className="text-primary-900" />
            <TbCar size={30} className="text-primary-900" />
            <TbDots size={25} className="text-primary-900" />
          </div>
          <div className="flex items-center justify-center">
            <TbHourglassEmpty className="text-primary-900" />
            <Typography align="center" variant="small" color="primary">
              {formattedDuration}
            </Typography>
          </div>
          <Typography align="center" variant="small" color="primary">
            {seatLeftText}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Arrivée
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {arrivalCity}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="md:flex hidden">
            {formattedArrivalDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="flex md:hidden">
            {formattedShortArrivalDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedArrivalTime}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col items-center md:w-30 w-full justify-center">
        <Typography align="center" variant="cardTitleSm" color="primary">
          Crédits
        </Typography>
        <Typography align="center" variant="cardTitle" color="primary">
          {price}
        </Typography>
        <Button className="mt-3" onClick={onDetailClick} variant="outlined">
          Détails
        </Button>
      </div>
    </div>
  );
};
