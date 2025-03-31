'use client';

import { useGetDriverRides, useGetPassengerRides } from '@/api/hooks/useUserAPI';
import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { UserRideCard, UserRideCardProps } from '@/components/molecules/UserRideCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DriverRide } from '@/interfaces/ride';
import { PassengerRide } from '@/interfaces/ridePassenger';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const passengerRideApiToUserRideCard = (apiRide: PassengerRide): UserRideCardProps => {
  const duration = new Date(apiRide.arrivalDate).getTime() - new Date(apiRide.departureDate).getTime();

  return {
    id: apiRide.id,
    arrivalCity: apiRide.arrivalLocation.city ?? '',
    departureCity: apiRide.departureLocation.city ?? '',
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    duration,
    price: apiRide.price,
    isCancelledByPassenger: apiRide.canceled,
    status: apiRide.status
  };
};

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

export default function UserRides() {
  const router = useRouter();
  const { data: passengerRides, isLoading: isPassengerRidesLoading } = useGetPassengerRides();
  const { data: driverRides, isLoading: isDriverRidesLoading } = useGetDriverRides();

  const onDetailClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const onPassengerCancelClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const onDriverCancelClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const passengerContent = useMemo(() => {
    if (passengerRides && passengerRides.length > 0) {
      const passengerCardData = passengerRides.map((ride) => passengerRideApiToUserRideCard(ride));
      return (
        <div className="flex flex-col gap-3">
          {passengerCardData.map((ride) => {
            return <UserRideCard key={ride.id} {...ride} onDetailClick={onDetailClick(ride.id)} />;
          })}
        </div>
      );
    } else {
      return (
        <div className="p-10">
          <Typography variant="cardTitleSm" align="center">
            {"Vous n'avez aucun trajet en tant que passager"}
          </Typography>
        </div>
      );
    }
  }, [passengerRides, onDetailClick]);

  const driverContent = useMemo(() => {
    if (driverRides && driverRides.length > 0) {
      const driverCardData = driverRides.map((ride) => driverRideApiToUserRideCard(ride));
      return (
        <div className="flex flex-col gap-3">
          {driverCardData.map((ride) => {
            return <UserRideCard key={ride.id} {...ride} onDetailClick={onDetailClick(ride.id)} />;
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
  }, [driverRides, onDetailClick]);

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Tabs defaultValue="passenger" className="w-full gap-5">
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger value="passenger">
              <Typography variant="cardTitle">Passager</Typography>
            </TabsTrigger>
            <TabsTrigger value="driver">
              <Typography variant="cardTitle">Conducteur</Typography>
            </TabsTrigger>
          </TabsList>

          {!isPassengerRidesLoading && <TabsContent value="passenger">{passengerContent}</TabsContent>}
          {!isDriverRidesLoading && <TabsContent value="driver">{driverContent}</TabsContent>}
        </Tabs>
      </SectionContainer>
    </>
  );
}
