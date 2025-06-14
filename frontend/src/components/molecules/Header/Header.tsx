import { Typography } from '@/components/atoms/Typography';
import { SearchBar } from '@/components/inputs/SearchBar';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className="w-full h-[400px] relative">
      <Image src={'/assets/header.webp'} alt={''} className="h-full w-full object-cover" role="presentation" width={1700} height={400} />
      <div className="absolute w-full h-full flex flex-col items-center bottom-0 justify-center bg-black/20">
        <div className="flex flex-col gap-10 max-w-5xl px-4">
          <Typography variant="h1" align="center" color="white">
            Optez pour le covoiturage : voyagez ensemble, réduisez votre empreinte et partagez un moment agréable.
          </Typography>
          <SearchBar placeholder="Votre destination" />
        </div>
      </div>
    </div>
  );
};
