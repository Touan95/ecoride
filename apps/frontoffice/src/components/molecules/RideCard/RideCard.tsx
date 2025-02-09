import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import { TbCar, TbDots, TbLeaf, TbLeafOff, TbStarFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

dayjs.locale('fr');

export interface RideCardProps {
  driverImage: string;
  driverName: string;
  driverRate: number;
  seatsLeft: number;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
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
  onDetailClick
}: RideCardProps) => {
  const formattedDepartureDate = dayjs(departureDate).format('dddd D MMMM YYYY');
  const formattedDepartureTime = dayjs(departureDate).format('HH:mm');
  const formattedArrivalDate = dayjs(arrivalDate).format('dddd D MMMM YYYY');
  const formattedArrivalTime = dayjs(arrivalDate).format('HH:mm');
  const seatLeftText = seatsLeft > 1 ? `${seatsLeft} place(s) disponible(s)` : `${seatsLeft} place disponible`;
  const bgColorClassname = isGreen ? 'bg-primary-300' : 'bg-primary-50';
  const greenTooltipText = isGreen
    ? 'Trajet éco-responsable : réalisé en voiture électrique. '
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
                  <GreenIcon size={25} />
                </TooltipTrigger>
                <TooltipContent className={clsxm(['shadow', bgColorClassname])}>{greenTooltipText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mx-10 flex gap-4 items-center text-primary-900">
            <TbDots size={25} />
            <TbCar size={40} />
            <TbDots size={25} />
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

      {/* <Icon className="text-primary-900 text-7xl" />
      <Typography align="center" variant="cardTitle" color="primary">
        {title}
      </Typography>
      <Typography align="center" variant="paragraph" color="primary">
        {description}
      </Typography> */}
    </div>
  );
};
