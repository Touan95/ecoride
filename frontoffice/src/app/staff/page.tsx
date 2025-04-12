'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Typography } from '@/components/atoms/Typography';
import { useAuthContext } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApproveReview, useGetReviewsToApprove, useGetStatistics, useGiveStaffAccess } from '@/api/hooks/useUserAPI';
import { StaffReviewList } from '@/components/organisms/StaffReviewList';
import { useRouter } from 'next/navigation';
import clsxm from '@/utils/clsxm';
import { Button } from '@/components/molecules/Button';
import { LogOrRegisterModal } from '@/components/organisms/LoginModal';
import { useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { useState } from 'react';
import { RegisterSchemaType } from '@/schemas/auth';
import { StaffAccessModal } from '@/components/organisms/StaffAccessModal';
import { AdminCharts } from '@/components/molecules/AdminCharts';

export default function Staff() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { data: reviewsData } = useGetReviewsToApprove();
  const approveReview = useApproveReview({});
  const { data: statistics } = useGetStatistics(user?.isAdmin);
  const allReviews = reviewsData ? reviewsData.reviews : [];
  const reviewsToApprove = allReviews.filter((review) => !review.dispute);
  const reviewsInDispute = allReviews.filter((review) => review.dispute);
  const isAdmin = !!user?.isAdmin;
  const isStaff = !!user?.isStaff;

  const [createStaffModalOpen, setCreateStaffModalOpen] = useState(false);
  const [giveStaffAccessEmail, setGiveStaffAccessEmail] = useState<string | undefined>(undefined);

  const onRideDetailClick = (rideId: string) => () => {
    router.push(`/rides/${rideId}`);
  };

  const onDisputeDetailClick = (reviewId: string) => () => {
    router.push(`/staff/disputes/${reviewId}`);
  };

  const onApproveReview = (id: string) => () => {
    approveReview.mutate(id);
  };

  const giveStaffAccess = useGiveStaffAccess({
    onSuccess: () => {
      setGiveStaffAccessEmail(undefined);
      setCreateStaffModalOpen(false);
    }
  });

  const registerMutation = useRegisterMutation({
    onSuccess: () => {
      setCreateStaffModalOpen(false);
    },
    onError: (error, params) => {
      if (error.code === 'user-email-already-exists') {
        setGiveStaffAccessEmail(params.email);
      }
    }
  });

  const onRegister = (data: RegisterSchemaType) => {
    registerMutation.mutate({ ...data, isStaff: true });
  };

  const onGiveStaffAccess = () => {
    if (giveStaffAccessEmail) {
      giveStaffAccess.mutate(giveStaffAccessEmail);
    }
  };

  const openCreateStaffModal = () => {
    setCreateStaffModalOpen(true);
  };

  const closeCreateStaffModal = () => {
    setCreateStaffModalOpen(false);
  };

  const closeGiveStaffAccessModal = () => {
    setGiveStaffAccessEmail(undefined);
  };

  if (!isStaff) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <div className="flex justify-between items-center">
          <Typography variant="title">Espace employé</Typography>
          {isAdmin && <Button onClick={openCreateStaffModal}>Ajouter un membre</Button>}
        </div>
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
            <StaffReviewList reviews={reviewsToApprove} onApproveClick={onApproveReview} onDetailClick={onRideDetailClick} />
          </TabsContent>
          <TabsContent value="dispute">
            <StaffReviewList reviews={reviewsInDispute} onDetailClick={onDisputeDetailClick} dispute />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="admin">
              <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-10'])}>
                <Typography variant="title" color="primary" align="center">
                  EcoRide Charts
                </Typography>
                <div>
                  <Typography variant="cardTitle" color="primary">
                    {"Depuis la création de l'application :"}
                  </Typography>
                  <div>
                    <Typography variant="cardTitleSm" color="primary">
                      {`${statistics?.totalRides} trajets en covoiturages ont été réalisés`}
                    </Typography>
                    <Typography variant="cardTitleSm" color="primary">
                      {`${statistics?.totalCredits} crédits ont été générés pour la plateforme`}
                    </Typography>
                  </div>
                </div>
                {statistics ? (
                  <AdminCharts data={statistics.dailyStatistics} />
                ) : (
                  <Typography variant="cardTitleSm" align="center">
                    {`Il n'y a pas de données pour le moment`}
                  </Typography>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </SectionContainer>
      <LogOrRegisterModal
        isOpen={createStaffModalOpen}
        onClose={closeCreateStaffModal}
        onRegister={onRegister}
        registerTitle="Ajouter un membre à l'équipe"
        registerButtonTitle="Ajouter"
      />
      {giveStaffAccessEmail && (
        <StaffAccessModal
          isOpen={!!giveStaffAccessEmail}
          onClose={closeGiveStaffAccessModal}
          onValidate={onGiveStaffAccess}
          email={giveStaffAccessEmail}
        />
      )}
    </>
  );
}
