'use client';

import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, PropsWithChildren, useContext, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { LoggedUser } from '@/interfaces/user';
import { useGetMe } from '@/api/hooks/useAuthAPI';
import { usePathname, useRouter } from 'next/navigation';
import { configureAxios } from '@/configs/axios';
import { ROUTES } from '@/configs/routes';
import { AcceptTermsModal } from '@/components/organisms/AcceptTermsModal';
import { useAcceptTerms } from '@/api/hooks/useUserAPI';

const REFETCH_INTERVAL = 15 * 60 * 1000; // 15 minutes

type DecodedRefreshToken = {
  iat: number;
  exp: number;
  expDate: Date;
  userId: string;
};

type AuthContextType = {
  expirationDate: Date | null;
  user: LoggedUser | null;
  isReady: boolean;
  saveToken: (accessToken: string, refreshToken: string) => void;
  clearUser: () => void;
};

export const initialContext: AuthContextType = {
  expirationDate: null,
  user: null,
  isReady: false,
  saveToken: () => {},
  clearUser: () => {}
};

const decodeExpirationDate = (refreshToken: string | null) => {
  if (!refreshToken) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(refreshToken) as DecodedRefreshToken;
    return dayjs.unix(decodedToken.exp ?? 0).toDate();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(getCookie('accessToken') === null);
  const [enabled, setEnabled] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const currentRoute = usePathname();
  const isTermsRoute = currentRoute === ROUTES.TERMS_OF_USE || currentRoute === ROUTES.PRIVACY_POLICY;

  const isAxiosConfigured = useRef(false);
  const expirationDate = useRef<Date | null>(decodeExpirationDate(getCookie('refreshToken') ?? null));
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const { data: user, refetch: refreshUser } = useGetMe({
    disabled: !enabled,
    refetchInterval: enabled ? REFETCH_INTERVAL : undefined,
    onSettled: () => setIsReady(true)
  });

  const acceptTerms = useAcceptTerms({
    onSuccess: () => {
      setShowTermsModal(false);
    }
  });

  const onTermsAccepted = () => {
    acceptTerms.mutate(true);
    refreshUser();
  };

  useEffect(() => {
    setEnabled(getCookie('accessToken') != null);
  }, [getCookie('accessToken')]);

  useEffect(() => {
    if (user?.isBlocked) {
      clearUser();
    }
  }, [user]);

  useEffect(() => {
    if (user && !user?.termsAccepted) {
      setShowTermsModal(true);
    }
  }, [user]);

  const clearUser = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setEnabled(false);
    queryClient.setQueryData('me', null);

    expirationDate.current = null;

    queryClient.removeQueries();
    setShowTermsModal(false);
    replace(ROUTES.AUTHENTICATION);
  };

  const saveToken = (accessToken: string, refreshToken: string) => {
    expirationDate.current = decodeExpirationDate(refreshToken);

    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);

    refreshUser();
  };

  if (!isAxiosConfigured.current) {
    configureAxios({
      onTokenError: () => {
        clearUser();
      }
    });
    isAxiosConfigured.current = true;
  }

  const contextValue: AuthContextType = {
    user: user ?? null,
    saveToken,
    clearUser,
    expirationDate: expirationDate.current,
    isReady
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <AcceptTermsModal
        isOpen={showTermsModal && !isTermsRoute}
        onCancel={clearUser}
        onValidate={onTermsAccepted}
        isInvitationPending={user?.isInvitationPending}
      />
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be within AuthProvider');
  }

  return context;
};
