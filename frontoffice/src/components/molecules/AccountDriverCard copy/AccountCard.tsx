import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import {  UserType } from '@/interfaces/user';
import Image from 'next/image';
import { AccountCardField } from '../AccountCardField';
import { getUserTypeLabel } from '@/utils/values';

export interface AccountCardProps {
  username: string;
  email: string;
  avatarUrl: string | null;
  type: UserType;
  onUsernameEdit?: () => void
  onEmailEdit?: () => void
  onUserTypeEdit?: () => void
}


export const AccountCard = ({
    username,
    email,
    avatarUrl,
    type,
    onUsernameEdit,
    onEmailEdit,
    onUserTypeEdit,
 }: AccountCardProps) => {

  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-3 items-center'])}>
      <Typography align="center" variant="cardTitle" color="primary">
        Vos informations
      </Typography>
      <div className='flex gap-5 items-center'>
        {avatarUrl && <Image src={avatarUrl} height={80} width={80} className="rounded-full w-20" alt={`${username}-avatar-image`} />}
        <div className='flex flex-col'>
          <AccountCardField labelClassname='w-30' onEdit={onUsernameEdit} label='Pseudonyme'>{username}</AccountCardField>
          <AccountCardField labelClassname='w-30' onEdit={onEmailEdit} label='Adresse email'>{email}</AccountCardField>
          <AccountCardField labelClassname='w-30' onEdit={onUserTypeEdit} label='Profil'>{getUserTypeLabel(type)}</AccountCardField>
        </div>
      </div>
    </div>
  );
};
