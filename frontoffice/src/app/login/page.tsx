'use client';

import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LogOrRegister } from '@/components/organisms/LogOrRegister';
import { apiUrl } from '@/configs/config';
import { useAuthContext } from '@/contexts/auth';
import { LoginSchemaType, RegisterSchemaType } from '@/schemas/auth';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';

export default function Login() {
  const router = useRouter()
  const {saveToken} = useAuthContext()

  const loginMutation = useLoginMutation({
    onSuccess:(data) => {
      saveToken(data.accessToken, data.refreshToken);
      router.replace('/')
    }
  });
  const registerMutation = useRegisterMutation({
    onSuccess:(_data, variables) => {
      const loginData = {
        email:variables.email,
        password: variables.password       
      }
      loginMutation.mutate(loginData);
    }
  });
  

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
