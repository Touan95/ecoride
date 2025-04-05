'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Typography } from '@/components/atoms/Typography';
import { useAuthContext } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApproveReview, useGetReviewsToApprove } from '@/api/hooks/useUserAPI';
import { StaffReviewList } from '@/components/organisms/StaffReviewList';
import { useRouter } from 'next/navigation';
import clsxm from '@/utils/clsxm';

export default function Staff() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { data: reviewsData } = useGetReviewsToApprove();
  const approveReview = useApproveReview({});
  const reviewsToApprove = reviewsData ? reviewsData.reviews : [];
  const isAdmin = !!user?.isAdmin;
  const isStaff = !!user?.isStaff;

  const onDetailClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const onApproveReview = (id: string) => () => {
    approveReview.mutate(id);
    // cancelPassengerRide.mutate(id);
  };

  if (!isStaff) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Espace employé</Typography>
        <Tabs defaultValue="reviews" className="w-full gap-5">
          <TabsList className={clsxm('grid w-full gap-4', isAdmin ? 'grid-cols-3' : 'grid-cols-2')}>
            <TabsTrigger value="reviews">
              <Typography variant="cardTitle">Avis à valider</Typography>
            </TabsTrigger>
            <TabsTrigger value="dispute">
              <Typography variant="cardTitle">Litiges en cours</Typography>
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin">
                <Typography variant="cardTitle">Espace administrateur</Typography>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="reviews">
            <StaffReviewList reviews={reviewsToApprove} onApproveClick={onApproveReview} onDetailClick={onDetailClick} />
          </TabsContent>
          {<TabsContent value="dispute"></TabsContent>}
          {<TabsContent value="admin"></TabsContent>}
        </Tabs>
      </SectionContainer>
    </>
  );
}
