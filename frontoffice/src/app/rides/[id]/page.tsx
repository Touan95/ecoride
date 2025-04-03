'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { useMemo, useState } from 'react';
import { Itinerary } from '@/components/molecules/Itinerary';
import { InfoCard } from '@/components/molecules/InfoCard';
import { Typography } from '@/components/atoms/Typography';
import { PriceCard } from '@/components/molecules/PriceCard';
import { DriverCard } from '@/components/molecules/DriverCard';
import { GreenCard } from '@/components/molecules/GreenCard';
import { Button } from '@/components/molecules/Button';
import { LoginModal } from '@/components/organisms/LoginModal';
import { ConfirmBookingModal } from '@/components/organisms/ConfirmBookingModal';
import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LoginSchemaType, RegisterSchemaType } from '@/schemas/auth';
import { useAuthContext } from '@/contexts/auth';
import { isCarGreen } from '@/utils/car';
import { useParams, useSearchParams } from 'next/navigation';
import { useBookRide, useEndRide, useGetRideDetails, useStartRide } from '@/api/hooks/useUserAPI';
import { RideStatus } from '@/api/lib/user';
import {
  getDriverAction,
  getPassengerAction,
  getPublicAction,
  rideApiToDriverCard,
  rideApiToInfoCard,
  rideApiToItinerary
} from '@/app/rides/[id]/utils';
import { AddReviewCard } from '@/components/organisms/AddReviewCard';

export default function Rides() {
  const { saveToken, isLogged, user } = useAuthContext();
  const searchParams = useSearchParams();
  const reviewParams = searchParams.get('review');
  const { id: rideId } = useParams<{ id: string }>();

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [confirmBookingModalOpen, setConfirmBookingModalOpen] = useState<boolean>(false);

  const { data: ride, refetch: refetchRide } = useGetRideDetails(rideId);
  const startRide = useStartRide({});
  const endRide = useEndRide({});

  const bookRide = useBookRide({
    onSuccess: () => {
      refetchRide();
    }
  });

  const isGreen = ride ? isCarGreen(ride.car) : false;
  const isSeatAvailable = ride ? ride.car.seats - (ride.reservedSeats ?? 0) > 0 : false;
  const isUserTheDriver = isLogged && !!user && user.id === ride?.driver.id;
  const isUserPassenger = isLogged && !!user && !!user.id && !!ride?.passengerIds.includes(user.id);

  const isAddReviewVisible = useMemo(() => {
    const isPassengerAddReview = ride?.status === RideStatus.COMPLETED && isUserPassenger && reviewParams === 'true';
    const isLoggedOutAddReview = ride?.status === RideStatus.COMPLETED && !isLogged && !user && reviewParams === 'true';
    return isPassengerAddReview || isLoggedOutAddReview;
  }, [ride?.status, isUserPassenger, reviewParams, isLogged, user]);

  const canStartRide = useMemo(() => {
    if (!ride?.departureDate) {
      return false;
    }

    if (ride?.status !== RideStatus.UPCOMING) {
      return false;
    }

    const departureTime = new Date(ride.departureDate).getTime();
    const now = Date.now();

    return now >= departureTime - 60 * 60 * 1000 && now < departureTime;
  }, [ride?.departureDate, ride?.status]);

  const canEndRide = useMemo(() => {
    return ride?.status === RideStatus.ONGOING;
  }, [ride?.status]);

  const itineraryData = useMemo(() => {
    if (ride) {
      return rideApiToItinerary(ride);
    } else {
      return undefined;
    }
  }, [ride]);

  const infoData = useMemo(() => {
    if (ride) {
      return rideApiToInfoCard(ride);
    } else {
      return undefined;
    }
  }, [ride]);

  const driverData = useMemo(() => {
    if (ride) {
      return rideApiToDriverCard(ride);
    } else {
      return undefined;
    }
  }, [ride]);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openConfirmBookingModal = () => {
    setConfirmBookingModalOpen(true);
  };

  const closeConfirmBookingModal = () => {
    setConfirmBookingModalOpen(false);
  };

  const onBookClick = () => {
    if (isLogged) {
      openConfirmBookingModal();
    } else {
      openLoginModal();
    }
  };

  const onStartRide = () => {
    if (ride?.id) {
      startRide.mutate(ride.id);
    }
  };

  const onEndRide = () => {
    if (ride?.id) {
      endRide.mutate(ride.id);
    }
  };

  const onConfirmBooking = () => {
    bookRide.mutate(rideId);
    console.log('Booking confirmed');
  };

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      saveToken(data.accessToken, data.refreshToken);
      closeLoginModal();
    }
  });

  const registerMutation = useRegisterMutation({
    onSuccess: (_data, variables) => {
      const loginData = {
        email: variables.email,
        password: variables.password
      };
      loginMutation.mutate(loginData);
    }
  });

  const onLogin = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterSchemaType) => {
    registerMutation.mutate(data);
  };

  const onAddReview = (rating: number, review: string) => {
    console.log('🚀 ~ review:', review);
    console.log('🚀 ~ rating:', rating);
  };

  const renderAction = useMemo(() => {
    if (!ride?.status) {
      return;
    }
    if (isUserTheDriver) {
      return getDriverAction({ status: ride.status, canEndRide, canStartRide, onEndRide, onStartRide });
    } else if (isUserPassenger) {
      return getPassengerAction(ride.status);
    } else {
      const bookComponent = (
        <Button disabled={!isSeatAvailable} onClick={onBookClick}>
          Réserver
        </Button>
      );
      return getPublicAction({ bookComponent, status: ride.status });
    }
  }, [isUserTheDriver, canStartRide, canEndRide, ride?.status, isSeatAvailable, onEndRide, onBookClick, onStartRide]);

  if (!ride) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre itinéraire</Typography>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 grid-cols-[3fr_1fr]">
            <div className="flex flex-col gap-4">
              {isGreen && <GreenCard />}
              {itineraryData && <Itinerary {...itineraryData} />}
              {driverData && <DriverCard {...driverData} />}
              {isAddReviewVisible && <AddReviewCard onSubmit={onAddReview} onLoginClick={openLoginModal} isLogged={isLogged && !!user} />}
            </div>
            <div className="flex flex-col gap-4">
              {infoData && <InfoCard {...infoData} />}
              <PriceCard price={ride.price} />
              {renderAction}
            </div>
          </div>
        </div>
      </SectionContainer>
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} onLogin={onLogin} onRegister={onRegister} />
      <ConfirmBookingModal
        isOpen={confirmBookingModalOpen}
        onClose={closeConfirmBookingModal}
        price={ride.price}
        onValidate={onConfirmBooking}
      />
    </>
  );
}
