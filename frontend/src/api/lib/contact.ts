import axios from 'axios';

export interface ContactParams {
  name: string;
  email: string;
  message: string;
}

export const contactRequest = async (params: ContactParams): Promise<void> => {
  const { data } = await axios.post('/contact', params);
  return data;
};
