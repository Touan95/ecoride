'use client';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SearchRides = () => {
  return (
    <div className="w-full h-[400px] relative">
      <img src={'/assets/itinerary.webp'} alt={''} className="h-full w-full object-cover" />
      <div className="absolute w-full h-full flex flex-col items-center bottom-0 justify-center bg-black/40">
        <div className="flex flex-col gap-10 max-w-5xl">
          <Typography variant="h1" align="center" color="white">
            Trouvez le covoiturage idéal et voyagez malin en partageant votre trajet !
          </Typography>
          <div className="grid grid-cols-[2fr_2fr_1fr_0.5fr] gap-4">
            <Input placeholder="Lieu de départ" />
            <Input placeholder="Lieu de destination" />
            <Input placeholder="Date de trajet" />
            <Button
              className="w-full h-full"
              variant="primary"
              onClick={() => {
                console.log('pressed');
              }}
            >
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
