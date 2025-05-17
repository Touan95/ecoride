'use client';

import SectionContainer from '@/components/layout/SectionContainer';
import { Typography } from '@/components/atoms/Typography';
import { useAuthContext } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useBlockUser,
  useGetAllStaff,
  useGetBlockedUsers,
  useGetStatistics,
  useGiveStaffAccess,
  useUnblockUser
} from '@/api/hooks/useUserAPI';
import clsxm from '@/utils/clsxm';
import { LogOrRegisterModal } from '@/components/organisms/LoginModal';
import { useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { useState } from 'react';
import { StaffAccessModal } from '@/components/organisms/StaffAccessModal';
import { AdminCharts } from '@/components/molecules/AdminCharts';
import { StaffUserList } from '@/components/molecules/StaffUserList';
import { BlockedUserList } from '@/components/molecules/BlockedUserList';
import { SearchUserModal } from '@/components/organisms/SearchUserModal';
import { RegisterParams } from '@/api/lib/auth';

export default function AdminPageClient() {
  const { user } = useAuthContext();
  const { data: statistics } = useGetStatistics({ disabled: !user?.isAdmin });
  const { data: staffData } = useGetAllStaff({ disabled: !user?.isAdmin });
  const { data: blockedUsersData } = useGetBlockedUsers({ disabled: !user?.isAdmin });
  const blockUser = useBlockUser({});
  const unblockUser = useUnblockUser({});
  const allStaff = staffData ? staffData.allStaff : [];
  const blockedUsers = blockedUsersData ? blockedUsersData.blockedUsers : [];
  const isAdmin = !!user?.isAdmin;

  const [createStaffModalOpen, setCreateStaffModalOpen] = useState(false);
  const [searchUserModalOpen, setSearchUserModalOpen] = useState(false);
  const [giveStaffAccessEmail, setGiveStaffAccessEmail] = useState<string | undefined>(undefined);

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

  const onRegister = (data: Omit<RegisterParams, 'isStaff'>) => {
    registerMutation.mutate({ ...data, isStaff: true });
  };

  const onGiveStaffAccess = () => {
    if (giveStaffAccessEmail) {
      giveStaffAccess.mutate(giveStaffAccessEmail);
    }
  };

  const onBlockUser = (id: string) => () => {
    blockUser.mutate(id);
    if (searchUserModalOpen) {
      closeSearchUserModal();
    }
  };

  const onUnblockUser = (id: string) => () => {
    unblockUser.mutate(id);
    if (searchUserModalOpen) {
      closeSearchUserModal();
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

  const openSearchUserModal = () => {
    setSearchUserModalOpen(true);
  };

  const closeSearchUserModal = () => {
    setSearchUserModalOpen(false);
  };
  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <SectionContainer className="flex flex-col gap-5 my-10">
        <Typography variant="title">Espace administrateur</Typography>

        <Tabs defaultValue="staff" className="w-full gap-5">
          <TabsList className={clsxm('grid w-full gap-4 grid-cols-3')}>
            <TabsTrigger value="staff">
              <Typography variant="cardTitle">Équipe</Typography>
            </TabsTrigger>
            <TabsTrigger value="users">
              <Typography variant="cardTitle">Utilisateurs</Typography>
            </TabsTrigger>
            <TabsTrigger value="statistics">
              <Typography variant="cardTitle">Statistiques</Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="staff">
            <StaffUserList allStaff={allStaff} onBlockUser={onBlockUser} onUnblockUser={onUnblockUser} onAddStaff={openCreateStaffModal} />
          </TabsContent>
          <TabsContent value="users">
            <BlockedUserList blockedUsers={blockedUsers} onUnblockUser={onUnblockUser} onSearchUser={openSearchUserModal} />
          </TabsContent>
          <TabsContent value="statistics">
            {statistics ? (
              <AdminCharts
                chartsData={statistics.dailyStatistics}
                totalRides={statistics.totalRides}
                totalCredits={statistics.totalCredits}
              />
            ) : (
              <Typography variant="cardTitleSm" align="center">
                {`Il n'y a pas de données pour le moment`}
              </Typography>
            )}
          </TabsContent>
        </Tabs>
      </SectionContainer>
      <LogOrRegisterModal
        isOpen={createStaffModalOpen}
        onClose={closeCreateStaffModal}
        onRegister={onRegister}
        registerTitle="Ajouter un membre à l'équipe"
        registerButtonTitle="Ajouter"
      />
      <SearchUserModal
        isOpen={searchUserModalOpen}
        onClose={closeSearchUserModal}
        onBlockUser={onBlockUser}
        onUnblockUser={onUnblockUser}
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
