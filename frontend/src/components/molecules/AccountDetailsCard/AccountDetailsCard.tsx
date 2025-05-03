import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { UserType } from '@/interfaces/user';
import Image from 'next/image';
import { AccountCardField } from '../AccountCardField';
import { getUserTypeLabel } from '@/utils/values';

export interface AccountCardProps {
  username: string;
  email: string;
  avatarUrl?: string;
  title?: string;
  notCentered?: boolean;
  type: UserType;
  onUsernameEdit?: () => void;
  onEmailEdit?: () => void;
  onUserTypeEdit?: () => void;
  onPasswordEdit?: () => void;
}

export const AccountDetailsCard = ({
  title = 'Vos informations',
  username,
  email,
  avatarUrl,
  type,
  notCentered = false,
  onUsernameEdit,
  onEmailEdit,
  onUserTypeEdit,
  onPasswordEdit
}: AccountCardProps) => {
  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-3', !notCentered && 'items-center'])}>
      <Typography align={!notCentered ? 'center' : undefined} variant="cardTitle" color="primary">
        {title}
      </Typography>
      <div className={clsxm('flex gap-5 items-center')}>
        {avatarUrl && (
          <Image src={avatarUrl} height={80} width={80} className="rounded-full w-20" alt={`Avatar de l'utilisateur ${username}`} />
        )}
        <div className="flex flex-col w-full">
          <AccountCardField labelClassname="w-30" onEdit={onUsernameEdit} label="Pseudonyme">
            {username}
          </AccountCardField>
          <AccountCardField labelClassname="w-30" onEdit={onEmailEdit} label="Adresse email">
            {email}
          </AccountCardField>
          <AccountCardField labelClassname="w-30" onEdit={onPasswordEdit} label="Mot de passe">
            ****
          </AccountCardField>
          <AccountCardField labelClassname="w-30" onEdit={onUserTypeEdit} label="Profil">
            {getUserTypeLabel(type)}
          </AccountCardField>
        </div>
      </div>
    </div>
  );
};
