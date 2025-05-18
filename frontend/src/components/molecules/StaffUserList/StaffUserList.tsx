import 'dayjs/locale/fr';
import { User } from '@/interfaces/user';
import { UserCard } from '../UserCard';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '../Button';
import { TbUserPlus } from 'react-icons/tb';

export interface StaffUserListProps {
  allStaff: User[];
  onBlockUser: (id: string) => () => void;
  onUnblockUser: (id: string) => () => void;
  onAddStaff: () => void;
}

export const StaffUserList = ({ allStaff, onBlockUser, onUnblockUser, onAddStaff }: StaffUserListProps) => {
  const blockedStaff = allStaff.filter((staff) => staff.isBlocked);
  const unblockedStaff = allStaff.filter((staff) => !staff.isBlocked);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-10 gap-5">
        <div className="h-10 flex items-center justify-center relative">
          <Typography variant="cardTitle" align="center">
            {"Membres de l'équipe EcoRide"}
          </Typography>
          <Button onClick={onAddStaff} className="absolute right-5">
            <TbUserPlus />
          </Button>
        </div>
        {unblockedStaff.length > 0 ? (
          <div className="flex flex-col gap-3">
            {unblockedStaff.map((staff) => {
              return (
                <UserCard
                  key={staff.id}
                  username={staff.username}
                  email={staff.email}
                  isBlocked={staff.isBlocked}
                  onBlockUser={onBlockUser(staff.id)}
                  onUnblockUser={onUnblockUser(staff.id)}
                  isInvitationPending={staff.isInvitationPending}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Typography variant="cardTitleSm" align="center" customClassName="py-10">
              {"Aucun membre actif dans l'équipe EcoRide pour l'instant"}
            </Typography>
            <Button onClick={onAddStaff} className="w-fit">
              Ajouter un membre
            </Button>
          </div>
        )}
      </div>
      {blockedStaff.length > 0 && (
        <div className="border-t border-primary-900 pt-10 gap-5 flex flex-col">
          <Typography variant="cardTitle" align="center">
            Membre(s) bloqué(s)
          </Typography>
          <div className="flex flex-col gap-3">
            {blockedStaff.map((staff) => {
              return (
                <UserCard
                  key={staff.id}
                  username={staff.username}
                  email={staff.email}
                  isBlocked={staff.isBlocked}
                  onBlockUser={onBlockUser(staff.id)}
                  onUnblockUser={onUnblockUser(staff.id)}
                  isInvitationPending={staff.isInvitationPending}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
