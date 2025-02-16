import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import {  UserType } from '@/interfaces/user';
import { getUserTypeLabel } from '@/utils/userType';
import Image from 'next/image';
import { TbEdit } from 'react-icons/tb';

export interface AccountCardProps {
  username: string;
  email: string;
  avatarUrl: string | null;
  type: UserType;
  onUsernameEdit?: () => void
  onEmailEdit?: () => void
  onUserTypeEdit?: () => void
}

export interface AccountDataProps {
  label: string,
  value: string,
  onEdit?: () => void
}

const AccountData = ({label, value, onEdit} : AccountDataProps) => {
  return (
    <div className='flex h-7 gap-5 items-center content-center'>
      <Typography variant="cardTitleSm" color="primary" customClassName='w-30'>
          {label}
      </Typography>
      <div className='flex gap-1.5 items-center'>
        <div className='flex justify-center items-center w-5'>
        {onEdit && <TbEdit className='text-primary-900 cursor-pointer' size={30} onClick={onEdit}/>}
        </div>
        <Typography variant="cardTitleSm" color="primary">
          {value}
        </Typography>
      </div>
    </div>
  )
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
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-3'])}>
      <Typography align="center" variant="cardTitle" color="primary">
        Vos informations
      </Typography>
      <div className='flex gap-5 items-center'>
        {avatarUrl && <Image src={avatarUrl} height={80} width={80} className="rounded-full w-20" alt={`${username}-avatar-image`} />}
        <div className='flex flex-col'>
          <AccountData onEdit={onUsernameEdit} label='Pseudonyme' value={username} />
          <AccountData onEdit={onEmailEdit} label='Adresse email' value={email} />
          <AccountData onEdit={onUserTypeEdit} label='Profil' value={getUserTypeLabel(type)} />
        </div>
      </div>
    </div>
  );
};
