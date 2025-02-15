'use client';

import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LogOrRegister } from '@/components/organisms/LogOrRegister';
import { apiUrl } from '@/configs/config';
import { LoginSchemaType, RegisterSchemaType } from '@/schemas/auth';
import { useQueryClient } from 'react-query';

export default function Login() {
  // const onLogin = ({ email, password }: { email: string; password: string }) => {
  //   console.log('Logged in with email : ', email);
  //   console.log('Logged in with password : ', password);
  // };

  // const onRegister = ({ username, email, password }: { username: string; email: string; password: string }) => {
  //   console.log('Registered in with username : ', username);
  //   console.log('Registered in with email : ', email);
  //   console.log('Registered in with password : ', password);
  // };

  const test = apiUrl
  console.log("🚀 ~ test:", test)

  const loginMutation = useLoginMutation({});
  const registerMutation = useRegisterMutation({});

  const onLogin = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterSchemaType) => {
    registerMutation.mutate(data);
  };


  return (
    <div>
      <LogOrRegister onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
}
