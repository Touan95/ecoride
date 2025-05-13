'use client';

import { Typography } from '@/components/atoms/Typography';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export interface RidesFiltersType {
  price?: number;
  duration?: number;
  driverRating?: number;
  isGreen?: boolean;
}

interface RidesFiltersProps {
  onFiltersChange: (filters: RidesFiltersType) => void;
}

export const RidesFilters = ({ onFiltersChange }: RidesFiltersProps) => {
  const [filters, setFilters] = useState<RidesFiltersType>({
    price: undefined,
    duration: undefined,
    driverRating: undefined,
    isGreen: undefined
  });

  const handleChange = (key: keyof typeof filters, value: string | boolean) => {
    if (key === 'isGreen') {
      const isGreenValue = value === true ? true : undefined;
      setFilters({ ...filters, isGreen: isGreenValue });
    } else {
      if (value === '') {
        setFilters({ ...filters, [key]: undefined });
      } else {
        setFilters({ ...filters, [key]: value });
      }
    }
  };

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  return (
    <div className="flex md:gap-7 gap-4 w-full justify-center md:flex-row flex-col">
      <div className="flex flex-col gap-2">
        <Typography variant="small" align="center">
          Prix maximum
        </Typography>
        <Input
          type="number"
          min={0}
          className="py-2 px-4 md:w-40 w-full"
          onChange={(e) => handleChange('price', e.target.value)}
          aria-label="Prix maximum"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="small" align="center">
          Durée maximum (heure)
        </Typography>
        <Input
          type="number"
          min={0}
          className="py-2 px-4 md:w-40 w-full"
          onChange={(e) => handleChange('duration', e.target.value)}
          aria-label="Durée maximum"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="small" align="center">
          Note du conducteur
        </Typography>
        <Input
          type="number"
          min={0}
          max={5}
          className="py-2 px-4 md:w-40 w-full"
          onChange={(e) => handleChange('driverRating', e.target.value)}
          aria-label="Note du conducteur"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Typography variant="small" htmlFor="isGreenFilter" align="center">
          Trajet éco-responsable
        </Typography>
        <div className="h-full flex items-center">
          <Checkbox
            className="text-primary-700 h-5 w-5"
            id="isGreenFilter"
            onCheckedChange={(checked: boolean) => handleChange('isGreen', checked)}
            aria-label="Trajet éco-responsable"
          />
        </div>
      </div>
    </div>
  );
};
