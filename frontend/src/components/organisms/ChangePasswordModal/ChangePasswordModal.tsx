import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { ChangePasswordForm } from '../ChangePasswordForm';

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const onValidateClick = () => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <ChangePasswordForm onSuccess={onValidateClick} />
      </ContentContainer>
    </BaseModal>
  );
};
