import { Typography } from '@/components/atoms/Typography';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-primary-700 items-center">
      <img src={'assets/logo.png'} alt={''} className="h-30 w-30 object-cover" />
      <Typography variant="small" weight="bold">
        Copyright © 2025 EcoRide
      </Typography>
      <div className="flex gap-2 my-2">
        <Link href={'/mentions-legales'}>
          <Typography variant="small">Mentions légales</Typography>
        </Link>
        <Typography variant="small">|</Typography>
        <Link href={'/contact'}>
          <Typography variant="small">Nous contacter</Typography>
        </Link>
      </div>
    </div>
  );
};
