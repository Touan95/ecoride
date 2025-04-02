'use client';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import AddressAutocompleteInput, { AddressItemLight, OnSelectAddressProps } from '../AddressAutocompleteInput/AddressAutocompleteInput';
import { useState } from 'react';
import { RideLocation } from '@/api/lib/user';
import { DateInput } from '@/components/inputs/DateInput';
import { SearchRidesFormSchemaType } from '@/schemas/user';

interface SearchRidesProps {
  initialDeparture?: AddressItemLight;
  onSearch: (params: SearchRidesFormSchemaType) => void;
}

export const SearchRides = ({ initialDeparture, onSearch }: SearchRidesProps) => {
  const [departureLocation, setDepartureLocation] = useState<RideLocation | undefined>(undefined);
  const [arrivalLocation, setArrivalLocation] = useState<RideLocation | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const onDepartureSelect = ({ location }: OnSelectAddressProps) => {
    setDepartureLocation(location);
  };
  const onArrivalSelect = ({ location }: OnSelectAddressProps) => {
    setArrivalLocation(location);
  };
  const onDateSelect = (date: Date | undefined) => {
    setDepartureDate(date);
  };
  const handleOnSearch = () => {
    if (departureLocation || arrivalLocation || departureDate) {
      onSearch({ arrivalLocation, departureDate, departureLocation });
    }
  };
  return (
    <div className="w-full h-[400px] relative">
      <img src={'/assets/itinerary.webp'} alt={''} className="h-full w-full object-cover" />
      <div className="absolute w-full h-full flex flex-col items-center bottom-0 justify-center bg-black/40">
        <div className="flex flex-col gap-10 max-w-5xl">
          <Typography variant="h1" align="center" color="white">
            Trouvez le covoiturage idéal et voyagez malin en partageant votre trajet !
          </Typography>
          <div className="grid grid-cols-[2fr_2fr_1fr_0.5fr] gap-4">
            <AddressAutocompleteInput
              onSelect={onDepartureSelect}
              className="p-8"
              placeholder="Lieu de départ"
              initialLocation={initialDeparture}
            />
            <AddressAutocompleteInput onSelect={onArrivalSelect} className="p-8" placeholder="Lieu de destination" />
            <DateInput onChange={onDateSelect} placeholder="Date de trajet" className="p-8 w-44" />
            <Button className="w-full h-full" onClick={handleOnSearch}>
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
