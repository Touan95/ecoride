'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Typography } from '@/components/atoms/Typography';
import { useAuthContext } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApproveReview, useGetReviewsToApprove } from '@/api/hooks/useUserAPI';
import { StaffReviewList } from '@/components/organisms/StaffReviewList';
import { useRouter } from 'next/navigation';
import clsxm from '@/utils/clsxm';
import { ROUTES } from '@/configs/routes';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function StaffPageClient() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { data: reviewsData } = useGetReviewsToApprove({ disabled: !user?.isStaff });
  const approveReview = useApproveReview({
    onSuccess: (data) => {
      toast.success(data.message);
      closeConfirmationModal();
    }
  });
  const allReviews = reviewsData ? reviewsData.reviews : [];
  const reviewsToApprove = allReviews.filter((review) => !review.dispute);
  const reviewsInDispute = allReviews.filter((review) => review.dispute);
  const isStaff = !!user?.isStaff;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [reviewIdToApprove, setReviewIdToApprove] = useState<string | undefined>(undefined);

  const onRideDetailClick = (rideId: string) => () => {
    router.push(`${ROUTES.RIDES}/${rideId}`);
  };

  const onDisputeDetailClick = (reviewId: string) => () => {
    router.push(`${ROUTES.STAFF_DISPUTE_DETAIL}/${reviewId}`);
  };

  const onApproveReview = () => {
    if (reviewIdToApprove) {
      approveReview.mutate(reviewIdToApprove);
    }
  };

  const openConfirmationModal = (id: string) => () => {
    setReviewIdToApprove(id);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  if (!isStaff) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Espace employé</Typography>
        <Tabs defaultValue="reviews" className="w-full gap-5">
          <TabsList className={clsxm('grid w-full gap-4 grid-cols-2')}>
            <TabsTrigger value="reviews">
              <Typography variant="cardTitle">Avis à valider</Typography>
            </TabsTrigger>
            <TabsTrigger value="dispute">
              <Typography variant="cardTitle">Litiges en cours</Typography>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews">
            <StaffReviewList reviews={reviewsToApprove} onApproveClick={openConfirmationModal} onDetailClick={onRideDetailClick} />
          </TabsContent>
          <TabsContent value="dispute">
            <StaffReviewList reviews={reviewsInDispute} onDetailClick={onDisputeDetailClick} dispute />
          </TabsContent>
        </Tabs>
      </SectionContainer>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        onValidate={onApproveReview}
        onCancel={closeConfirmationModal}
        title="Avis à valider"
        content="Voulez-vous vraiment valider cet avis ?"
      />
    </>
  );
}
