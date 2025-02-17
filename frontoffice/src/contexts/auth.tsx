import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';

import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { LoggedUser } from '@/interfaces/user';
import { useGetMe } from '@/api/hooks/useAuthAPI';
import { useRouter } from 'next/navigation';

const REFETCH_INTERVAL = 15 * 1000; // 15 minutes

type DecodedRefreshToken = {
  iat: number;
  exp: number;
  expDate: Date;
  userId: string;
};

type AuthContextType = {
  expirationDate: Date | null;
  user: LoggedUser | null;
  isLogged: boolean;
  isReady: boolean;
  saveToken: (accessToken: string, refreshToken: string) => void;
  clearUser: () => void;
};

export const initialContext: AuthContextType = {
  expirationDate: null,
  user: null,
  isLogged: false,
  isReady: false,
  saveToken: () => {},
  clearUser: () => {}
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expirationDate, setExpirationDate] = React.useState<Date | null>(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const isReady = useRef(false);
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { data: user } = useGetMe({ disabled: !isLogged, refetchInterval: REFETCH_INTERVAL });

  const saveToken = (accessToken: string, refreshToken: string) => {
    const decodedToken = jwtDecode(refreshToken) as DecodedRefreshToken;
    setExpirationDate(dayjs.unix(decodedToken.exp ?? 0).toDate());

    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);

    setIsLogged(true);
  };

  const clearUser = () => {
    setIsLogged(false);
    removeCookie('accessToken');
    removeCookie('refreshToken');
    queryClient.removeQueries();
    replace('/');
  };

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (accessToken && refreshToken) {
      saveToken(accessToken, refreshToken);
    }
  }, []);

  const contextValue: AuthContextType = {
    user: user ?? null,
    saveToken,
    clearUser,
    isLogged,
    expirationDate,
    isReady: isReady.current
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
