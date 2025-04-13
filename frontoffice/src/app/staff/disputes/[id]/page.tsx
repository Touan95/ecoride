'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { useMemo, useState } from 'react';
import { Itinerary } from '@/components/molecules/Itinerary';
import { InfoCard } from '@/components/molecules/InfoCard';
import { Typography } from '@/components/atoms/Typography';
import { PriceCard } from '@/components/molecules/PriceCard';
import { GreenCard } from '@/components/molecules/GreenCard';
import { isCarGreen } from '@/utils/car';
import { useParams } from 'next/navigation';
import { useGetOneReview, useGetOneUser, useGetRideDetails, useResolveDispute } from '@/api/hooks/useUserAPI';
import { rideApiToInfoCard, rideApiToItinerary } from '@/app/rides/[id]/utils';
import { DisputeDetails } from '@/components/molecules/DisputeDetails';
import { DisputeResolutionModal } from '@/components/organisms/DisputeResolutionModal';
import { Button } from '@/components/molecules/Button';
import { DisputeResolutionActionFormSchemaType } from '@/schemas/staff';
import { DisputeCreditAction, DisputeReviewAction } from '@/interfaces/review';
import { useQueryClient } from 'react-query';

export default function Disputes() {
  const queryClient = useQueryClient();
  const { id: reviewId } = useParams<{ id: string }>();

  const { data: review } = useGetOneReview(reviewId);
  const { data: ride } = useGetRideDetails(review?.rideId);
  const { data: passenger } = useGetOneUser(review?.userId);
  const resolveDispute = useResolveDispute({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ride', ride?.id] });
      queryClient.invalidateQueries({ queryKey: ['user', driver?.id] });
    }
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const driver = ride?.driver;

  const isGreen = ride ? isCarGreen(ride.car) : false;

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onValidate = (params: DisputeResolutionActionFormSchemaType) => {
    const approveReview = params.review === DisputeReviewAction.VALIDATE_REVIEW;
    const refundPassenger = params.credits === DisputeCreditAction.REFUND_PASSENGER;
    resolveDispute.mutate({
      reviewId,
      approveReview,
      refundPassenger
    });
  };

  if (!review) {
    return null;
  }

  if (!ride) {
    return null;
  }

  if (!driver) {
    return null;
  }

  if (!passenger) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title" align="center">
          Litige à arbitrer
        </Typography>
        <div className="flex flex-col gap-4">
          <Typography variant="cardTitle">{`Détail du trajet (${ride.id})`}</Typography>
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 grid-cols-[3fr_1fr]">
              <div className="flex flex-col gap-4">
                {isGreen && <GreenCard />}
                {itineraryData && <Itinerary {...itineraryData} />}
                <DisputeDetails review={review} passenger={passenger} driver={driver} />
              </div>
              <div className="flex flex-col gap-4">
                {infoData && <InfoCard {...infoData} />}
                <PriceCard price={ride.price} />
                <Button onClick={openModal}>Arbitrer</Button>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <DisputeResolutionModal isOpen={isModalOpen} onClose={closeModal} onValidate={onValidate} />
    </>
  );
}
