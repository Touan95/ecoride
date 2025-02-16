import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import { UserType } from '@/interfaces/user';
import { UserTypeForm } from '../UserTypeForm';

export interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onValidate: () => void;
  userId: string
}


export const UserTypeModal = ({ isOpen, onClose, userType, onValidate, userId }: UserTypeModalProps) => {
  const onValidateClick = () => {
    onValidate();
    onClose();
  };
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <div>
          <Typography variant="cardTitle" tag="p" customClassName="mb-5">
            Votre profil utilisateur
          </Typography>
          <UserTypeForm initialValue={userType} userId={userId} onValidate={onValidateClick}/>
        </div>
      </ContentContainer>
    </BaseModal>
  );
};
