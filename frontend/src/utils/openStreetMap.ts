import { Coordinate } from '@/api/lib/user';
import axios from 'axios';

export const fetchSuggestions = async (query: string) => {
  if (!query) return [];

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=fr`;

  const response = await axios.get(url);
  return response.data;
};

export const fetchReversedLocation = async ({ latitude, longitude }: Coordinate) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  const response = await axios.get(url);
  return response.data;
};

export const fetchLookedUpLocation = async (osm_type: string, osm_id: string) => {
  const type = osm_type[0].toUpperCase();
  const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${type}${osm_id}&format=json`;

  const response = await axios.get(url);
  return response.data;
};

export interface AddressItem {
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
    town?: string;
    village?: string;
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

export type AddressItemLight = Pick<AddressItem, 'osm_id' | 'osm_type' | 'lat' | 'lon' | 'display_name'>;
