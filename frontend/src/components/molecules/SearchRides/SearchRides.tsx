'use client';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import AddressAutocompleteInput, { OnSelectAddressProps } from '../AddressAutocompleteInput/AddressAutocompleteInput';
import { DateInput } from '@/components/inputs/DateInput';
import { AddressItemLight } from '@/utils/openStreetMap';

interface SearchRidesProps {
  arrival?: AddressItemLight;
  departure?: AddressItemLight;
  departureDate?: Date;
  onSearch: () => void;
  onDepartureSelect: (location: OnSelectAddressProps) => void;
  onArrivalSelect: (location: OnSelectAddressProps) => void;
  onDateSelect: (date: Date | undefined) => void;
}

export const SearchRides = ({
  arrival,
  departure,
  departureDate,
  onSearch,
  onDepartureSelect,
  onArrivalSelect,
  onDateSelect
}: SearchRidesProps) => {
  const now = new Date();
  const handleDepartureSelect = (location: OnSelectAddressProps) => {
    onDepartureSelect(location);
  };
  const handleArrivalSelect = (location: OnSelectAddressProps) => {
    onArrivalSelect(location);
  };
  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date);
  };
  return (
    <div className="w-full h-[400px] relative">
      <img src={'/assets/itinerary.webp'} alt={''} className="h-full w-full object-cover" role="presentation" />
      <div className="absolute w-full h-full flex flex-col items-center bottom-0 justify-center bg-black/40">
        <div className="flex flex-col gap-10 max-w-5xl">
          <Typography variant="h1" align="center" color="white">
            Trouvez le covoiturage idéal et voyagez malin en partageant votre trajet !
          </Typography>
          <div className="md:grid md:grid-cols-[2fr_2fr_1fr_0.5fr] gap-4 px-5 justify-items-center">
            <AddressAutocompleteInput
              onSelect={handleDepartureSelect}
              className="md:p-8 p-6"
              placeholder="Lieu de départ"
              initialLocation={departure}
              big
            />
            <AddressAutocompleteInput
              onSelect={handleArrivalSelect}
              className="md:p-8 p-6"
              placeholder="Lieu de destination"
              initialLocation={arrival}
              big
            />
            <DateInput
              onChange={handleDateSelect}
              placeholder="Date de trajet"
              className="md:p-8 md:w-44 p-6 w-full"
              fromDate={now}
              initialDate={departureDate}
            />
            <div className="md:pb-5 md:pt-0 pt-5">
              <Button className="md:w-full md:h-full h-12 px-10" onClick={onSearch}>
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
