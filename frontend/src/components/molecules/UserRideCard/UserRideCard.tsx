import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { TbCar, TbDots, TbHourglassEmpty } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { Button } from '@/components/molecules/Button';
import { formatDuration } from '@/utils/durations';
import { RideStatus } from '@/api/lib/user';
import { getRideStatusLabel } from '@/utils/ride';

dayjs.locale('fr');
dayjs.extend(duration);

const getStatusStyle = (status: RideStatus, isCancelledByPassenger: boolean) => {
  if (status === RideStatus.COMPLETED || status === RideStatus.CANCELLED || isCancelledByPassenger) {
    return 'opacity-50';
  } else if (status === RideStatus.ONGOING) {
    return 'ring-secondary-500 ring-2';
  }
};

export interface UserRideCardProps {
  id: string;
  seatsLeft?: number;
  price: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: Date;
  arrivalDate: Date;
  duration: number;
  onDetailClick?: () => void;
  onCancelClick?: () => void;
  status: RideStatus;
  isCancelledByPassenger?: boolean;
}

export const UserRideCard = ({
  seatsLeft,
  price,
  departureDate,
  departureCity,
  arrivalCity,
  onCancelClick,
  arrivalDate,
  duration,
  onDetailClick,
  status,
  isCancelledByPassenger = false
}: UserRideCardProps) => {
  const departure = dayjs(departureDate);
  const arrival = dayjs(arrivalDate);

  const formattedDepartureDate = departure.format('dddd D MMMM YYYY');
  const formattedShortDepartureDate = departure.format('DD/MM/YYYY');
  const formattedDepartureTime = departure.format('HH:mm');
  const formattedArrivalDate = arrival.format('dddd D MMMM YYYY');
  const formattedShortArrivalDate = arrival.format('DD/MM/YYYY');
  const formattedArrivalTime = arrival.format('HH:mm');

  const formattedDuration = formatDuration(duration);

  const seatLeftText = seatsLeft && seatsLeft > 1 ? `${seatsLeft} places disponibles` : `${seatsLeft} place disponible`;

  const statusLabel = isCancelledByPassenger ? 'Annulé' : getRideStatusLabel(status);

  const isCancellable = !isCancelledByPassenger && status === RideStatus.UPCOMING;

  const statusStyle = getStatusStyle(status, isCancelledByPassenger);

  return (
    <div className={clsxm(['w-full rounded-xl flex p-5 shadow bg-primary-50 md:flex-row flex-col md:gap-0 gap-10', statusStyle])}>
      <div className="grid grid-cols-3 justify-center items-center w-full">
        <div className="flex flex-col items-center">
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Départ
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {departureCity}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="hidden md:block">
            {formattedDepartureDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="block md:hidden">
            {formattedShortDepartureDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedDepartureTime}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <div className="mx-10 gap-4 items-center md:flex hidden">
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
          {seatsLeft !== undefined && (
            <Typography align="center" variant="small" color="primary">
              {seatLeftText}
            </Typography>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Arrivée
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {arrivalCity}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="hidden md:block">
            {formattedArrivalDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="block md:hidden">
            {formattedShortArrivalDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedArrivalTime}
          </Typography>
        </div>
      </div>
      <div className="flex gap-4 md:flex-row flex-col items-center h-full">
        <div className="flex flex-row gap-4 h-full w-full justify-evenly">
          <div className="grid grid-rows-[20px_1fr] w-30 justify-center h-full">
            <Typography align="center" variant="small" color="primary" customClassName="h-5 mb-2">
              Statut
            </Typography>
            <div className="flex h-full items-center">
              <Typography
                align="center"
                variant="cardTitleSm"
                color={status === RideStatus.ONGOING ? 'secondary' : 'primary'}
                customClassName="self-center"
              >
                {statusLabel}
              </Typography>
            </div>
          </div>
          <div className="grid grid-rows-[20px_1fr] w-30 justify-center">
            <Typography align="center" variant="small" color="primary" customClassName="h-5 mb-2">
              Tarif par passager
            </Typography>
            <Typography align="center" variant="cardTitleSm" color="primary" customClassName="self-center">
              {`${price} crédits`}
            </Typography>
          </div>
        </div>
        <div className="flex h-full items-center gap-4 flex-row md:flex-col">
          <Button className="mt-3 w-26" onClick={onDetailClick} variant="outlined">
            Détails
          </Button>
          <Button className="mt-3 w-26" onClick={onCancelClick} variant="outlined" disabled={!isCancellable}>
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};
