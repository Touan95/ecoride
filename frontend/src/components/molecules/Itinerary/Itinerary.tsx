import { Typography } from '@/components/atoms/Typography';
import { TbCar, TbDots } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(duration);

export interface ItineraryProps {
  departureDate: Date;
  arrivalDate: Date;
  departureLocation: string;
  arrivalLocation: string;
}

export const Itinerary = ({ departureDate, arrivalDate, departureLocation, arrivalLocation }: ItineraryProps) => {
  const departure = dayjs(departureDate);
  const arrival = dayjs(arrivalDate);

  const formattedDepartureDate = departure.format('dddd D MMMM YYYY');
  const formattedShortDepartureDate = departure.format('DD/MM/YYYY');
  const formattedDepartureTime = departure.format('HH:mm');
  const formattedArrivalDate = arrival.format('dddd D MMMM YYYY');
  const formattedShortArrivalDate = arrival.format('DD/MM/YYYY');
  const formattedArrivalTime = arrival.format('HH:mm');

  return (
    <div className="w-full rounded-xl flex p-5 shadow bg-primary-50 justify-evenly items-center md:flex-row flex-col gap-6 md:gap-0">
      <div>
        <Typography align="center" variant="cardTitle" color="primary" customClassName="mb-2" tag="h2">
          {departureLocation}
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
      <div>
        <div className="mx-10 flex gap-4 items-center">
          <TbDots size={50} className="text-primary-900 hidden md:block" />
          <TbCar size={60} className="text-primary-900" />
          <TbDots size={50} className="text-primary-900 hidden md:block" />
        </div>
      </div>
      <div>
        <Typography align="center" variant="cardTitle" color="primary" customClassName="mb-2" tag="h2">
          {arrivalLocation}
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
  );
};
