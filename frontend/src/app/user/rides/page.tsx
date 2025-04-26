'use client';

import { useCancelDriverRide, useCancelPassengerRide, useGetDriverRides, useGetPassengerRides } from '@/api/hooks/useUserAPI';
import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { DriverRideList } from '@/components/organisms/DriverRideList';
import { PassengerRideList } from '@/components/organisms/PassengerRideList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

export default function UserRides() {
  const router = useRouter();
  const { data: passengerRides, isLoading: isPassengerRidesLoading } = useGetPassengerRides();
  const { data: driverRides, isLoading: isDriverRidesLoading } = useGetDriverRides();
  const cancelPassengerRide = useCancelPassengerRide({});
  const cancelDriverRide = useCancelDriverRide({});

  const onDetailClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const onPassengerCancelClick = (id: string) => () => {
    cancelPassengerRide.mutate(id);
  };

  const onDriverCancelClick = (id: string) => () => {
    cancelDriverRide.mutate(id);
  };

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Vos trajets</Typography>
        <Tabs defaultValue="passenger" className="w-full gap-5">
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger value="passenger">
              <Typography variant="cardTitle">Passager</Typography>
            </TabsTrigger>
            <TabsTrigger value="driver">
              <Typography variant="cardTitle">Conducteur</Typography>
            </TabsTrigger>
          </TabsList>

          {!isPassengerRidesLoading && passengerRides && (
            <TabsContent value="passenger">
              <PassengerRideList onCancelClick={onPassengerCancelClick} onDetailClick={onDetailClick} rides={passengerRides} />
            </TabsContent>
          )}
          {!isDriverRidesLoading && driverRides && (
            <TabsContent value="driver">
              <DriverRideList onCancelClick={onDriverCancelClick} onDetailClick={onDetailClick} rides={driverRides} />
            </TabsContent>
          )}
        </Tabs>
      </SectionContainer>
    </>
  );
}
