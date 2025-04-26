import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { RideLocation } from '@/api/lib/user';
import { Input, inputClassname } from '@/components/ui/input';
import clsxm from '@/utils/clsxm';
import { Typography } from '@/components/atoms/Typography';
import { AddressItem, AddressItemLight, fetchLookedUpLocation, fetchReversedLocation, fetchSuggestions } from '@/utils/openStreetMap';
import { TbX } from 'react-icons/tb';

export interface OnSelectAddressProps {
  location?: RideLocation;
  rawAddress?: AddressItemLight;
}
interface AddressAutocompleteInputProps {
  onSelect: ({ location, rawAddress }: OnSelectAddressProps) => void;
  className?: string;
  placeholder?: string;
  initialLocation?: AddressItemLight;
  error?: string;
  big?: boolean;
}

const AddressAutocompleteInput = ({
  onSelect,
  className,
  placeholder = 'Entrez une adresse',
  initialLocation,
  error,
  big = false
}: AddressAutocompleteInputProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [query, setQuery] = useState(initialLocation ? initialLocation.display_name : '');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressItem | AddressItemLight | undefined>(undefined);

  const { data: location } = useQuery(
    ['location', selectedAddress?.lat, selectedAddress?.lon],
    () => {
      if (selectedAddress?.lat && selectedAddress?.lon) {
        return fetchReversedLocation({ latitude: Number(selectedAddress.lat), longitude: Number(selectedAddress.lon) });
      }
    },
    {
      enabled: !!selectedAddress?.lat && !!selectedAddress?.lon,
      cacheTime: 5000,
      staleTime: 3000
    }
  );

  const { data: initialAddress } = useQuery(
    ['initial-location', selectedAddress?.lat, selectedAddress?.lon],
    () => {
      if (initialLocation?.osm_type && initialLocation?.osm_id) {
        return fetchLookedUpLocation(initialLocation.osm_type, initialLocation.osm_id);
      }
    },
    {
      enabled: !!initialLocation,
      cacheTime: 5000,
      staleTime: 3000
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialLocation?.display_name !== query) {
      setQuery(initialLocation?.display_name || '');
      setSelectedAddress(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(query);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query]);

  const {
    data: suggestions,
    isLoading,
    isError
  } = useQuery(['addressSuggestions', debouncedValue], () => fetchSuggestions(debouncedValue), {
    enabled: query.length > 2,
    cacheTime: 5000,
    staleTime: 3000
  });

  const dropdownVisible = suggestions?.length > 0 || isLoading || isError;

  useEffect(() => {
    if (!location) {
      return;
    }

    const rideLocation: RideLocation = {
      address: location.display_name,
      postalCode: location.address?.postcode ?? null,
      city: location.address?.city ?? location.address?.town ?? location.address?.village ?? null,
      coordinate: {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon)
      }
    };

    const lightLocation: AddressItemLight = {
      display_name: location.display_name,
      lat: location.lat,
      lon: location.lon,
      osm_id: location.osm_id,
      osm_type: location.osm_type
    };

    onSelect({ location: rideLocation, rawAddress: lightLocation });
  }, [location]);

  useEffect(() => {
    if (initialAddress) {
      setSelectedAddress(initialAddress);
    }
  }, [initialAddress]);

  useEffect(() => {
    if (!selectedAddress) {
      onSelect({});
    }
  }, [selectedAddress]);

  const handleSelect = (item: AddressItem) => {
    setSelectedAddress(item);
    setQuery(item.display_name);

    inputRef.current?.blur();
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetValues = () => {
    setDebouncedValue('');
    setQuery('');
    setSelectedAddress(undefined);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={className}
        />
        <TbX
          onClick={resetValues}
          className={clsxm(
            'cursor-pointer absolute text-primary-900 top-1/2 right-4 transform -translate-y-1/2',
            big && 'border border-primary-900 rounded-full'
          )}
        />
      </div>
      <div className="h-4 mt-1">
        {error && (
          <Typography variant="extraSmall" color="red">
            {error}
          </Typography>
        )}
      </div>
      {dropdownVisible && isFocused && (
        <div className={clsxm(inputClassname, 'h-fit rounded-3xl absolute z-[9999] -mt-4 p-0')} onMouseDown={(e) => e.preventDefault()}>
          <ul className="flex flex-col py-6 w-full">
            {isLoading && <p className="p-2">Chargement...</p>}
            {isError && <p className="p-2">Erreur de chargement des suggestions</p>}
            {suggestions?.map((item: AddressItem) => (
              <li key={item.place_id} onClick={() => handleSelect(item)} className="cursor-pointer p-2 hover:bg-secondary-300">
                {item.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressAutocompleteInput;
