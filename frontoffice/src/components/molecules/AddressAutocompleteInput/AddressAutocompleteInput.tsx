import { useRef, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { RideLocation } from '@/api/lib/user';
import { Input, inputClassname } from '@/components/ui/input';
import clsxm from '@/utils/clsxm';

const fetchSuggestions = async (query: string) => {
  if (!query) return [];

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=fr`;

  const response = await axios.get(url);
  return response.data;
};

interface AddressItem {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  address: {
    city?: string;
    state_district?: string;
    state?: string;
    ISO3166_2_lvl4?: string;
    postcode?: string;
    country: string;
    country_code: string;
  };
  extratags?: {
    capital?: string;
    website?: string;
    wikidata?: string;
    wikipedia?: string;
    population?: string;
  };
}

interface AddressAutocompleteInputProps {
  onSelect: (location: RideLocation) => void;
}

const AddressAutocompleteInput = ({ onSelect }: AddressAutocompleteInputProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: suggestions,
    isLoading,
    isError
  } = useQuery(['addressSuggestions', query], () => fetchSuggestions(query), {
    enabled: query.length > 2,
    cacheTime: 5000,
    staleTime: 3000
  });

  const dropdownVisible = suggestions?.length > 0 || isLoading || isError;

  const handleSelect = (item: AddressItem) => {
    const rideLocation: RideLocation = {
      address: item.display_name,
      postalCode: item.address?.postcode || null,
      city: item.address?.city || null,
      coordinate: {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon)
      }
    };

    setQuery(item.display_name);
    onSelect(rideLocation);
    inputRef.current?.blur();
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Entrez une adresse"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {dropdownVisible && isFocused && (
        <div className={clsxm(inputClassname, 'h-fit rounded-3xl absolute z-[9999] mt-2 p-0')} onMouseDown={(e) => e.preventDefault()}>
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
