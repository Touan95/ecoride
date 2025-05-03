'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Typography } from '@/components/atoms/Typography';
import { useAuthContext } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApproveReview, useGetReviewsToApprove } from '@/api/hooks/useUserAPI';
import { StaffReviewList } from '@/components/organisms/StaffReviewList';
import { useRouter } from 'next/navigation';
import clsxm from '@/utils/clsxm';

export default function StaffPageClient() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { data: reviewsData } = useGetReviewsToApprove();
  const approveReview = useApproveReview({});
  const allReviews = reviewsData ? reviewsData.reviews : [];
  const reviewsToApprove = allReviews.filter((review) => !review.dispute);
  const reviewsInDispute = allReviews.filter((review) => review.dispute);
  const isStaff = !!user?.isStaff;

  const onRideDetailClick = (rideId: string) => () => {
    router.push(`/rides/${rideId}`);
  };

  const onDisputeDetailClick = (reviewId: string) => () => {
    router.push(`/staff/disputes/${reviewId}`);
  };

  const onApproveReview = (id: string) => () => {
    approveReview.mutate(id);
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
            <StaffReviewList reviews={reviewsToApprove} onApproveClick={onApproveReview} onDetailClick={onRideDetailClick} />
          </TabsContent>
          <TabsContent value="dispute">
            <StaffReviewList reviews={reviewsInDispute} onDetailClick={onDisputeDetailClick} dispute />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </>
  );
}
