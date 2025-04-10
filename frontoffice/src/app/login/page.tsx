'use client';

import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LogOrRegister } from '@/components/organisms/LogOrRegister';
import { useAuthContext } from '@/contexts/auth';
import { LoginSchemaType, RegisterSchemaType } from '@/schemas/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const { saveToken } = useAuthContext();

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      saveToken(data.accessToken, data.refreshToken);
      router.replace('/');
    }
  });
  const registerMutation = useRegisterMutation({
    onSuccess: (_data, variables) => {
      const loginData = {
        email: variables.email,
        password: variables.password
      };
      loginMutation.mutate(loginData);
    }
  });

  const onLogin = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterSchemaType) => {
    registerMutation.mutate({ ...data, isStaff: false });
  };

  return (
    <div>
      <LogOrRegister onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
}
