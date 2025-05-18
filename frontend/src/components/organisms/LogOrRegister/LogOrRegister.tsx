import { useState } from 'react';
import { RegisterForm } from '../RegisterForm';
import { LoginForm } from '../LoginForm';
import { LoginParams, RegisterParams } from '@/api/lib/auth';
import { HTMLTag } from '@/components/atoms/Typography/interface';

export interface LogOrRegisterProps {
  onLogin?: (params: LoginParams) => void;
  onRegister?: (params: Omit<RegisterParams, 'isStaff' | 'isInvitationPending'>) => void;
  registerTitle?: string;
  registerButtonTitle?: string;
  loginTitle?: string;
  loginButtonTitle?: string;
  titleTag?: HTMLTag;
  adminInvitation?: boolean;
}

export const LogOrRegister = ({
  onLogin,
  onRegister,
  registerTitle,
  registerButtonTitle,
  loginTitle,
  loginButtonTitle,
  titleTag,
  adminInvitation = false
}: LogOrRegisterProps) => {
  const loginAvailable = !!onLogin;
  const registerAvailable = !!onRegister;
  const [registerMode, setRegisterMode] = useState(!loginAvailable && registerAvailable ? true : false);

  const showRegisterForm = () => {
    setRegisterMode(true);
  };

  const closeRegisterForm = () => {
    setRegisterMode(false);
  };
  return (
    <div>
      {registerMode
        ? onRegister && (
            <RegisterForm
              onRegister={onRegister}
              onLoginClick={loginAvailable ? closeRegisterForm : undefined}
              title={registerTitle}
              buttonTitle={registerButtonTitle}
              titleTag={titleTag}
              adminInvitation={adminInvitation}
            />
          )
        : onLogin && (
            <LoginForm
              onLogin={onLogin}
              onCreateAccountClick={registerAvailable ? showRegisterForm : undefined}
              title={loginTitle}
              buttonTitle={loginButtonTitle}
              titleTag={titleTag}
            />
          )}
    </div>
  );
};
