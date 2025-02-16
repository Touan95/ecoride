import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import { UserType } from '@/interfaces/user';
import { UserTypeForm } from '../UserTypeForm';
import { DriverPreferencesForm } from '../DriverPreferencesForm';
import { DriverPreferencesFormSchemaType } from '@/schemas/user';

export interface DriverPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onValidate: () => void;
  userId: string
  values: DriverPreferencesFormSchemaType
}


export const DriverPreferencesModal = ({ isOpen, onClose, userType, onValidate, userId, values }: DriverPreferencesModalProps) => {
  const onValidateClick = () => {
    onValidate();
    onClose();
  };
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <div>
          <Typography variant="cardTitle" customClassName="mb-5">
            Vos préférences conducteur
          </Typography>
          <DriverPreferencesForm initialValues={values} userId={userId} onValidate={onValidateClick}/>
        </div>
      </ContentContainer>
    </BaseModal>
  );
};
