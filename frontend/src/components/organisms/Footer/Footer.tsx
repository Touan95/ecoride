import { Typography } from '@/components/atoms/Typography';
import { ROUTES } from '@/configs/routes';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-primary-700 items-center bottom-0">
      <Image src={'/assets/logo-white.png'} alt={'Logo Ecoride'} className="h-20 w-20 object-cover p-4" width={50} height={50} />
      <Typography variant="small" weight="bold" color="white">
        Copyright © 2025 EcoRide
      </Typography>
      <a href="https://snowpact.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
        <Typography variant="small" color="white">
          Snowpact
        </Typography>
      </a>
      <div className="flex gap-2 my-2 md:flex-row flex-col">
        <Link href={ROUTES.LEGAL_NOTICE}>
          <Typography align="center" variant="small" color="white">
            Mentions légales
          </Typography>
        </Link>
        <Typography variant="small" color="white" customClassName="md:block hidden">
          |
        </Typography>
        <Link href={ROUTES.PRIVACY_POLICY}>
          <Typography align="center" variant="small" color="white">
            Politique de confidentialité
          </Typography>
        </Link>
        <Typography variant="small" color="white" customClassName="md:block hidden">
          |
        </Typography>
        <Link href={ROUTES.TERMS_OF_USE}>
          <Typography align="center" variant="small" color="white">
            Conditions générales d&apos;utilisation
          </Typography>
        </Link>
        <Typography variant="small" color="white" customClassName="md:block hidden">
          |
        </Typography>
        <Link href={ROUTES.CONTACT}>
          <Typography align="center" variant="small" color="white">
            Nous contacter
          </Typography>
        </Link>
      </div>
    </div>
  );
};
