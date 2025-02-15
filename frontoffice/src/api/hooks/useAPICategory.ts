import { useQuery } from 'react-query';

import { TicketCategory } from '@/models/ticket';

import { getTicketCategories } from '../lib/category';
import { ErrorResponse } from '../lib/types';

export const useFetchCategories = () => {
  return useQuery<TicketCategory[], ErrorResponse>({
    queryKey: ['categories'],
    queryFn: () => getTicketCategories()
    // cacheTime: 1000 * 60 * 60 * 1
  });
};
