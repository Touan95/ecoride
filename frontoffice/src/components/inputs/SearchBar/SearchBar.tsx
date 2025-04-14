'use client';

import AddressAutocompleteInput, { OnSelectAddressProps } from '@/components/molecules/AddressAutocompleteInput/AddressAutocompleteInput';
import { Button } from '@/components/molecules/Button';
import { AddressItemLight } from '@/utils/openStreetMap';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder }: SearchInputProps) => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<AddressItemLight | undefined>(undefined);

  const onDepartureSelect = ({ rawAddress }: OnSelectAddressProps) => {
    setSelectedAddress(rawAddress);
  };

  const onSearch = () => {
    if (selectedAddress) {
      const query = encodeURIComponent(JSON.stringify(selectedAddress));
      router.push(`/rides?initialArrival=${query}`);
    } else {
      router.push(`/rides`);
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center">
      <AddressAutocompleteInput big onSelect={onDepartureSelect} className="p-8" placeholder={placeholder} />
      <Button className="w-fit px-20 py-7" onClick={onSearch}>
        Rechercher
      </Button>
    </div>
  );
};
