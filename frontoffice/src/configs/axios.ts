import axios from 'axios';

import { getCookie } from '@/utils/cookie';
import { apiUrl } from './config';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Accept-Encoding': 'gzip',
    'Accept-Language': /*i18n.resolvedLanguage ||*/ 'fr',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('accessToken');
  config.baseURL = apiUrl;

  config.headers = config.headers || {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  config.headers['Accept-Language'] = /*i18n.resolvedLanguage ||*/ 'fr';

  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      if (error.response.config.url.includes('/authentication/refresh')) {
        // onRefreshError();
      } else {
        // onTokenError();
      }
    }

    return Promise.reject(error?.response?.data);
  }
);

export default axiosInstance;
