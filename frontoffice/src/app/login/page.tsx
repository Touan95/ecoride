'use client';

import { LogOrRegister } from '@/components/organisms/LogOrRegister';

export default function Login() {
  const onLogin = ({ email, password }: { email: string; password: string }) => {
    console.log('Logged in with email : ', email);
    console.log('Logged in with password : ', password);
  };

  const onRegister = ({ username, email, password }: { username: string; email: string; password: string }) => {
    console.log('Registered in with username : ', username);
    console.log('Registered in with email : ', email);
    console.log('Registered in with password : ', password);
  };

  return (
    <div>
      <LogOrRegister onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
}
