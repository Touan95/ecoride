'use client';

import { RideLocation } from '@/api/lib/user';
import AddressAutocompleteInput, { AddressItemLight } from '@/components/molecules/AddressAutocompleteInput/AddressAutocompleteInput';
import { Button } from '@/components/molecules/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder }: SearchInputProps) => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<AddressItemLight | undefined>(undefined);
  console.log('🚀 ~ selectedAddress:', selectedAddress);

  const onDepartureSelect = (_location: RideLocation, rawAddress: AddressItemLight) => {
    setSelectedAddress(rawAddress);
  };

  const onSearch = () => {
    const query = encodeURIComponent(JSON.stringify(selectedAddress));
    router.push(`/rides?departure=${query}`);
  };
  return (
    <div className="flex flex-col gap-5 items-center">
      <AddressAutocompleteInput onSelect={onDepartureSelect} className="p-8" placeholder={placeholder} />
      <Button className="w-fit px-20 py-7" onClick={onSearch}>
        Rechercher
      </Button>
    </div>
  );
};
