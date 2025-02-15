import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { LogOrRegister } from '../LogOrRegister';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: ({ email, password }: { email: string; password: string }) => void;
  onRegister: ({ username, email, password }: { username: string; email: string; password: string }) => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin, onRegister }: LoginModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <LogOrRegister onLogin={onLogin} onRegister={onRegister} />
      </ContentContainer>
    </BaseModal>
  );
};
