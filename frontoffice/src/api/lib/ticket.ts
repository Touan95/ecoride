import axiosInstance from '@/configs/axios';

import { BaseAPIResponse } from './types';

export type CreateTicketParams = {
  description: string;
  latitude: string;
  longitude: string;
  address: string;
  phone?: string | null;
  email?: string | null;
  category?: string | null;
  files?: File[] | null;
};

export interface CreateTicketResponse extends BaseAPIResponse {
  context: {
    id: string;
  };
}

export const createTicketRequest = async (params: CreateTicketParams): Promise<CreateTicketResponse> => {
  const formData = new FormData();

  formData.append('description', params.description);
  formData.append('latitude', params.latitude);
  formData.append('longitude', params.longitude);
  formData.append('address', params.address);

  if (params.phone) {
    formData.append('phone', params.phone);
  }

  if (params.email) {
    formData.append('email', params.email);
  }

  if (params.category) {
    formData.append('categoryId', params.category);
  }

  if (params.files) {
    for (let i = 0; i < params.files.length; i++) {
      formData.append('files', params.files[i]);
    }
  }

  const { data } = await axiosInstance.post<CreateTicketResponse>(`/request/issue`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data;
};
