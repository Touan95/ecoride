'use client';

import { useLoginMutation, useRegisterMutation } from '@/api/hooks/useAuthAPI';
import { LoginParams, RegisterParams } from '@/api/lib/auth';
import { LogOrRegister } from '@/components/organisms/LogOrRegister';
import { ROUTES } from '@/configs/routes';
import { useAuthContext } from '@/contexts/auth';
import { useRouter } from 'next/navigation';

export default function LoginPageClient() {
  const router = useRouter();
  const { saveToken } = useAuthContext();

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      saveToken(data.accessToken, data.refreshToken);
      router.replace(ROUTES.HOME);
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

  const onLogin = (data: LoginParams) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: Omit<RegisterParams, 'isStaff' | 'isInvitationPending'>) => {
    registerMutation.mutate({ ...data, isStaff: false });
  };

  return (
    <div className="mt-10 w-80">
      <LogOrRegister onLogin={onLogin} onRegister={onRegister} titleTag="h1" />
    </div>
  );
}
