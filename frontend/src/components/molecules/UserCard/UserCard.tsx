import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { AccountCardField } from '../AccountCardField';
import { Button } from '../Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TbClock } from 'react-icons/tb';

export interface UserCardProps {
  username: string;
  email: string;
  isBlocked?: boolean;
  onBlockUser?: () => void;
  onUnblockUser?: () => void;
  isInvitationPending?: boolean;
}

export const UserCard = ({ username, email, isBlocked, onBlockUser, onUnblockUser, isInvitationPending }: UserCardProps) => {
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
        {isInvitationPending && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger aria-label={'Invitation en attente'}>
                <TbClock size={30} className="text-primary-900" />
              </TooltipTrigger>
              <TooltipContent className={clsxm(['shadow bg-primary-50'])}>{'Invitation en attente'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Button onClick={isBlocked ? onUnblockUser : onBlockUser} className="w-30">
          {isBlocked ? 'Débloquer' : 'Bloquer'}
        </Button>
      </div>
    </div>
  );
};
