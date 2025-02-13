import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { LoginForm } from '../LoginForm';
import { useState } from 'react';
import { RegisterForm } from '../RegisterForm';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: ({ email, password }: { email: string; password: string }) => void;
  onRegister: ({ username, email, password }: { username: string; email: string; password: string }) => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin, onRegister }: LoginModalProps) => {
  const [registerMode, setRegisterMode] = useState(false);

  const showRegisterForm = () => {
    setRegisterMode(true);
  };

  const closeRegisterForm = () => {
    setRegisterMode(false);
  };

  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        {registerMode ? (
          <RegisterForm onRegister={onRegister} onLoginClick={closeRegisterForm} />
        ) : (
          <LoginForm onLogin={onLogin} onCreateAccountClick={showRegisterForm} />
        )}
      </ContentContainer>
    </BaseModal>
  );
};
