'use client';

import { Input } from '@/components/ui/input';

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  return <Input type="text" placeholder={placeholder} />;
};
