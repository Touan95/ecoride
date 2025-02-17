'use client';

import { Button } from '@/components/molecules/Button';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder }: SearchInputProps) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Input type="text" placeholder={placeholder} />
      <Button
        className="w-fit px-20 py-7"
        onClick={() => {
          console.log('pressed');
        }}
      >
        Rechercher
      </Button>
    </div>
  );
};
