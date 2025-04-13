import 'dayjs/locale/fr';
import { User } from '@/interfaces/user';
import { UserCard } from '../UserCard';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '../Button';
import { TbSearch } from 'react-icons/tb';

export interface BlockedUserListProps {
  blockedUsers: User[];
  onUnblockUser: (id: string) => () => void;
  onSearchUser: () => void;
}

export const BlockedUserList = ({ blockedUsers, onUnblockUser, onSearchUser }: BlockedUserListProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-10 gap-5">
        <div className="h-10 flex items-center justify-center relative">
          <Typography variant="cardTitle" align="center">
            Liste des utilisateurs bloqués
          </Typography>
          <Button onClick={onSearchUser} className="absolute right-5">
            <TbSearch />
          </Button>
        </div>
        {blockedUsers.length > 0 ? (
          <div className="flex flex-col gap-3">
            {blockedUsers.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  username={user.username}
                  email={user.email}
                  isBlocked={user.isBlocked}
                  onUnblockUser={onUnblockUser(user.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Typography variant="cardTitleSm" align="center" customClassName="py-10">
              {'Aucun utilisateur bloqué'}
            </Typography>
            <Button onClick={onSearchUser} className="w-fit">
              Chercher un utilisateur
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
