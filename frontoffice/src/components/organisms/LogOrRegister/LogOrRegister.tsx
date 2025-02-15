import { useState } from 'react';
import { RegisterForm } from '../RegisterForm';
import { LoginForm } from '../LoginForm';

export interface LogOrRegisterProps {
  onLogin: ({ email, password }: { email: string; password: string }) => void;
  onRegister: ({ username, email, password }: { username: string; email: string; password: string }) => void;
}

export const LogOrRegister = ({ onLogin, onRegister }: LogOrRegisterProps) => {
  const [registerMode, setRegisterMode] = useState(false);

  const showRegisterForm = () => {
    setRegisterMode(true);
  };

  const closeRegisterForm = () => {
    setRegisterMode(false);
  };
  return (
    <div>
      {registerMode ? (
        <RegisterForm onRegister={onRegister} onLoginClick={closeRegisterForm} />
      ) : (
        <LoginForm onLogin={onLogin} onCreateAccountClick={showRegisterForm} />
      )}
    </div>
  );
};
