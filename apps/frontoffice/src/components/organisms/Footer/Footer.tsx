import { Typography } from '@/components/atoms/Typography';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-primary-700 items-center bottom-0">
      <img src={'/assets/logo.png'} alt={''} className="h-20 w-20 object-cover" />
      <Typography variant="small" weight="bold" color="white">
        Copyright © 2025 EcoRide
      </Typography>
      <Typography variant="small" color="white">
        contact@ecoride.com
      </Typography>
      <div className="flex gap-2 my-2">
        <Link href={'/mentions-legales'}>
          <Typography variant="small" color="white">
            Mentions légales
          </Typography>
        </Link>
        <Typography variant="small" color="white">
          |
        </Typography>
        <Link href={'/contact'}>
          <Typography variant="small" color="white">
            Nous contacter
          </Typography>
        </Link>
      </div>
    </div>
  );
};
