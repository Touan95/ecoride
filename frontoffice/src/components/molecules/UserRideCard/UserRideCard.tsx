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
  const formattedDepartureTime = departure.format('HH:mm');
  const formattedArrivalDate = arrival.format('dddd D MMMM YYYY');
  const formattedArrivalTime = arrival.format('HH:mm');

  const formattedDuration = formatDuration(duration);

  const seatLeftText = seatsLeft && seatsLeft > 1 ? `${seatsLeft} places disponibles` : `${seatsLeft} place disponible`;

  const statusLabel = isCancelledByPassenger ? 'Annulé' : getRideStatusLabel(status);

  const isCancellable = !isCancelledByPassenger && status === RideStatus.UPCOMING;

  const statusStyle = getStatusStyle(status, isCancelledByPassenger);

  return (
    <div className={clsxm(['w-full rounded-xl flex p-5 shadow bg-primary-50', statusStyle])}>
      <div className="flex flex-1 justify-center items-center">
        <div>
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Départ
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {departureCity}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedDepartureDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedDepartureTime}
          </Typography>
        </div>
        <div>
          <div className="mx-10 flex gap-4 items-center">
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
        <div>
          <Typography align="center" variant="small" color="primary" customClassName="mb-2">
            Arrivée
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {arrivalCity}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedArrivalDate}
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary">
            {formattedArrivalTime}
          </Typography>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="grid grid-rows-[20px_1fr] w-30 justify-center">
          <Typography align="center" variant="small" color="primary" customClassName="h-5 mb-2">
            Statut
          </Typography>
          <Typography
            align="center"
            variant="cardTitleSm"
            color={status === RideStatus.ONGOING ? 'secondary' : 'primary'}
            customClassName="self-center"
          >
            {statusLabel}
          </Typography>
        </div>
        <div className="grid grid-rows-[20px_1fr] w-30 justify-center">
          <Typography align="center" variant="small" color="primary" customClassName="h-5 mb-2">
            Tarif par passager
          </Typography>
          <Typography align="center" variant="cardTitleSm" color="primary" customClassName="self-center">
            {`${price} crédits`}
          </Typography>
        </div>
        <div>
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
