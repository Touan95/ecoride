import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { LogOrRegister } from '../LogOrRegister';
import { LoginParams, RegisterParams } from '@/api/lib/auth';
export interface LogOrRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (params: LoginParams) => void;
  onRegister?: (params: Omit<RegisterParams, 'isStaff'>) => void;
  loginTitle?: string;
  loginButtonTitle?: string;
  registerTitle?: string;
  registerButtonTitle?: string;
}

export const LogOrRegisterModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  loginTitle,
  loginButtonTitle,
  registerTitle,
  registerButtonTitle
}: LogOrRegisterModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <LogOrRegister
          onLogin={onLogin}
          onRegister={onRegister}
          loginTitle={loginTitle}
          loginButtonTitle={loginButtonTitle}
          registerTitle={registerTitle}
          registerButtonTitle={registerButtonTitle}
        />
      </ContentContainer>
    </BaseModal>
  );
};
