import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { LoginForm } from '../LoginForm';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: ({ email, password }: { email: string; password: string }) => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <LoginForm onLogin={onLogin} />
      </ContentContainer>
    </BaseModal>
  );
};
