import { Typography } from '@/components/atoms/Typography';
import { UserRideCard, UserRideCardProps } from '@/components/molecules/UserRideCard';
import { DriverRide } from '@/interfaces/ride';

interface DriverRideList {
  rides: DriverRide[];
  onDetailClick: (id: string) => () => void;
  onCancelClick: (id: string) => () => void;
}

const driverRideApiToUserRideCard = (apiRide: DriverRide): UserRideCardProps => {
  const duration = new Date(apiRide.arrivalDate).getTime() - new Date(apiRide.departureDate).getTime();
  const seatsLeft = apiRide.carSeats - (apiRide.reservedSeats ?? 0);

  return {
    id: apiRide.id,
    arrivalCity: apiRide.arrivalLocation.city ?? '',
    departureCity: apiRide.departureLocation.city ?? '',
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    duration,
    price: apiRide.price,
    status: apiRide.status,
    seatsLeft
  };
};

export const DriverRideList = ({ onDetailClick, rides, onCancelClick }: DriverRideList) => {
  if (rides.length > 0) {
    const driverCardData = rides.map((ride) => driverRideApiToUserRideCard(ride));
    return (
      <div className="flex flex-col gap-3">
        {driverCardData.map((ride) => {
          return <UserRideCard key={ride.id} {...ride} onDetailClick={onDetailClick(ride.id)} onCancelClick={onCancelClick(ride.id)} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="p-10">
        <Typography variant="cardTitleSm" align="center">
          {"Vous n'avez aucun trajet en tant que conducteur"}
        </Typography>
      </div>
    );
  }
};
