import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { AccountCardField } from '../AccountCardField';
import { Button } from '../Button';

export interface UserCardProps {
  username: string;
  email: string;
  isBlocked?: boolean;
  onBlockUser?: () => void;
  onUnblockUser?: () => void;
}

export const UserCard = ({ username, email, isBlocked, onBlockUser, onUnblockUser }: UserCardProps) => {
  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-100 gap-3', isBlocked && 'bg-secondary-50'])}>
      <div className={clsxm('flex gap-5 items-center')}>
        <div className="flex flex-col w-full">
          <AccountCardField labelClassname="w-30" label="Pseudonyme">
            {username}
          </AccountCardField>
          <AccountCardField labelClassname="w-30" label="Adresse email">
            {email}
          </AccountCardField>
        </div>
        <Button onClick={isBlocked ? onUnblockUser : onBlockUser} className="w-30">
          {isBlocked ? 'Débloquer' : 'Bloquer'}
        </Button>
      </div>
    </div>
  );
};
