import { useState } from 'react';
import { RegisterForm } from '../RegisterForm';
import { LoginForm } from '../LoginForm';

export interface LogOrRegisterProps {
  onLogin?: ({ email, password }: { email: string; password: string }) => void;
  onRegister?: ({ username, email, password }: { username: string; email: string; password: string }) => void;
  registerTitle?: string;
  registerButtonTitle?: string;
  loginTitle?: string;
  loginButtonTitle?: string;
}

export const LogOrRegister = ({
  onLogin,
  onRegister,
  registerTitle,
  registerButtonTitle,
  loginTitle,
  loginButtonTitle
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
            />
          )
        : onLogin && (
            <LoginForm
              onLogin={onLogin}
              onCreateAccountClick={registerAvailable ? showRegisterForm : undefined}
              title={loginTitle}
              buttonTitle={loginButtonTitle}
            />
          )}
    </div>
  );
};
