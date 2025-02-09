'use client';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
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
        variant="primary"
        onClick={() => {
          console.log('pressed');
        }}
      >
        <Typography variant="small" color="white">
          Rechercher
        </Typography>
      </Button>
    </div>
  );
};
