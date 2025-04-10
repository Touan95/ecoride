import { useTestMail } from '@/api/hooks/useAuthAPI';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import Link from 'next/link';

export const Footer = () => {
  const testMail = useTestMail();

  const onTestMail = () => {
    testMail.mutate();
  };
  return (
    <div className="w-full flex flex-col bg-primary-700 items-center bottom-0">
      <img src={'/assets/logo-white.png'} alt={''} className="h-20 w-20 object-cover p-4" />
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
        <Button onClick={onTestMail}>Test mail</Button>
      </div>
    </div>
  );
};
