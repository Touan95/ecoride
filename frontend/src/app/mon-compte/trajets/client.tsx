'use client';

import { useCancelDriverRide, useCancelPassengerRide, useGetDriverRides, useGetPassengerRides } from '@/api/hooks/useUserAPI';
import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { DriverRideList } from '@/components/organisms/DriverRideList';
import { PassengerRideList } from '@/components/organisms/PassengerRideList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES } from '@/configs/routes';
import { DriverRide } from '@/interfaces/ride';
import { PassengerRide } from '@/interfaces/ridePassenger';
import { orderRides } from '@/utils/ride';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export default function UserRidesPageClient() {
  const [confirmationModaleMode, setConfirmationModaleMode] = useState<'driver' | 'passenger' | undefined>(undefined);
  const [rideIdToCancel, setRideIdToCancel] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { data: passengerRides, isLoading: isPassengerRidesLoading } = useGetPassengerRides();
  const { data: driverRides, isLoading: isDriverRidesLoading } = useGetDriverRides();

  const modalDescription =
    confirmationModaleMode === 'passenger'
      ? 'Voulez-vous vraiment annuler votre participation à ce trajet ? Vous serez immédiatement remboursé'
      : 'Voulez-vous vraiment annuler ce trajet ? Tous les passagers seront notifiés de votre annulation';

  const cancelPassengerRide = useCancelPassengerRide({
    onSuccess: (data) => {
      toast.success(data.message);
    }
  });
  const cancelDriverRide = useCancelDriverRide({
    onSuccess: (data) => {
      toast.success(data.message);
    }
  });

  const orderedDriverRides = useMemo(() => {
    if (driverRides) {
      return orderRides(driverRides) as DriverRide[];
    }
    return [];
  }, [driverRides]);

  const orderedPassengerRides = useMemo(() => {
    if (passengerRides) {
      return orderRides(passengerRides) as PassengerRide[];
    }
    return [];
  }, [passengerRides]);

  const onDetailClick = (id: string) => () => {
    router.push(`${ROUTES.RIDES}/${id}`);
  };

  const onPassengerCancelClick = (id: string) => () => {
    setConfirmationModaleMode('passenger');
    setRideIdToCancel(id);
  };

  const onDriverCancelClick = (id: string) => () => {
    setConfirmationModaleMode('driver');
    setRideIdToCancel(id);
  };
  const onCancelPassengerRide = (id: string) => {
    cancelPassengerRide.mutate(id);
    closeConfirmationModal();
  };

  const onCancelDriverRide = (id: string) => {
    cancelDriverRide.mutate(id);
    closeConfirmationModal();
  };

  const closeConfirmationModal = () => {
    setConfirmationModaleMode(undefined);
    setRideIdToCancel(undefined);
  };

  const onValidateCancel = () => {
    if (rideIdToCancel) {
      switch (confirmationModaleMode) {
        case 'passenger':
          onCancelPassengerRide(rideIdToCancel);
          break;
        case 'driver':
          onCancelDriverRide(rideIdToCancel);
          break;
      }
    }
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

          {!isPassengerRidesLoading && orderedPassengerRides && (
            <TabsContent value="passenger">
              <PassengerRideList onCancelClick={onPassengerCancelClick} onDetailClick={onDetailClick} rides={orderedPassengerRides} />
            </TabsContent>
          )}
          {!isDriverRidesLoading && orderedDriverRides && (
            <TabsContent value="driver">
              <DriverRideList onCancelClick={onDriverCancelClick} onDetailClick={onDetailClick} rides={orderedDriverRides} />
            </TabsContent>
          )}
        </Tabs>
      </SectionContainer>
      {!!confirmationModaleMode && !!rideIdToCancel && (
        <ConfirmationModal
          isOpen={!!confirmationModaleMode}
          onClose={closeConfirmationModal}
          onValidate={onValidateCancel}
          onCancel={closeConfirmationModal}
          title="Annulation de trajet"
          content={modalDescription}
        />
      )}
    </>
  );
}
