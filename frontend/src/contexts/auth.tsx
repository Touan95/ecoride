'use client';

import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, PropsWithChildren, useContext, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { LoggedUser } from '@/interfaces/user';
import { useGetMe } from '@/api/hooks/useAuthAPI';
import { useRouter } from 'next/navigation';
import { configureAxios } from '@/configs/axios';

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
  const isAxiosConfigured = useRef(false);
  const expirationDate = useRef<Date | null>(decodeExpirationDate(getCookie('refreshToken') ?? null));

  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getCookie('accessToken') != null);
  }, [getCookie('accessToken')]);

  const clearUser = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setEnabled(false);
    queryClient.setQueryData('me', null);

    expirationDate.current = null;

    queryClient.removeQueries();
    replace('/login');
  };

  const { data: user, refetch: refreshUser } = useGetMe({
    disabled: !enabled,
    refetchInterval: enabled ? REFETCH_INTERVAL : undefined,
    onSettled: () => setIsReady(true)
  });

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

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be within AuthProvider');
  }

  return context;
};
