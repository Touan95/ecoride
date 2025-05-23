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
import { LogOrRegisterModal } from '@/components/organisms/LoginModal';
import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { useAuthContext } from '@/contexts/auth';
import { isCarGreen } from '@/utils/car';
import { useParams, useSearchParams } from 'next/navigation';
import { useAddReview, useBookRide, useEndRide, useGetRideDetails, useGetRideReviews, useStartRide } from '@/api/hooks/useUserAPI';
import { RideStatus } from '@/api/lib/user';
import {
  getDriverAction,
  getPassengerAction,
  getPublicAction,
  rideApiToDriverCard,
  rideApiToInfoCard,
  rideApiToItinerary
} from '@/app/trajets/[id]/utils';
import { AddReviewCard } from '@/components/organisms/AddReviewCard';
import { LoginParams, RegisterParams } from '@/api/lib/auth';
import { ConfirmBookingModal } from '@/components/organisms/ConfirmBookingModal';
import toast from 'react-hot-toast';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';

export default function RideDetailsPageClient() {
  const { saveToken, user } = useAuthContext();
  const searchParams = useSearchParams();
  const reviewParams = searchParams.get('review');
  const { id: rideId } = useParams<{ id: string }>();

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [confirmBookingModalOpen, setConfirmBookingModalOpen] = useState<boolean>(false);
  const [driverConfirmationModalMode, setDriverConfirmationModalMode] = useState<'start' | 'end' | undefined>(undefined);

  const { data: ride, refetch: refetchRide } = useGetRideDetails(rideId);
  const { data: reviewsData } = useGetRideReviews({ rideId, approvedOnly: true });
  const approvedReviews = reviewsData ? reviewsData.reviews : [];
  const allReviewerIds = reviewsData ? reviewsData.allReviewerIds : [];
  const startRide = useStartRide({
    onSuccess: (data) => {
      toast.success(data.message);
      closeDriverConfirmationModal();
    }
  });
  const endRide = useEndRide({
    onSuccess: (data) => {
      toast.success(data.message);
      closeDriverConfirmationModal();
    }
  });
  const addReview = useAddReview({
    onSuccess: (data) => {
      toast.success(data.message);
    }
  });

  const bookRide = useBookRide({
    onSuccess: (data) => {
      toast.success(data.message);
      refetchRide();
    }
  });

  const isGreen = ride ? isCarGreen(ride.car) : false;
  const isSeatAvailable = ride ? ride.car.seats - (ride.reservedSeats ?? 0) > 0 : false;
  const isUserTheDriver = !!user && user.id === ride?.driver.id;
  const isUserPassenger = !!user && !!user.id && !!ride?.passengerIds.includes(user.id);
  const hasAlreadyReviewed = isUserPassenger && !!allReviewerIds.find((id) => id === user.id);

  const isAddReviewVisible = useMemo(() => {
    const isPassengerAddReview = ride?.status === RideStatus.COMPLETED && isUserPassenger;
    const isLoggedOutAddReview = ride?.status === RideStatus.COMPLETED && !user && reviewParams === 'true';
    return isPassengerAddReview || isLoggedOutAddReview;
  }, [ride?.status, isUserPassenger, reviewParams, user]);

  const isNotPassengerAddReview = ride?.status === RideStatus.COMPLETED && !!user && !isUserPassenger && reviewParams === 'true';

  const canStartRide = useMemo(() => {
    if (!ride?.departureDate) {
      return false;
    }

    if (ride?.status !== RideStatus.UPCOMING) {
      return false;
    }

    const departureTime = new Date(ride.departureDate).getTime();
    const now = Date.now();

    return now >= departureTime - 60 * 60 * 1000;
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
      return rideApiToDriverCard(ride, approvedReviews);
    } else {
      return undefined;
    }
  }, [ride, approvedReviews]);

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
    if (user) {
      openConfirmBookingModal();
    } else {
      openLoginModal();
    }
  };

  const openDriverConfirmationModal = (mode: 'start' | 'end') => {
    setDriverConfirmationModalMode(mode);
  };

  const closeDriverConfirmationModal = () => {
    setDriverConfirmationModalMode(undefined);
  };

  const onValidateDriverConfirmation = () => {
    if (driverConfirmationModalMode && ride?.id) {
      switch (driverConfirmationModalMode) {
        case 'start':
          startRide.mutate(ride.id);
          break;
        case 'end':
          endRide.mutate(ride.id);
          break;
      }
    }
  };

  const onConfirmBooking = (emailShareAccepted: boolean) => {
    bookRide.mutate({ rideId, emailShareAccepted });
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

  const onLogin = (data: LoginParams) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: Omit<RegisterParams, 'isStaff' | 'isInvitationPending'>) => {
    registerMutation.mutate({ ...data, isStaff: false });
  };

  const onAddReview = (rating: number, comment: string, dispute: boolean) => {
    addReview.mutate({ comment, rating, rideId, dispute });
  };

  const renderAction = useMemo(() => {
    if (!ride?.status) {
      return;
    }
    if (isUserTheDriver) {
      return getDriverAction({
        status: ride.status,
        canEndRide,
        canStartRide,
        onEndRide: () => openDriverConfirmationModal('end'),
        onStartRide: () => openDriverConfirmationModal('start')
      });
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
  }, [isUserTheDriver, canStartRide, canEndRide, ride?.status, isSeatAvailable, onBookClick]);

  if (!ride) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Votre itinéraire</Typography>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-[3fr_1fr] grid-cols-1">
            <div className="flex flex-col gap-4">
              {isGreen && <GreenCard />}
              {itineraryData && <Itinerary {...itineraryData} />}
              {driverData && <DriverCard {...driverData} />}
              {isAddReviewVisible && (
                <AddReviewCard
                  onSubmit={onAddReview}
                  onLoginClick={openLoginModal}
                  isLogged={!!user}
                  hasAlreadyReviewed={hasAlreadyReviewed}
                />
              )}
              {isNotPassengerAddReview && (
                <Typography variant="cardTitleSm">
                  {"Vous ne pouvez pas laisser d'avis car vous n'avez pas participé à ce trajet."}
                </Typography>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {infoData && <InfoCard {...infoData} />}
              <PriceCard price={ride.price} />
              {renderAction}
            </div>
          </div>
        </div>
      </SectionContainer>
      <LogOrRegisterModal isOpen={loginModalOpen} onClose={closeLoginModal} onLogin={onLogin} onRegister={onRegister} />
      <ConfirmBookingModal
        isOpen={confirmBookingModalOpen}
        onClose={closeConfirmBookingModal}
        price={ride.price}
        onValidate={onConfirmBooking}
      />
      <ConfirmationModal
        isOpen={!!driverConfirmationModalMode}
        onClose={closeDriverConfirmationModal}
        onValidate={onValidateDriverConfirmation}
        onCancel={closeDriverConfirmationModal}
        title={driverConfirmationModalMode === 'start' ? 'Démarrage du trajet' : 'Arrivée à destination'}
        content={
          driverConfirmationModalMode === 'start'
            ? 'Voulez-vous vraiment démarrer ce trajet ?'
            : 'Voulez-vous vraiment marquer ce trajet comme terminé ?'
        }
      />
    </>
  );
}
