import axiosInstance from '@/configs/axios';
import { DEFAULT_CATEGORIES } from '@/mocks/category.mock';
import { TicketCategory } from '@/models/ticket';

type Category = {
  id: string;
  name: string;
  icon: string | null;
  children: TicketCategory[];
};

export type CategoriesResponse = {
  categories: Category[];
};

export const getTicketCategories = async (): Promise<TicketCategory[]> => {
  try {
    const { data } = await axiosInstance.get<CategoriesResponse>(`/category`);

    const categories = data.categories?.length > 0 ? data.categories : DEFAULT_CATEGORIES;

    return categories;
  } catch {
    return DEFAULT_CATEGORIES;
  }
};
