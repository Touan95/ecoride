import axios, { InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

import { refreshTokenRequest } from '@/api/lib/auth';
import { getCookie } from '@/utils/cookie';

import { apiUrl } from './config';

type OriginalRequest = InternalAxiosRequestConfig & { _isRetry?: boolean };

const skipTokenError = ['/refresh', '/refresh/', '/login', '/login/'];
const skipToast = ['/agent/organization/zone'];

const defaultToastConfig = {
  duration: 3000,
  id: 'api-error'
};

export const configureAxios = ({ onTokenError }: { onTokenError: () => void }) => {
  axios.interceptors.request.use((config) => {
    const token = getCookie('accessToken');

    config.baseURL = apiUrl;
    config.headers = config.headers || {};

    config.headers.Accept = 'application/json';
    config.headers['Accept-Language'] = 'fr';
    config.headers['Content-Type'] = config.headers['Content-Type'] ?? 'application/json';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: OriginalRequest = error.config;
      const message = error?.response?.data?.message;
      const statusCode = error?.response?.status;

      const isRetry = originalRequest?._isRetry;
      const url = error?.config.url;

      if (statusCode === 401 && isRetry) {
        onTokenError();
        toast.error(message, defaultToastConfig);
      } else if (statusCode === 401 && !skipTokenError.includes(url) && !isRetry) {
        originalRequest._isRetry = true;
        try {
          await refreshTokenRequest();
          return axios.request(originalRequest);
        } catch {
          onTokenError();
          toast.error(message, defaultToastConfig);
        }
      } else {
        if (!skipToast.includes(url)) {
          toast.error(message, defaultToastConfig);
        }
      }
      return Promise.reject(error?.response?.data);
    }
  );
};
